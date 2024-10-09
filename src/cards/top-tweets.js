const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const {
    generateCard,
    CARD_AGE,
    generateHTMLCard,
    Languages,
} = require("../card-generator");
const { parseOptions } = require("../options-parser");

const DATA_FILE_PATH = "./src/data/top_tweets.json";
const DEFAULT_THEME = "dark_2";

const handleTheme = (req, res, next) => {
    req.theme = req.query.theme || DEFAULT_THEME;
    next();
};

const handleOptions = (req, res, next) => {
    if (req.theme === "custom") {
        req.options = parseOptions(req.query);
    }
    next();
};

router.get("/", handleTheme, handleOptions, async (req, res) => {
    try {
        const tweets = JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf8"));
        const random_tweet = tweets[Math.floor(Math.random() * tweets.length)];

        let tweet_card;
        const tweet_content = `${random_tweet.tweet}\n\n- ${random_tweet.author}`;
        tweet_card = await generateCard(
            tweet_content,
            req.theme,
            req.options,
            Languages.ENGLISH
        );
    
        res.writeHead(200, {
            "Content-Type": "image/svg+xml",
            "Cache-Control": `public, max-age=${CARD_AGE}`,
        });
        res.end(tweet_card);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;