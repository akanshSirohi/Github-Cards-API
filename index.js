const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Define available cards
const availableCards = {
  "/jokes-card": require("./src/cards/joke-card"),
  "/programming-quotes-card": require("./src/cards/programming-quote"),
  "/motivational-quotes-card": require("./src/cards/motivational-quote"),
  "/word-of-the-day-card": require("./src/cards/word_of_the_day"),
  "/challenge-of-the-week-card": require("./src/cards/challenge-of-the-week"),
  "/team-work-quote-card": require("./src/cards/team-work-quote"),
  "/bhagavad-geeta-card": require("./src/cards/bhagavad-geeta-quotes"),
  "/programming-facts-card": require("./src/cards/programming-facts"),
  "/top-tweets-card": require("./src/cards/top-tweets")
};

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.route("/").use(require("./src/help"));

// Define a function to get available card URLs
const getAvailableCardUrls = () => Object.keys(availableCards);

// Define a function to get a random card URL
const getRandomCardUrl = (query) => {
  const urls = getAvailableCardUrls();
  const randomIndex = Math.floor(Math.random() * urls.length);
  return `${urls[randomIndex]}${query}`;
};

// Define a function to redirect to a random card
const redirectToRandomCard = (req, res) => {
  const query = req.originalUrl.indexOf("?") > -1 ? `?${req.originalUrl.split("?")[1]}` : "";
  const randomCardUrl = getRandomCardUrl(query);
  res.redirect(randomCardUrl);
};

// Define a route for random cards
app.route("/random-card").get(redirectToRandomCard);

// Define routes for available cards
for (const key in availableCards) {
  if (availableCards.hasOwnProperty(key)) {
    app.route(key).use(availableCards[key]);
  }
}

// Define error handling middleware
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});