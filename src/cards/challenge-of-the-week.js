const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/challenge_of_the_week.json";
const DEFAULT_THEME = "light";

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
    const challengeData = await fs.readFile(DATA_FILE_PATH, "utf8");
    const challengeArray = JSON.parse(challengeData);
    const randomChallenge = challengeArray[Math.floor(Math.random() * challengeArray.length)];
    const challengeContent = `Challenge of the week:\n${randomChallenge.challenge}`;
    const challengeCard = await generateCard(
      challengeContent,
      req.theme,
      req.options,
      Languages.ENGLISH
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(challengeCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;