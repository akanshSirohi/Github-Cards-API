const express = require("express");
const router = express.Router();

// All available api routes and parameters

router.get("/", (req, res) => {
  res.json({
    "jokes-card": {
      info: "Random programming jokes card",
      api: {
        theme: "Theme of card, light or dark. Default: light  [Optional]",
      },
      example1: `${baseurl}/jokes-card?theme=light`,
      example2: `${baseurl}/jokes-card?theme=dark`,
    },
  });
});

module.exports = router;
