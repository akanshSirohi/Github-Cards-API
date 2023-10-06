const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");
const Languages = require("../languages");

router.get("/", (req, res) => {
  let theme = "light";

  if ("theme" in req.query) {
    theme = req.query.theme;
  }

  let options = null;
  if (theme === "custom") {
    options = parseOptions(req.query);
  }

  let wordOfTheDayData = fs.readFileSync("./src/data/word_of_the_day.json", {
    encoding: "utf8",
    flag: "r",
  });

  wordOfTheDayData = JSON.parse(wordOfTheDayData);

  let randomWord = wordOfTheDayData[Math.floor(Math.random() * wordOfTheDayData.length)];

  let wordContent = `${randomWord.word}\n\nMeaning: ${randomWord.meaning}`;

  generateCard(wordContent, theme, options, Languages.ENGLISH, (wordCard) => {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=10",
    });
    res.end(wordCard);
  });
});

module.exports = router;
