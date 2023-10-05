const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./src/help"));
app.use("/jokes-card", require("./src/cards/joke-card"));
app.use("/programming-quotes-card", require("./src/cards/programming-quote"));
app.use("/motivational-quotes-card", require("./src/cards/motivational-quote"));
app.use("/word-of-the-day-card", require("./src/cards/word_of_the_day"));
app.use("/challenge-of-the-week-card", require("./src/cards/challenge-of-the-week"));
app.use("/team-work-quote-card", require("./src/cards/team-work-quote"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
