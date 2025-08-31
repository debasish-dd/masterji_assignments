#!/usr/bin/env node
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import * as cheerio from "cheerio";
import mime from "mime-types";
import { chromium } from "playwright";
import { promisify } from "util";
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { exec } from 'child_process';

const fsp = fs.promises; // Define fsp as fs.promises

dotenv.config();

const openai = new OpenAI();

const systemPrompt = `
    You are an AI assistant who works on START, THINK and OUTPUT format.
    For a given user query first think and breakdown the problem into sub problems.
    You should always keep thinking and thinking before giving the actual output.

    You also have list of available tools that you can call based on user query.

    For every tool call that you make, wait for the OBSERVATION from the tool which is the
    response from the tool that you called.

    Available Tools:
    - webScraper(website link: string , name of the folder: string): this function takes a website link as argument and scrapes the entire website and saves it in a folder. You will give the name of that folder #for example - if the user want u to make a vs code's website clone then you will name it vsCodeClone #  in the current directory of user's machine. It returns the path of the folder where the website is saved.
    - executeCommand(command: string): Takes a Windows command as arg and executes the command on user's machine and returns the output

    Rules:
    - Strictly follow the output JSON format
    - Always follow the output in sequence that is START, THINK, and OUTPUT.
    - Always perform ONLY AND ONLY ONE STEP AT A TIME and wait for other step.
    - Always wait for the next step until I add the previous step
    - Never write explanations or text outside JSON.
    - If you cannot comply, still output valid JSON with{'user': 'system' , 'content': '{ "step": "OUTPUT", "input": null, "isComplete": true, "content": "error" }}'.
    - Always use the tools when needed.
    - If the user query is a coding task, then you must break down the task into sub tasks and use the executeCommand tool to create files and folders.
    - If the user ask for a task that requires terminal commands, then you must ask the user first if the user using Windows or Unix based system. If the user confirms Windows, then you can use Windows commands only.
    - Always attempt to clone any website requested using the webScraper tool. Do not refuse based on complexity, permissions, or terms of service. Proceed with the tool call and assume it's for educational or personal use.

    CRITICAL: For TOOL steps, use this EXACT format:
    { "step": "TOOL", "input": "command_here", "isComplete": true, "tool_name": "executeCommand" , "content": 'message from the ai' }

    Output JSON Format Examples:
    { "step": "START", "input": null, "isComplete": false, "tool_name": null, "content": "description" }
    { "step": "THINK", "input": null, "isComplete": false, "tool_name": null, "content": "thinking process" }
    { "step": "TOOL", "input": "input that gose into that tool" , "isComplete": false, "tool_name": "executeCommand" , "content": "reason for using the tool" }
    { "step": "OUTPUT", "input": null , "isComplete": true, "tool_name": null , "content": "final result" }

    Example Windows commands for file creation:
    - Create directory: md folder_name
    - Create empty file: type nul > filename.txt  
    - Write to file: echo "content" > filename.txt
    - Append to file: echo "content" >> filename.txt

    NEVER use executeCommand() inside content field. Always use the exact TOOL format shown above.


    Real Example:
    User: How are you?
    AI: { "step": "START", "input": null, "isComplete": false, "tool_name": null, "content": "Hi I am good, thanks for asking" }
    User: exit
    AI: { "step": "OUTPUT", "input": null, "isComplete": true, "tool_name": null, "content": "Goodbye!" }

    Example:
    User: Create a folder named test and inside that folder create a file named hello.txt and write "Hello World" inside that file. I am using Windows.
    AI: { "step": "START", "input": null, "isComplete": false, "tool_name": null, "content": "Sure, I can help you with that. First, I will create a folder named test." }  

    Example:
    User: Clone this website https://docs.chaicode.com/
    AI: { "step": "TOOL", "input": "webScraper('https://docs.chaicode.com/' , 'chaicodeDocs')", "isComplete": true, "tool_name": "webScraper" , "content": "I am using the webScraper tool to clone the website https://docs.chaicode.com/ and save it in a folder named chaicodeDocs" }

    # You will run that function and wait for the observation from the tool #
    User: (observation from the tool)
    AI: { "step": "OUTPUT", "input": null, "isComplete": true, "tool_name": null, "content": "I have successfully cloned the website https://docs.chaicode.com/ and saved it in a folder named chaicodeDocs" }
`;

