const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/programming_facts.json";
const DEFAULT_THEME = "dark";
const SUPPORTED_THEMES = ["light", "dark", "custom"];
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

const getFactsContent = (fact) => {
  return `${fact.facts}\n\n- ${fact.topic}`;
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const facts = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    const factsContent = getFactsContent(randomFact);
    const language = Languages.ENGLISH; // Default language

    const factsCard = await generateCard(
      factsContent,
      req.theme,
      req.options,
      language
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(factsCard);
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

    const facts = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    const factsContent = getFactsContent(randomFact);
    const language = lang;

    const factsCard = await generateCard(
      factsContent,
      req.theme,
      req.options,
      language
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(factsCard);
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

    const facts = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    const factsContent = getFactsContent(randomFact);
    const language = Languages.ENGLISH; // Default language

    const factsCard = await generateCard(
      factsContent,
      req.theme,
      req.options,
      language,
      size
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(factsCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Add more functionality: support for custom colors
router.get("/color/:color", handleTheme, handleOptions, async (req, res) => {
  try {
    const color = req.params.color;
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      throw new Error(`Invalid color: ${color}`);
    }

    const facts = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomFact = facts[Math.floor(Math.random() * facts.length)];

    const factsContent = getFactsContent(randomFact);
    const language = Languages.ENGLISH; // Default language

    const factsCard = await generateCard(
      factsContent,
      req.theme,
      { ...req.options, color },
      language
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(factsCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;