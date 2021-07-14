const express = require("express");
const router = express.Router();
var fs = require("fs");

router.get("/", (req, res) => {
  let light_config = {
    background:
      "background-image:linear-gradient(180deg, #2af598 0%, #009efd 100%);",
    card_bg:
      "background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);",
    text_color: "#000",
  };

  let dark_config = {
    background:
      "background-image:linear-gradient(to right, #6a11cb 0%, #2575fc 100%);",
    card_bg:
      "background:linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%);background-blend-mode: multiply;",
    text_color: "#fff",
  };

  let theme = light_config;

  if ("theme" in req.query) {
    if (req.query.theme === "dark") {
      theme = dark_config;
    }
  }

  let main_card = `
    <svg width="500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml">
                <style>
                    .container {
                        padding: 20px;
                        font-family: 'Ubuntu', 'Segoe UI', Sans-Serif;
                        ${theme.background}
                    }
                    .card {
                        border-radius: 5px;
                        padding: 20px;
                        box-shadow: 0 0 1.5rem rgba(0, 0, 0, .5);
                        ${theme.card_bg}
                        color: ${theme.text_color};
                    }
                    code {
                        font-family: "Lucida Console", "Courier New", monospace;
                    }
                </style>
                <div class="container">
                    <div class="card">          
                        %{content}
                    </div>
                </div>
            </div>
        </foreignObject>
    </svg>`;

  let jokes = fs.readFileSync("./data/jokes.json", {
    encoding: "utf8",
    flag: "r",
  });

  jokes = JSON.parse(jokes);

  let random_joke = jokes[Math.floor(Math.random() * jokes.length)];

  let joke_card;
  if (random_joke.type === "single") {
    joke_card = main_card.replace("%{content}", random_joke.joke);
  } else if (random_joke.type === "double") {
    joke_card = main_card.replace(
      "%{content}",
      `<b>Q. ${random_joke.joke.q}</b><br/><br/><i>${random_joke.joke.a}</i>`
    );
  }

  res.writeHead(200, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "public, max-age=10",
  });

  res.end(joke_card);
});

module.exports = router;
