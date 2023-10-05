const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeHandlers = [
  { path: "/", handler: require("./src/help") },
  { path: "/jokes-card", handler: require("./src/cards/joke-card") },
  { path: "/programming-quotes-card", handler: require("./src/cards/programming-quote") },
  { path: "/motivational-quotes-card", handler: require("./src/cards/motivational-quote") },
  { path: "/word-of-the-day-card", handler: require("./src/cards/word_of_the_day") },
  { path: "/challenge-of-the-week-card", handler: require("./src/cards/challenge-of-the-week") },
  { path: "/team-work-quote-card", handler: require("./src/cards/team-work-quote") },
  //New routes here
];
routeHandlers.forEach((route) => {
  app.use(route.path, route.handler);
});

//Random route that redirects to a random route
app.get("/random-card", (req, res) => {
  const randomRoute = routeHandlers[Math.floor(Math.random() * routeHandlers.length)].path;
  res.redirect(randomRoute);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});