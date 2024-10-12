const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages, generateHTMLCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");
const { HTML_THEMES } = require("../html-themes");

const DATA_FILE_PATH = "./src/data/programming_quotes.json";
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
    const quote_content = `${random_quote.quote}\n\n- ${random_quote.author}`;

    let quote_card = "";
    let all_html_themes = Object.keys(HTML_THEMES);

    if(all_html_themes.includes(req.theme.toUpperCase())) {
      quote_card = await generateHTMLCard(quote_content, Languages.ENGLISH, HTML_THEMES[req.theme.toUpperCase()]);
    }else{
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
