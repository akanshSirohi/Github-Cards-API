const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");
const Languages = require("../languages");


router.get("/", (req, res) => {
    let theme = "dark";
  
    if ("theme" in req.query) {
      theme = req.query.theme;
    }

    let options = null;
    if(theme === "custom") {
        options = parseOptions(req.query);
    }

    let facts = fs.readFileSync("./src/data/programming_facts.json", {
        encoding: "utf8",
        flag: "r",
      });

    facts = JSON.parse(facts);

    let random_facts = facts[Math.floor(Math.random() * facts.length)];

    let facts_content = `${random_facts.facts}\n\n- ${random_facts.topic}`;

    generateCard(facts_content, theme, options, Languages.ENGLISH, (facts_card) => {
        res.writeHead(200, {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=10",
        });
    
        res.end(facts_card)

    });
});

module.exports = router ;
