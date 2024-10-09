const express = require("express");
const router = express.Router();

// All available api routes and parameters

router.get("/", (req, res) => {
  const port = process.env.PORT || 5000;
  let hostname = req.hostname;
  let baseurl;
  if(hostname == "localhost") {
    baseurl = `http://localhost:${port}`;
  }else{
    baseurl = `https://${hostname}`;
  }
  const themes = {
    "dark": {
      info: "Dark theme",
      example: [
        `${baseurl}/jokes-card?theme=dark`,
        `${baseurl}/programming-quotes-card?theme=dark`,
        `${baseurl}/programming-facts-card?theme=dark`,
        `${baseurl}/motivational-quotes-card?theme=dark`,
      ],
    },
    "dark_2": {
      info: "Dark theme 2",
      example: [
        `${baseurl}/jokes-card?theme=dark_2`,
        `${baseurl}/programming-quotes-card?theme=dark_2`,
        `${baseurl}/programming-facts-card?theme=dark_2`,
        `${baseurl}/motivational-quotes-card?theme=dark_2`,
      ],
    },
    "light": {
      info: "Light theme",
      example: [
        `${baseurl}/jokes-card?theme=light`,
        `${baseurl}/programming-quotes-card?theme=light`,
        `${baseurl}/programming-facts-card?theme=light`,
        `${baseurl}/motivational-quotes-card?theme=light`,
      ],
    },
    "rgb": {
      info: "Rgb theme",
      example: [
        `${baseurl}/jokes-card?theme=rgb`,
        `${baseurl}/programming-quotes-card?theme=rgb`,
        `${baseurl}/programming-facts-card?theme=rgb`,
        `${baseurl}/motivational-quotes-card?theme=rgb`,
      ],
    },
    "pattern_1": {
      info: "Pattern theme 1",
      example: [
        `${baseurl}/jokes-card?theme=pattern_1`,
        `${baseurl}/programming-quotes-card?theme=pattern_1`,
        `${baseurl}/programming-facts-card?theme=pattern_1`,
        `${baseurl}/motivational-quotes-card?theme=pattern_1`,
      ],
    },
    "pattern_2": {
      info: "Pattern theme 2",
      example: [
        `${baseurl}/jokes-card?theme=pattern_2`,
        `${baseurl}/programming-quotes-card?theme=pattern_2`,
        `${baseurl}/programming-facts-card?theme=pattern_2`,
        `${baseurl}/motivational-quotes-card?theme=pattern_2`,
      ],
    },
    "pattern_3": {
      info: "Pattern theme 3",
      example: [
        `${baseurl}/jokes-card?theme=pattern_3`,
        `${baseurl}/programming-quotes-card?theme=pattern_3`,
        `${baseurl}/programming-facts-card?theme=pattern_3`,
        `${baseurl}/motivational-quotes-card?theme=pattern_3`,
      ],
    },
    "lemonade": {
      info: "Lemonade theme",
      example: [
        `${baseurl}/jokes-card?theme=lemonade`,
        `${baseurl}/programming-quotes-card?theme=lemonade`,
        `${baseurl}/programming-facts-card?theme=lemonade`,
        `${baseurl}/motivational-quotes-card?theme=lemonade`,
      ],
    },
    "custom": {
      info: "Custom theme",
      args: {
        card_color: "Card color. Default: #ffffff  [Optional]",
        font_color: "Card text color. Default: #000000  [Optional]",
        bg_color: "Card Background color. Default: #fff  [Optional]",
        shadow: "Card shadow. Default: false  [Optional]",
        shadow_color: "Card shadow color. Default: #000000  [Optional]",
      },
      example: [
        `${baseurl}/jokes-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow=true&shadow_color=fff`,
        `${baseurl}/programming-quotes-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow=false&shadow_color=fff`,
        `${baseurl}/motivational-quotes-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow=false&shadow_color=fff`,        
        `${baseurl}/jokes-card?theme=custom&bg_color=ffff00&font_color=0000ff&shadow=true`,
        `${baseurl}/programming-quotes-card?theme=custom&bg_color=000000&font_color=ff0000&shadow=true&shadow_color=ff0000`,
        `${baseurl}/motivational-quotes-card?theme=custom&bg_color=008000&font_color=000000`,
        `${baseurl}/programming-quotes-card?theme=custom&bg_color=ff69b4&font_color=000000`,
        `${baseurl}/programming-facts-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow=false&shadow_color=fff`,
      ],
    }
  };
  const cards = {
    "jokes-card": {
      info: "Random programming jokes card",
      api: {
        args: {
          theme: "Theme of card: All themes. Default: light  [Optional]"
        },
        example: [
          `${baseurl}/jokes-card?theme=light`,
          `${baseurl}/jokes-card?theme=dark`
        ],
      },
    },
    "programming-quotes-card": {
      info: "Random programming quotes card",
      api: {
        args: {
          theme: "Theme of card. All themes. Default: dark_2  [Optional]"
        },
        example: [`${baseurl}/programming-quotes-card`],
      },
    },
    "motivational-quotes-card": {
      info: "Random motivational quotes card",
      api: {
        args: {
          theme: "Theme of card. All themes. Default: dark_2  [Optional]. Additional themes: skeleton, neon",
        },
        example: [`${baseurl}/motivational-quotes-card`, `${baseurl}/motivational-quotes-card?theme=neon`, `${baseurl}/motivational-quotes-card?theme=skeleton`],
      },
    },
    "word-of-the-day-card": {
      info: "Generates random word of the day with their meanings.",
      api: {
        args: {
        theme: "Theme of card. All themes. Default: light  [Optional]",
        },
        example: [`${baseurl}/word-of-the-day-card`],
      },
    },
    "challenge-of-the-week-card": {
      info: "Generates a random challenge for you to take on in that week.",
      api: {
        args: {
        theme: "Theme of card. All themes. Default: light  [Optional]",
        },
        example: [`${baseurl}/challenge-of-the-week-card`],
      },
    },
    "team-work-quote-card": {
      info: "Generate random motivational quote related to the teamwork.",
      api: {
        args: {
        theme: "Theme of card. All themes. Default: dark_2  [Optional]",
        },
        example: [`${baseurl}/team-work-quote-card`],
      },
    },
    "bhagavad-geeta-card": {
      info: "Generate a random quote from the bhagavad-geeta-card",
      api: {
        args: {
          theme: "Theme of card. All themes. Default: light  [Optional]"
        },
        example: [`${baseurl}/bhagavad-geeta-card`],
      },
    },

    "programming-facts-card": {
      info: "Random programming facts card",
      api: {
        args: {
          theme: "Theme of card. All themes. Default: dark  [Optional]"
        },
        example: [`${baseurl}/programming-facts-card`],
      },
    },
     "spanish-quote-card": {
          info: "Random spanish quote card",
          api: {
            args: {
              theme: "Theme of card. All themes. Default: dark  [Optional]"
            },
            example: [`${baseurl}/spanish-quote-card`],
          },
        },
    "top-tweets-card": {
      info: "Random top Twitter Tweets card",
      api: {
        args: {
          theme: "Theme of card. All themes. Default: dark_2  [Optional]"
        },
        example: [`${baseurl}/top-tweets-card`],
      },
    },
  };

  res.json({themes,cards});
});

module.exports = router;
