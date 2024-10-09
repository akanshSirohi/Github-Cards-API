const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/bhagavad_geeta_quotes.json";
const DEFAULT_THEME = "light";
const SUPPORTED_LANGUAGES = ["en", "hi"];

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

const getQuoteContent = (quote, language) => {
  switch (language) {
    case Languages.ENGLISH:
      return `Quote of the day:-\n\n"${quote}"`;
    case Languages.HINDI:
      return `आज का विचार:-\n\n"${quote}"`;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const bhagavad_geeta_quotes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomQuote = bhagavad_geeta_quotes[Math.floor(Math.random() * bhagavad_geeta_quotes.length)];

    if (!SUPPORTED_LANGUAGES.includes(randomQuote.lang)) {
      throw new Error(`Unsupported language: ${randomQuote.lang}`);
    }

    const language = randomQuote.lang === "en" ? Languages.ENGLISH : Languages.HINDI;
    const quoteContent = getQuoteContent(randomQuote.quote, language);

    const quoteCard = await generateCard(quoteContent, req.theme, req.options, language);
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(quoteCard);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;