const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/jokes.json";
const DEFAULT_THEME = "light";
const SUPPORTED_THEMES = ["light", "dark", "my_theme", "custom"];
const SUPPORTED_LANGUAGES = [Languages.ENGLISH];

const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  if (!SUPPORTED_THEMES.includes(req.theme)) {
    throw new Error(`Unsupported theme: ${req.theme}`);
  }
  next();
};

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

const getJokeContent = (joke) => {
  switch (joke.type) {
    case "single":
      return joke.joke;
    case "double":
      return `Q. ${joke.joke.q}\n\n${joke.joke.a}`;
    default:
      throw new Error(`Unsupported joke type: ${joke.type}`);
  }
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const jokes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const jokeContent = getJokeContent(randomJoke);
    const language = Languages.ENGLISH; // Default language

    const jokeCard = await generateCard(jokeContent, req.theme, req.options, language);
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(jokeCard);
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

    const jokes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const jokeContent = getJokeContent(randomJoke);
    const language = lang;

    const jokeCard = await generateCard(jokeContent, req.theme, req.options, language);
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(jokeCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;