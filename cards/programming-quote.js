const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");

router.get("/", (req, res) => {
  let theme = "dark_2";

  if ("theme" in req.query) {
    theme = req.query.theme;
  }

  let quotes = fs.readFileSync("./data/programming_quotes.json", {
    encoding: "utf8",
    flag: "r",
  });

  quotes = JSON.parse(quotes);

  let random_quote = quotes[Math.floor(Math.random() * quotes.length)];

  let quote_content = `${random_quote.quote}\n\n- ${random_quote.author}`;

  generateCard(quote_content, theme, (quote_card) => {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=10",
    });

    res.end(quote_card);
  });
});

module.exports = router;
