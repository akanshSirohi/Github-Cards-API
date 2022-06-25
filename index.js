const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

if (process.env.PRODUCTION) {
  global.baseurl = `https://github-cards-api.herokuapp.com`;
} else {
  global.baseurl = `http://localhost:${port}`;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./help"));
app.use("/jokes-card", require("./cards/joke-card"));
app.use("/programming-quotes-card", require("./cards/programming-quote"));
app.use("/motivational-quotes-card", require("./cards/motivational-quote"));

app.listen(port, () => {
  console.log(`Server started on url: ${baseurl}`);
});
