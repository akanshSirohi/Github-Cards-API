const express = require("express");
const router = express.Router();

// All available api routes and parameters

router.get("/", (req, res) => {
  res.json({
    "jokes-card": {
      info: "Random programming jokes card",
      api: {
        theme: "Theme of card, any available theme. Default: light  [Optional]",
      },
      example1: `${baseurl}/jokes-card?theme=light`,
      example2: `${baseurl}/jokes-card?theme=dark`,
    },
    "programming-quotes-card": {
      info: "Random programming quotes card",
      api: {
        theme:
          "Theme of card, any available theme. Default: dark_2  [Optional]",
      },
      example: `${baseurl}/programming-quotes-card`,
    },
  });
});

module.exports = router;
