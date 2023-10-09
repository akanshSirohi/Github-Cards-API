const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, generateHTMLCard, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/motivational_quotes.json";
const DEFAULT_THEME = "dark_2";

const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  next();
};

const handleOptions = (req, res, next) => {
  if (req.theme === "custom") {
    req.options = parseOptions(req.query);
  }
  next();
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const quotes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const random_quote = quotes[Math.floor(Math.random() * quotes.length)];

    let quote_card;

    // Custom theme moderation
    if(req.theme === "skeleton") {
      const html_content = `
        <div style="display: flex; flex-direction: column; border: 1px solid #000; padding: 20px; width: 400px; margin: 0 auto; text-align: center;align-items:center;border-radius:10px;">
          <span style="font-size: 20px; font-weight: bold;">${random_quote.quote}</span>
          <span style="font-size: 16px;color: #888; margin-top:10px;">- ${random_quote.author}</span>
        </div>
      `;
      // Generate card using custom HTML
      quote_card = await generateHTMLCard(html_content, Languages.ENGLISH);
    }else{
      const quote_content = `${random_quote.quote}\n\n- ${random_quote.author}`;
      quote_card = await generateCard(quote_content, req.theme, req.options, Languages.ENGLISH);
    }
    
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(quote_card);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
