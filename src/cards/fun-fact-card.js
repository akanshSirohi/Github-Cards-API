// src/cards/fun-fact-card.js
const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/fun_facts.json";
const DEFAULT_THEME = "light";

// Middleware to handle theme
const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  next();
};

// Middleware to handle options like custom themes
const handleOptions = (req, res, next) => {
  if (req.theme === "my_theme") {
    req.theme = "pattern_3";
    req.options = {
      card_color: "#ffffffc2",
      font_color: "#000",
      shadow: false,
    };
  } else if (req.theme === "custom") {
    req.options = parseOptions(req.query);
  }
  next();
};

// Route to display fun fact card
router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const facts = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const random_fact = facts[Math.floor(Math.random() * facts.length)];

    const fact_card = await generateCard(
      random_fact.fact,
      req.theme,
      req.options,
      Languages.ENGLISH
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(fact_card);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
