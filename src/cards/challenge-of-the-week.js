const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");

router.get("/", (req, res) => {
  let theme = "light";

  if ("theme" in req.query) {
    theme = req.query.theme;
  }

  let options = null;
  if (theme === "custom") {
    options = parseOptions(req.query);
  }

  let challenegeOfTheWeekData = fs.readFileSync("./src/data/challenge_of_the_week.json", {
    encoding: "utf8",
    flag: "r",
  });

  challenegeOfTheWeekData = JSON.parse(challenegeOfTheWeekData);

  let randomChallenge = challenegeOfTheWeekData[Math.floor(Math.random() * challenegeOfTheWeekData.length)];

  let challengeContent = `Challenge of the week:\n${randomChallenge.challenge}`;

  generateCard(challengeContent, theme, options, (challengeCard) => {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=10",
    });
    res.end(challengeCard);
  });
});

module.exports = router;
