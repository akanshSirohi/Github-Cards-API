const express = require("express");
const router = express.Router();
const fs = require("fs").promises; // Use the promise-based version of fs
const { generateCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const CHALLENGE_FILE_PATH = "./src/data/challenge_of_the_week.json";
const DEFAULT_THEME = "light";

// Middleware for theme handling
function handleTheme(req, res, next) {
  req.theme = req.query.theme || DEFAULT_THEME;
  next();
}

// Middleware for options parsing
function handleOptions(req, res, next) {
  if (req.theme === "custom") {
    req.options = parseOptions(req.query);
  }
  next();
}

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const challengeData = await fs.readFile(CHALLENGE_FILE_PATH, "utf8");
    const challengeArray = JSON.parse(challengeData);

    const randomChallenge = challengeArray[Math.floor(Math.random() * challengeArray.length)];

    const challengeContent = `Challenge of the week:\n${randomChallenge.challenge}`;

    const challengeCard = await generateCard(challengeContent, req.theme, req.options);

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=10",
    });
    res.end(challengeCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
