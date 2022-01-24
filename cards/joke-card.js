const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");

router.get("/", (req, res) => {
  let theme = "light";

  if ("theme" in req.query) {
    theme = req.query.theme;
  }

  let jokes = fs.readFileSync("./data/jokes.json", {
    encoding: "utf8",
    flag: "r",
  });

  jokes = JSON.parse(jokes);

  let random_joke = jokes[Math.floor(Math.random() * jokes.length)];

  let joke_content;
  if (random_joke.type === "single") {
    joke_content = random_joke.joke;
  } else if (random_joke.type === "double") {
    joke_content = `Q. ${random_joke.joke.q}\n\n${random_joke.joke.a}`;
  }

  // Example of custom theme moderation
  let options = null;
  if (theme === "my_theme") {
    theme = "pattern_3";
    options = {
      card_color: "#ffffffc2",
      font_color: "#000",
      shadow: false,
    };
  }

  generateCard(joke_content, theme, options, (joke_card) => {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=10",
    });
    res.end(joke_card);
  });
});

module.exports = router;
