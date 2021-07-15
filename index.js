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

app.use("/", require("./cards/help"));
app.use("/jokes-card", require("./cards/joke-card"));
app.use("/test-card", require("./cards/test-card"));

app.listen(port, () => {
  console.log(`Server started on url: ${baseurl}`);
});
