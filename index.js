const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { getAvailableCards } = require('./utils')

const available_cards = getAvailableCards();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/help", require("./src/help"));

// serve public directory on root
app.use("/", express.static("public"));

for (const key in available_cards) {
  if (available_cards.hasOwnProperty(key)) {
    app.use(key, available_cards[key]);
  }
}

app.get("/random-card", (req, res) => {
  let urls = Object.keys(available_cards);
  let query = "";
  if (req.originalUrl.indexOf("?") > -1) {
    const queryParameters = req.originalUrl.split("?")[1];
    query = `?${queryParameters}`;
  }
  const randomIndex = Math.floor(Math.random() * urls.length);
  res.redirect(urls[randomIndex] + query);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
