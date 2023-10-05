const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateCard } = require("../card-generator");
const { parseOptions } = require("../options-parser");

//First we pick a random json file from the data folder
let randomDataFile = fs.readdirSync("./src/data").filter((file) => file.endsWith(".json"))[Math.floor(Math.random() * fs.readdirSync("./src/data").filter((file) => file.endsWith(".json")).length)];

router.get("/", (req, res) => {
    let theme = "dark_2";  

    if ("theme" in req.query) {
        theme = req.query.theme;
    }
    else{
        theme = "dark";
    }
    
    let options = null;
    if (theme === "custom") {
        options = parseOptions(req.query);
    }
    
    let randomData = fs.readFileSync(`./src/data/${randomDataFile}`, {
        encoding: "utf8",
        flag: "r",
    });
    
    randomData = JSON.parse(randomData);
    
    let randomThing = randomData[Math.floor(Math.random() * randomData.length)];
    
    //if its a programming quote, get the quote and author. If its a challenge with some extra text, get the challenge. If its a joke, get the joke and the author.
    //If it is a programming quote, the content will be the quote and the author. If it is a challenge, the content will be the challenge. If it is a joke, the content will be the joke and the author.
    let randomContent = "";
    if (randomThing.quote) {
        randomContent = `${randomThing.quote}\n\n- ${randomThing.author}`;
    }
    if (randomThing.challenge) {
        randomContent = `Challenge of the week:\n${randomThing.challenge}`;
    }
    if (randomThing.joke) {
        randomContent = `${randomThing.joke}\n\n- ${randomThing.author}`;
    }



    
    generateCard(randomContent, theme, options, (challengeCard) => {
        res.writeHead(200, {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=10",
        });
        res.end(challengeCard);
    });
    });
module.exports = router;