const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/jokes.json";
const DEFAULT_THEME = "light";

const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  next();
};

const handleOptions = (req, res, next) => {
  // Custom theme moderation
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

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const jokes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const random_joke = jokes[Math.floor(Math.random() * jokes.length)];

    let joke_content;
    if (random_joke.type === "single") {
      joke_content = random_joke.joke;
    } else if (random_joke.type === "double") {
      joke_content = `Q. ${random_joke.joke.q}\n\n${random_joke.joke.a}`;
    }

    const joke_card = await generateCard(
      joke_content,
      req.theme,
      req.options,
      Languages.ENGLISH
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(joke_card);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
