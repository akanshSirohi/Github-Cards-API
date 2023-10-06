const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");
const Languages = require("../languages");

router.get("/", (req, res) => {
    let theme = "dark_2";
  
    if ("theme" in req.query) {
      theme = req.query.theme;
    }
  
    let options = null;
    
    if(theme === "custom") {
      options = parseOptions(req.query);
    }

  let teamworkQuotesData = fs.readFileSync("./src/data/team-work-quote.json", {
    encoding: "utf8",
    flag: "r",
  });

  teamworkQuotesData = JSON.parse(teamworkQuotesData);

  let randomQuote =
    teamworkQuotesData[Math.floor(Math.random() * teamworkQuotesData.length)];

  let quoteContent = `"${randomQuote.quote}"\n\nAuthor- ${randomQuote.author}`;

  generateCard(quoteContent, theme, options, Languages.ENGLISH, (quoteCard) => {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=10",
    });
    res.end(quoteCard);
  });
});

module.exports = router;
