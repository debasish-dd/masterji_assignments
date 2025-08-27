import axios from "axios";
import * as cheerio from "cheerio";

const url = "https://docs.chaicode.com/";

async function scrape() {
  try {
    // 1. Fetch HTML
    const response = await axios.get(url);

    // 2. Load HTML into cheerio
    const $ = cheerio.load(response.data);

    // 3. Extract body
    const items = $("body");

    // 4. Print the body HTML
    console.log(items.html());
  } catch (err) {
    console.error("Error:", err.message);
  }
}

scrape();
