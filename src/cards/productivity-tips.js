const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { generateCard, CARD_AGE, Languages } = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/productivity-tips.json"; // Path to your productivity tips JSON
const DEFAULT_THEME = "light_1"; // You can change the default theme if needed

// Middleware to handle theme
const handleTheme = (req, res, next) => {
  req.theme = req.query.theme || DEFAULT_THEME;
  next();
};

// Middleware to handle custom options
const handleOptions = (req, res, next) => {
  if (req.theme === "custom") {
    req.options = parseOptions(req.query);
  }
  next();
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
  try {
    const productivityTipsData = JSON.parse(
      await fs.readFile(DATA_FILE_PATH, "utf8")
    );
    const randomTip =
      productivityTipsData[
        Math.floor(Math.random() * productivityTipsData.length)
      ];
    const tipContent = `"${randomTip.tip}"\n\nSource: ${
      randomTip.source || "Unknown"
    }`;

    const tipCard = await generateCard(
      tipContent,
      req.theme,
      req.options,
      Languages.ENGLISH
    );

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CARD_AGE}`,
    });
    res.end(tipCard);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
