const express = require("express");
const router = express.Router();
const fs = require("fs");
const {generateCard} = require("../card-generator");
const {parseOptions} = require("../options-parser");

router.get("/", (req, res) => {
  let theme = "light";

  if ("theme" in req.query) {
    theme = req.query.theme;
  }

  // Read the emoji data from emoji_data.json file
  let emojiData = fs.readFileSync("./src/data/emoji_data.json", {
    encoding: "utf8",
    flag: "r",
  });

  emojiData = JSON.parse(emojiData);

  // Pick a random emoji from the data
  let randomEmoji = emojiData[Math.floor(Math.random() * emojiData.length)];

  // Get only the emoji content
  let emojiContent = randomEmoji.emoji;

  // Create an array of 5 copies of the same emoji
  let emojiArray = Array(10).fill(emojiContent);

  // Example of custom theme moderation
  let options = null;
  if (theme === "my_theme") {
    theme = "pattern_3";
    options = {
      card_color: "#ffffffc2",
      font_color: "#000",
      shadow: false,
    };
  } else if (theme === "custom") {
    options = parseOptions(req.query);
  }

  // Generate the card with the emoji content
  generateCard(emojiArray.join(""), theme, options, (emojiCard) => {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=10",
    });
    res.end(emojiCard);
  });
});

module.exports = router;
