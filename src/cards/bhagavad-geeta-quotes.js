const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");
const Languages = require("../languages");

router.get("/", (req, res) => {
  let theme = "light";

  if ("theme" in req.query) {
    theme = req.query.theme;
  }

  let options = null;
  if (theme === "custom") {
    options = parseOptions(req.query);
  }

  try {
    let bhagavad_geeta_quotes = fs.readFileSync("./src/data/bhagavad_geeta_quotes.json", {
      encoding: "utf8",
      flag: "r",
    });

    bhagavad_geeta_quotes = JSON.parse(bhagavad_geeta_quotes);

    if (!Array.isArray(bhagavad_geeta_quotes)) {
      throw new Error("Invalid JSON data. Expected an array.");
    }

    let randomQuote = bhagavad_geeta_quotes[Math.floor(Math.random() * bhagavad_geeta_quotes.length)];
    
    let language;
    let quoteContent = "";

    if(randomQuote.lang == "en") {
      quoteContent = `Quote of the day:-\n\n"${randomQuote.quote}"`;
      language = Languages.ENGLISH;
    }else if(randomQuote.lang == "hi") {
      quoteContent = `आज का विचार:-\n\n"${randomQuote.quote}"`;
      language = Languages.HINDI;
    }


    generateCard(quoteContent, theme, options, language, (quoteCard) => {
      res.writeHead(200, {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=10",
      });
      res.end(quoteCard);
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
