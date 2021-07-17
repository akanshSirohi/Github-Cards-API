const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");
const { svg2png } = require("svg-png-converter");

router.get("/", (req, res) => {
  let theme = "dark_2";
  let type = "svg";

  if ("theme" in req.query) {
    theme = req.query.theme;
  }

  if ("type" in req.query) {
    type = req.query.type;
  }

  let quotes = fs.readFileSync("./data/motivational_quotes.json", {
    encoding: "utf8",
    flag: "r",
  });

  quotes = JSON.parse(quotes);

  let random_quote = quotes[Math.floor(Math.random() * quotes.length)];

  let quote_content = `${random_quote.quote}\n\n- ${random_quote.author}`;

  generateCard(quote_content, theme, (quote_card) => {
    if (type === "img") {
      svg2png({
        input: quote_card.trim(),
        encoding: "buffer",
        format: "jpeg",
        quality: 1,
      })
        .then((buffer) => {
          res.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=10",
          });
          res.end(buffer);
        })
        .catch((err) => {
          console.log(err);
          res.json({ msg: "Error" });
        });
    } else {
      res.writeHead(200, {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=10",
      });
      res.end(quote_card);
    }
  });
});

module.exports = router;
