const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const {
  generateCard,
  CARD_AGE,
  generateHTMLCard,
  Languages,
} = require("../card-generator");
const { parseOptions } = require("../options-parser");
const { HTML_THEMES } = require("../html-themes");

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
    let all_html_themes = Object.keys(HTML_THEMsES);

    // Custom theme moderation
    if (req.theme === "skeleton") {
      const html_content = `
        <div style="display: flex; flex-direction: column; border: 1px solid #000; padding: 20px; width: 400px; margin: 0 auto; text-align: center;align-items:center;border-radius:10px;">
          <span style="font-size: 20px; font-weight: bold;">${random_quote.quote}</span>
          <span style="font-size: 16px;color: #888; margin-top:10px;">- ${random_quote.author}</span>
        </div>
      `;

      // Generate card using custom HTML
      quote_card = await generateHTMLCard(html_content, Languages.ENGLISH);
    } else if (req.theme === "neon") {
      const html_content = `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1e1e1e; color: #ffffff; border: 2px solid #3a3a3a; padding: 25px; width: 420px; text-align: center; border-radius: 12px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); font-family: 'Roboto', sans-serif;">
        <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
          <span style="font-size: 16px; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #00ff9d, #00e4ff);padding:10px;">"${random_quote.quote}"</span>
          <span style="font-size: 14px; color: #bbbbbb; margin-top: 12px;">- ${random_quote.author}</span>
        </div>
        <div style="display: flex; width: 100%; height: 2px; background: linear-gradient(90deg, #00ff9d, #00e4ff); margin-top: 15px;"></div>
      </div>
    `;
      // Generate card using custom HTML
      quote_card = await generateHTMLCard(html_content, Languages.ENGLISH);
    }else if(all_html_themes.includes(req.theme.toUpperCase())) {
      // Generate card using the HTML theme
      let html_content = `${random_quote.quote}\n\n- ${random_quote.author}`;
      quote_card = await generateHTMLCard(html_content, Languages.ENGLISH, HTML_THEMES[req.theme.toUpperCase()]);
    } else {
      const quote_content = `${random_quote.quote}\n\n- ${random_quote.author}`;
      quote_card = await generateCard(
        quote_content,
        req.theme,
        req.options,
        Languages.ENGLISH
      );
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
