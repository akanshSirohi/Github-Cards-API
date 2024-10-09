const express = require("express");
const router = express.Router();

/* Helper function to generate the base URL dynamically */
const generateBaseURL = (req) => {
  const port = process.env.PORT || 5000;
  const hostname = req.hostname;

  if (hostname === "localhost") {
    return `http://localhost:${port}`;
  } else {
    return `https://${hostname}`;
  }
};

/* Dynamic function to get themes with examples */
const getThemes = (baseurl) => ({
  dark: {
    info: "Dark theme with deep colors",
    example: [
      `${baseurl}/jokes-card?theme=dark`,
      `${baseurl}/programming-quotes-card?theme=dark`,
      `${baseurl}/programming-facts-card?theme=dark`,
      `${baseurl}/motivational-quotes-card?theme=dark`,
    ],
  },
  dark_2: {
    info: "Second dark theme with gradients",
    example: [
      `${baseurl}/jokes-card?theme=dark_2`,
      `${baseurl}/programming-quotes-card?theme=dark_2`,
      `${baseurl}/programming-facts-card?theme=dark_2`,
      `${baseurl}/motivational-quotes-card?theme=dark_2`,
    ],
  },
  light: {
    info: "Bright and clean light theme",
    example: [
      `${baseurl}/jokes-card?theme=light`,
      `${baseurl}/programming-quotes-card?theme=light`,
      `${baseurl}/programming-facts-card?theme=light`,
      `${baseurl}/motivational-quotes-card?theme=light`,
    ],
  },
  rgb: {
    info: "Colorful RGB gradient theme",
    example: [
      `${baseurl}/jokes-card?theme=rgb`,
      `${baseurl}/programming-quotes-card?theme=rgb`,
      `${baseurl}/programming-facts-card?theme=rgb`,
      `${baseurl}/motivational-quotes-card?theme=rgb`,
    ],
  },
  lemonade: {
    info: "Fresh lemonade-inspired theme",
    example: [
      `${baseurl}/jokes-card?theme=lemonade`,
      `${baseurl}/programming-quotes-card?theme=lemonade`,
      `${baseurl}/programming-facts-card?theme=lemonade`,
      `${baseurl}/motivational-quotes-card?theme=lemonade`,
    ],
  },
  /* New Themes */
  gradient_sunset: {
    info: "Gradient sunset theme",
    example: [
      `${baseurl}/jokes-card?theme=gradient_sunset`,
      `${baseurl}/motivational-quotes-card?theme=gradient_sunset`,
      `${baseurl}/programming-quotes-card?theme=gradient_sunset`,
    ],
  },
  neon_wave: {
    info: "Neon wave theme with glowing effects",
    example: [
      `${baseurl}/programming-quotes-card?theme=neon_wave`,
      `${baseurl}/motivational-quotes-card?theme=neon_wave`,
      `${baseurl}/programming-facts-card?theme=neon_wave`,
    ],
  },
  geometric_pattern: {
    info: "Geometric pattern background theme",
    example: [
      `${baseurl}/jokes-card?theme=geometric_pattern`,
      `${baseurl}/programming-quotes-card?theme=geometric_pattern`,
    ],
  },
  /* Customizable Themes */
  custom: {
    info: "Custom theme with user-defined colors and styles",
    args: {
      card_color: "Hex color code for card background (Default: #ffffff)",
      font_color: "Hex color code for text (Default: #000000)",
      bg_color: "Hex color code for background (Default: #fff)",
      font_size: "Font size in px (Default: 16px)",
      font_style: "Font style like 'bold', 'italic' (Default: normal)",
      shadow: "Enable shadow effect (true/false, Default: false)",
      shadow_color: "Hex color code for shadow (Default: #000000)",
    },
    example: [
      `${baseurl}/jokes-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow=true&shadow_color=fff`,
      `${baseurl}/programming-quotes-card?theme=custom&bg_color=ffcc00&font_color=000&shadow=true&font_size=18`,
    ],
  },
});

/* Dynamic function to get card types with examples */
const getCards = (baseurl) => ({
  "jokes-card": {
    info: "Random programming jokes card",
    api: {
      args: { theme: "Theme for the card (Default: light)" },
      example: [
        `${baseurl}/jokes-card?theme=light`,
        `${baseurl}/jokes-card?theme=dark`,
      ],
    },
  },
  "programming-quotes-card": {
    info: "Random programming quotes card",
    api: {
      args: { theme: "Theme for the card (Default: dark_2)" },
      example: [`${baseurl}/programming-quotes-card`],
    },
  },
  "motivational-quotes-card": {
    info: "Random motivational quotes",
    api: {
      args: {
        theme: "Theme for the card (Default: dark_2). Also available: skeleton, neon_wave",
      },
      example: [
        `${baseurl}/motivational-quotes-card`,
        `${baseurl}/motivational-quotes-card?theme=neon_wave`,
        `${baseurl}/motivational-quotes-card?theme=skeleton`,
      ],
    },
  },
  /* New Cards */
  "trivia-card": {
    info: "Random trivia facts card",
    api: {
      args: { theme: "Theme for the card (Default: light)" },
      example: [
        `${baseurl}/trivia-card?theme=light`,
        `${baseurl}/trivia-card?theme=dark`,
      ],
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