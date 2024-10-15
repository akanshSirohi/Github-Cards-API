const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");
const DATA_FILE_PATH = "./src/data/kungfu_panda_quotes.json";
const DEFAULT_THEME = "dark";

const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  next();
};
const handleOptions = (req, res, next) => {
  if (req.theme === "custom") {
    req.options = parseOptions(req.query);
  }
  else{
    req.theme = "panda";
    req.options = {
      card_color: "#000000",
      font_color: "#FFFFFF",
      background: "#000000",
      shadow: false,
    };
  }
  next();
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const quotes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf-8"));
    const random_quotes = quotes[Math.floor(Math.random() * quotes.length)];
    let quote_content = `${random_quotes.quote}\n\n- ${random_quotes.author}`;;
    const quote_card = await generateCard(
      quote_content,
      req.theme,
      req.options,
      Languages.ENGLISH
    );

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