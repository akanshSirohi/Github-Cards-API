const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const DATA_FILE_PATH = "./src/data/tech_trivia_joke_card.json";

// Middleware to serve a random tech trivia fact
router.get("/", async (req, res) => {
  try {
    // Read and parse the JSON data
    const data = await fs.readFile(DATA_FILE_PATH, "utf8");
    const triviaFacts = JSON.parse(data);

    // Get a random trivia fact
    const randomFact =
      triviaFacts[Math.floor(Math.random() * triviaFacts.length)];

    // Send the random fact as a response
    res.status(200).json(randomFact);
  } catch (error) {
    console.error("Error reading the trivia file:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
