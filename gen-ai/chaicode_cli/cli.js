import OpenAI from "openai";
import dotenv from "dotenv";

import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';


chalkAnimation.rainbow("---Welcome to WebScraper CLI--- \n");

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
    - getWeatherDetailsByCity(cityname: string): Returns a string of the current weather data of the city.
    - executeCommand(command: string): Takes a Windows command as arg and executes the command on user's machine and returns the output

    Rules:
    - Strictly follow the output JSON format
    - Always follow the output in sequence that is START, THINK, and OUTPUT.
    - Always perform ONLY AND ONLY ONE STEP AT A TIME and wait for other step.
    - Always wait for the next step until I add the previous step
    - Never write explanations or text outside JSON.
    - If you cannot comply, still output valid JSON with{'user': 'system' , 'content': '{ "step": "OUTPUT", "input": null, "isComplete": true, "input": null, "content": "error" }}'.
    - Always use the tools when needed.
    - If the user query is a coding task, then you must break down the task into sub tasks and use the executeCommand tool to create files and folders.
    - If the user ask for a task that requires terminal commands, then you must ask the user first if the user using Windows or Unix based system. If the user confirms Windows, then you can use Windows commands only.

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

`;

const messages = [
    { role: "system", content: systemPrompt },

]



async function main() {


    while (true) {


        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "userInput",
                message: "User -->:",
            },
        ]);

        // save to a file
        // fs.writeFileSync("output.txt", answers.userInput);
        messages.push({ role: "user", content: answers.userInput });

        const response = await openai.chat.completions.create({
            model: 'gpt-5-mini',
            messages: messages,
        });

        let rawText = (response.choices[0].message.content ?? '').toString()

        const jsonMatch = rawText.replace(/```json\s*/, "").replace(/```$/, "").trim();

        const parsedText = JSON.parse(jsonMatch);
        console.log("AI Response: ", parsedText.content);



        if (parsedText.step === "OUTPUT" || parsedText.isComplete) {
            break;

        }

    }




}



main();