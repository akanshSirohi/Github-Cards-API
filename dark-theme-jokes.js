const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/jokes.json";
const DEFAULT_THEME = "light";
const FALLBACK_JOKE = {
  type: "single",
  joke: "Why don't programmers like nature? It has too many bugs.",
};

const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
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
  } else if (req.theme === "dark_theme") {
    req.options = {
      card_color: "#000000",
      font_color: "#ffffff",
      shadow: true,
    };
  } else if (req.theme === "vibrant_theme") {
    // New vibrant theme
    req.options = {
      card_color: "#ff007f", // Vibrant pink background
      font_color: "#ffffff", // White text
      shadow: true,
      border: "5px solid #ffbf00", // Optional border
    };
  }
  next();
};

const handleLanguage = (req, res, next) => {
  const languageQuery = req.query.lang || "en";
  switch (languageQuery.toLowerCase()) {
    case "es":
      req.language = Languages.SPANISH;
      break;
    case "fr":
      req.language = Languages.FRENCH;
      break;
    default:
      req.language = Languages.ENGLISH;
  }
  next();
};

router.get("/", handleTheme, handleOptions, handleLanguage, async (req, res) => {
  try {
    let jokes;
    try {
      jokes = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
    } catch (error) {
      console.warn("Could not read joke file, using fallback joke.");
      jokes = [FALLBACK_JOKE];
    }

    const random_joke = jokes.length > 0
      ? jokes[Math.floor(Math.random() * jokes.length)]
      : FALLBACK_JOKE;

    let joke_content;
    if (random_joke.type === "single") {
      joke_content = random_joke.joke;
    } else if (random_joke.type === "double") {
      joke_content = `Q. ${random_joke.joke.q}\n\nA. ${random_joke.joke.a}`;
    }

    // Additional content such as category or rating if available in the data
    if (random_joke.category) {
      joke_content += `\n\nCategory: ${random_joke.category}`;
    }
    if (random_joke.rating) {
      joke_content += `\nRating: ${random_joke.rating}/5`;
    }

    const joke_card = await generateCard(
      joke_content,
      req.theme,
      req.options,
      req.language
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