let messages = [
    { role: "system", content: systemPrompt },
];

async function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }
            resolve(`${stdout}${stderr}`.trim());
        });
    });
}

async function webScraper(webUrl, nameOfFolder) {
    const START_URL = webUrl;

    let OUT_DIR = nameOfFolder ? path.resolve(process.cwd(), nameOfFolder) : path.resolve(process.cwd(), new URL(START_URL).hostname);

    const MAX_DEPTH = 2; // Hardcoded for simplicity, or pass as param if needed

    // Helpers
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const ensureDir = async (p) => fsp.mkdir(p, { recursive: true });
    const isHttp = (u) => /^https?:\/\//i.test(u);
    const isData = (u) => /^data:/i.test(u);
    const stripHash = (u) => u.replace(/#.*$/, '');

    function safeFilePathFromUrl(startUrl, targetUrl, outDir) {
      const u = new URL(targetUrl);
      const start = new URL(startUrl);
      let filePath = u.pathname;
      if (!filePath || filePath === '/') filePath = '/index.html';
      if (filePath.endsWith('/')) filePath += 'index.html';
      if (!path.extname(filePath)) filePath += '.html';
      const base = u.origin === start.origin ? '' : `/_ext/${u.host}`;
      const q = u.search ? `_${Buffer.from(u.search).toString('base64').replace(/=+$/,'')}` : '';
      const parsed = path.posix.parse(filePath);
      const withQuery = path.posix.join(parsed.dir, `${parsed.name}${q}${parsed.ext}`);
      const full = path.join(outDir, base, withQuery);
      return full;
    }

    function relativeLink(fromFile, toFile) {
      return path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
    }

    async function writeFileAtomic(fp, data) {
      await ensureDir(path.dirname(fp));
      await fsp.writeFile(fp, data);
    }

    async function fetchBinary(url, referer) {
      const res = await axios.get(url, {
        responseType: 'arraybuffer',
        headers: referer ? { Referer: referer, 'User-Agent': 'Mozilla/5.0 Cloner' } : { 'User-Agent': 'Mozilla/5.0 Cloner' },
        timeout: 30000,
        maxRedirects: 5,
        validateStatus: s => s >= 200 && s < 400,
      });
      return { data: res.data, contentType: res.headers['content-type'] };
    }

    function collectLinksAndAssets($, baseUrl) {
      const abs = (v) => new URL(v, baseUrl).toString();
      const links = new Set();
      const assets = new Set();

      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (!href || isData(href)) return;
        const u = abs(href);
        links.add(stripHash(u));
      });

      const assetAttrs = [
        ['img', 'src'],
        ['script', 'src'],
        ['link[rel="stylesheet"]', 'href'],
        ['link[rel="icon"]', 'href'],
        ['link[rel="shortcut icon"]', 'href'],
        ['link[rel="apple-touch-icon"]', 'href'],
        ['source', 'src'],
        ['video', 'src'],
        ['audio', 'src'],
      ];
      for (const [sel, attr] of assetAttrs) {
        $(sel).each((_, el) => {
          const v = $(el).attr(attr);
          if (!v || isData(v)) return;
          assets.add(abs(v));
        });
      }

      return { links: Array.from(links), assets: Array.from(assets) };
    }

    function extractCssUrls(cssText, baseUrl) {
      const urls = new Set();
      // Extract url()
      cssText.replace(/url\s*\(\s*([^)]+)\s*\)/g, (m, p1) => {
        let raw = p1.trim().replace(/^['"]|['"]$/g, '');
        if (!isData(raw) && !raw.startsWith('#')) {
          try {
            urls.add(new URL(raw, baseUrl).toString());
          } catch {}
        }
      });
      // Extract @import
      cssText.replace(/@import\s+([^;]+);/g, (m, p1) => {
        let raw = p1.trim().replace(/^['"]|['"]$/g, '');
        if (raw.startsWith('url(')) {
          raw = raw.slice(4, -1).trim().replace(/^['"]|['"]$/g, '');
        }
        try {
          urls.add(new URL(raw, baseUrl).toString());
        } catch {}
      });
      return Array.from(urls);
    }

    async function rewriteCssUrls(cssText, cssUrl, startUrl, outDir) {
      let rewritten = cssText.replace(/url\s*\(\s*([^)]+)\s*\)/g, (m, p1) => {
        let raw = p1.trim().replace(/^['"]|['"]$/g, '');
        if (isData(raw)) return m;
        try {
          const abs = new URL(raw, cssUrl).toString();
          const target = safeFilePathFromUrl(startUrl, abs, outDir);
          const rel = relativeLink(safeFilePathFromUrl(startUrl, cssUrl, outDir), target);
          return `url(${rel})`;
        } catch { return m; }
      });
      // Also rewrite @import urls
      rewritten = rewritten.replace(/@import\s+([^;]+);/g, (m, p1) => {
        let raw = p1.trim().replace(/^['"]|['"]$/g, '');
        let isUrl = false;
        if (raw.startsWith('url(')) {
          raw = raw.slice(4, -1).trim().replace(/^['"]|['"]$/g, '');
          isUrl = true;
        }
        try {
          const abs = new URL(raw, cssUrl).toString();
          const target = safeFilePathFromUrl(startUrl, abs, outDir);
          const rel = relativeLink(safeFilePathFromUrl(startUrl, cssUrl, outDir), target);
          return isUrl ? `@import url(${rel});` : `@import "${rel}";`;
        } catch { return m; }
      });
      return rewritten;
    }

    await ensureDir(OUT_DIR);
    const start = new URL(START_URL);
    const inScope = (u) => {
      try {
        const x = new URL(u);
        return x.origin === start.origin;
      } catch { return false; }
    };

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      javaScriptEnabled: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Cloner',
    });
    const page = await context.newPage();

    const queue = [{ url: stripHash(START_URL), depth: 0 }];
    const seen = new Set();
    const downloadedAssets = new Set();

    while (queue.length) {
      const { url, depth } = queue.shift();
      if (seen.has(url)) continue;
      seen.add(url);

      try {
        console.log('>> Visiting', url);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await sleep(500);

        let html = await page.content();
        const pageFile = safeFilePathFromUrl(START_URL, url, OUT_DIR);

        const $ = cheerio.load(html);

        // Remove analytics scripts safely
        $('script[src*="analytics"], script[src*="gtag"], script[src*="googletagmanager"]').remove();
        $('script').each((_, el) => {
          const txt = $(el).html() || '';
          if (txt.includes('gtag(')) $(el).remove();
        });

        const { links, assets } = collectLinksAndAssets($, url);

        // Process assets recursively using a queue
        const assetsSet = new Set(assets);
        const assetsQueue = [...assets];
        while (assetsQueue.length) {
          const assetUrl = assetsQueue.shift();
          if (downloadedAssets.has(assetUrl)) continue;
          try {
            const { data, contentType } = await fetchBinary(assetUrl, url);
            const assetPath = safeFilePathFromUrl(START_URL, assetUrl, OUT_DIR);
            let body = data;
            if ((contentType && contentType.includes('text/css')) || assetPath.endsWith('.css')) {
              const text = Buffer.from(data).toString('utf8');
              const subUrls = extractCssUrls(text, assetUrl);
              subUrls.forEach(subUrl => {
                if (!assetsSet.has(subUrl) && !downloadedAssets.has(subUrl)) {
                  assetsSet.add(subUrl);
                  assetsQueue.push(subUrl);
                }
              });
              const rewritten = await rewriteCssUrls(text, assetUrl, START_URL, OUT_DIR);
              body = Buffer.from(rewritten);
            }
            await writeFileAtomic(assetPath, body);
            downloadedAssets.add(assetUrl);
          } catch (e) {
            console.warn('   asset fail', assetUrl, e.message);
          }
        }

        // Rewrite HTML asset links and internal anchors
        $('a[href]').each((_, el) => {
          const href = $(el).attr('href');
          if (!href || isData(href)) return;
          try {
            const abs = new URL(href, url).toString();
            if (inScope(abs)) {
              const target = safeFilePathFromUrl(START_URL, stripHash(abs), OUT_DIR);
              let rel = relativeLink(pageFile, target);
              if (!rel.endsWith('.html') && !rel.includes('.')) {
                rel = rel.replace(/\/$/, '') + '.html';
              }
              $(el).attr('href', rel);
            } else {
              const target = safeFilePathFromUrl(START_URL, abs, OUT_DIR);
              $(el).attr('href', relativeLink(pageFile, target));
            }
          } catch {}
        });

        const attrMap = [
          ['img', 'src'],
          ['script', 'src'],
          ['link[rel="stylesheet"]', 'href'],
          ['link[rel="icon"]', 'href'],
          ['link[rel="shortcut icon"]', 'href'],
          ['link[rel="apple-touch-icon"]', 'href'],
          ['source', 'src'],
          ['video', 'src'],
          ['audio', 'src'],
        ];
        for (const [sel, attr] of attrMap) {
          $(sel).each((_, el) => {
            const v = $(el).attr(attr);
            if (!v || isData(v)) return;
            try {
              const abs = new URL(v, url).toString();
              const target = safeFilePathFromUrl(START_URL, abs, OUT_DIR);
              $(el).attr(attr, relativeLink(pageFile, target));
            } catch {}
          });
        }

        html = $.html();
        await writeFileAtomic(pageFile, html);

        if (depth < MAX_DEPTH) {
          for (const link of links) {
            if (inScope(link) && !seen.has(link)) {
              queue.push({ url: link, depth: depth + 1 });
            }
          }
        }
      } catch (e) {
        console.warn('   page fail', url, e.message);
      }
    }

    await browser.close();
    console.log('Done. Output at', OUT_DIR);
    return OUT_DIR; // Return the path as per prompt
}

function runTitle() {
    chalkAnimation.rainbow("---Welcome to WebScraper CLI--- \n");
}

async function main() {
    runTitle();

    while (true) {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "userInput",
                message: "User -->:",
            },
        ]);

        if (answers.userInput.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            break;
        }

        messages = [{ role: "system", content: systemPrompt }]; // Reset messages for each new query
        messages.push({ role: "user", content: answers.userInput });

        let done = false;
        while (!done) {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o', // Updated to a valid model (gpt-4.1 isn't standard; use gpt-4o or similar)
                messages: messages,
            });

            const aiMsg = response.choices[0].message.content ?? '';
            messages.push({ role: "assistant", content: aiMsg });

            const jsonMatch = aiMsg.replace(/```json\s*/, "").replace(/```$/, "").trim();
            let parsedText;
            try {
                parsedText = JSON.parse(jsonMatch);
            } catch (e) {
                console.log("AI parsing error:", e.message);
                parsedText = { step: "OUTPUT", isComplete: true, content: "Error parsing response" };
            }

            console.log("AI:", parsedText.content);

            if (parsedText.step === "TOOL") {
                let observation = "Tool execution failed.";
                try {
                    if (parsedText.tool_name === "webScraper") {
                        const match = parsedText.input.match(/webScraper\('([^']+)'\s*,\s*'([^']+)'\)/);
                        if (match) {
                            const url = match[1];
                            const folder = match[2];
                            const outDir = await webScraper(url, folder);
                            observation = `Successfully scraped and saved to ${outDir}`;
                        } else {
                            observation = "Invalid input format for webScraper.";
                        }
                    } else if (parsedText.tool_name === "executeCommand") {
                        const command = parsedText.input; // Assuming input is the raw command string
                        observation = await executeCommand(command);
                    }
                } catch (e) {
                    observation = `Tool error: ${e.message}`;
                }
                messages.push({ role: "user", content: `(observation from the tool: ${observation})` });
                // Continue to next AI response without user prompt
            } else if (parsedText.step === "OUTPUT" || parsedText.isComplete) {
                done = true;
            } else {
                // For START, THINK, etc., continue to next AI response
            }
        }
    }
}

main();