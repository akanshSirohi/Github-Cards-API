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

const DATA_FILE_PATH = "./src/data/motivational_quotes.json";
const DEFAULT_THEME = "dark_2";
const SUPPORTED_THEMES = ["skeleton", "neon", "custom"];
const SUPPORTED_LANGUAGES = [Languages.ENGLISH];

const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  if (!SUPPORTED_THEMES.includes(req.theme)) {
    throw new Error(`Unsupported theme: ${req.theme}`);
  }
  next();
};

const handleOptions = (req, res, next) => {
  if (req.theme === "custom") {
    req.options = parseOptions(req.query);
  }
  next();
};

const getQuoteContent = (quote) => {
  return `${quote.quote}\n\n- ${quote.author}`;
};

const getCustomHTMLContent = (req, quote) => {
  switch (req.theme) {
    case "skeleton":
      return `
        <div style="display: flex; flex-direction: column; border: 1px solid #000; padding: 20px; width: 400px; margin: 0 auto; text-align: center;align-items:center;border-radius:10px;">
          <span style="font-size: 20px; font-weight: bold;">${quote.quote}</span>
          <span style="font-size: 16px;color: #888; margin-top:10px;">- ${quote.author}</span>
        </div>
      `;
    case "neon":
      return `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #1e1e1e; color: #ffffff; border: 2px solid #3a3a3a; padding: 25px; width: 420px; text-align: center; border-radius: 12px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); font-family: 'Roboto', sans-serif;">
          <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
            <span style="font-size: 16px; font-weight: bold; color: #ffffff; background: linear-gradient(90deg, #00ff9d, #00e4ff);padding:10px;">"${quote.quote}"</span>
            <span style="font-size: 14px; color: #bbbbbb; margin-top: 12px;">- ${quote.author}</span>
          </div>
          <div style="display: flex; width: 100%; height: 2px; background: linear-gradient(90deg, #00ff9d, #00e4ff); margin-top: 15px;"></div>
        </div>
      `;
    default:
      throw new Error(`Unsupported theme: ${req.theme}`);
  }
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const quotes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    let quoteCard;

    if (req.theme === "skeleton" || req.theme === "neon") {
      const htmlContent = getCustomHTMLContent(req, randomQuote);
      quoteCard = await generateHTMLCard(htmlContent, Languages.ENGLISH);
    } else {
      const quoteContent = getQuoteContent(randomQuote);
      quoteCard = await generateCard(
        quoteContent,
        req.theme,
        req.options,
        Languages.ENGLISH
      );
    }

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(quoteCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Add more functionality: support for multiple languages
router.get("/lang/:lang", handleTheme, handleOptions, async (req, res) => {
  try {
    const lang = req.params.lang;
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      throw new Error(`Unsupported language: ${lang}`);
    }

    const quotes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

 let quoteCard;

    if (req.theme === "skeleton" || req.theme === "neon") {
      const htmlContent = getCustomHTMLContent(req, randomQuote);
      quoteCard = await generateHTMLCard(htmlContent, lang);
    } else {
      const quoteContent = getQuoteContent(randomQuote);
      quoteCard = await generateCard(
        quoteContent,
        req.theme,
        req.options,
        lang
      );
    }

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(quoteCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Add more functionality: support for custom font sizes
router.get("/font-size/:size", handleTheme, handleOptions, async (req, res) => {
  try {
    const size = req.params.size;
    if (!/^\d+$/.test(size)) {
      throw new Error(`Invalid font size: ${size}`);
    }

    const quotes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    let quoteCard;

    if (req.theme === "skeleton" || req.theme === "neon") {
      const htmlContent = getCustomHTMLContent(req, randomQuote);
      quoteCard = await generateHTMLCard(htmlContent, Languages.ENGLISH, size);
    } else {
      const quoteContent = getQuoteContent(randomQuote);
      quoteCard = await generateCard(
        quoteContent,
        req.theme,
        req.options,
        Languages.ENGLISH,
        size
      );
    }

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(quoteCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;