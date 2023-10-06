const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const available_cards = {
  "/jokes-card": require("./src/cards/joke-card"),
  "/programming-quotes-card": require("./src/cards/programming-quote"),
  "/motivational-quotes-card": require("./src/cards/motivational-quote"),
  "/word-of-the-day-card": require("./src/cards/word_of_the_day"),
  "/challenge-of-the-week-card": require("./src/cards/challenge-of-the-week"),
  "/team-work-quote-card" : require("./src/cards/team-work-quote"),
  "/bhagavad-geeta-card" : require("./src/cards/bhagavad-geeta-quotes"),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./src/help"));

for(const key in available_cards) {
  if(available_cards.hasOwnProperty(key)) {
    app.use(key, available_cards[key]);
  }
}

app.get("/random-card", (req,res) => {
  let urls = Object.keys(available_cards);
  let query = "";
  if(req.originalUrl.indexOf("?") > -1) {
    const queryParameters = req.originalUrl.split("?")[1];
    query = `?${queryParameters}`;
  }
  const randomIndex = Math.floor(Math.random() * urls.length);
  res.redirect(urls[randomIndex] + query);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});