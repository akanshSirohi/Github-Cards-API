const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/fun_facts.json"; 
const DEFAULT_THEME = "light";

// Middleware to handle theme selection
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
