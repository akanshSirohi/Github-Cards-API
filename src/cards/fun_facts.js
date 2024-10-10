const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path"); // Import path module
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

// Resolve the path to the data file dynamically
const DATA_FILE_PATH = path.resolve(__dirname, "../data/fun_facts.json");
const DEFAULT_THEME = "light";

// Middleware to handle theme selection
const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  next();
};

// Middleware to handle custom options if theme is "custom"
const handleOptions = (req, res, next) => {
  if (req.theme === "custom") {
    req.options = parseOptions(req.query);
  }
  next();
};

// Route to serve the Fun Fact card
router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    // Read and parse the fun facts data from the JSON file
    const funFactsData = JSON.parse(
      await fs.readFile(DATA_FILE_PATH, "utf8")
    );

    // Select a random fun fact
    const randomFact =
      funFactsData[Math.floor(Math.random() * funFactsData.length)];
    
    // Prepare the content for the card
    const factContent = `Fun Fact: ${randomFact.fact}`;

    // Generate the card using the card generator function
    const factCard = await generateCard(
      factContent,
      req.theme,
      req.options,
      Languages.ENGLISH // You can change the language if needed
    );

    // Set headers and send the generated card as SVG
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(factCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
