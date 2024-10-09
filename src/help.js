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
      example: [`${baseurl}/trivia-card?theme=light`, `${baseurl}/trivia-card?theme=dark`],
    },
  },
  "wisdom-of-the-day-card": {
    info: "Daily wisdom or proverb card",
    api: {
      args: { theme: "Theme for the card (Default: light)" },
      example: [`${baseurl}/wisdom-of-the-day-card`],
    },
  },
  "team-work-quote-card": {
    info: "Motivational quotes related to teamwork",
    api: {
      args: { theme: "Theme for the card (Default: dark_2)" },
      example: [`${baseurl}/team-work-quote-card`],
    },
  },
  "bhagavad-geeta-card": {
    info: "Random quotes from the Bhagavad Geeta",
    api: {
      args: { theme: "Theme for the card (Default: light)" },
      example: [`${baseurl}/bhagavad-geeta-card`],
    },
  },
  "programming-facts-card": {
    info: "Random programming facts card",
    api: {
      args: { theme: "Theme for the card (Default: dark)" },
      example: [`${baseurl}/programming-facts-card`],
    },
  },
  "top-tweets-card": {
    info: "Top tweets card",
    api: {
      args: { theme: "Theme for the card (Default: dark_2)" },
      example: [`${baseurl}/top-tweets-card`],
    },
  },
});

/* Helper function to validate the theme */
const validateTheme = (theme, themes) => {
  if (!themes[theme]) {
    return {
      valid: false,
      message: `Invalid theme '${theme}'. Please choose from available themes.`,
    };
  }
  return { valid: true };
};

/* Root route for listing themes and cards */
router.get("/", (req, res) => {
  const baseurl = generateBaseURL(req);

  // Get all themes and cards dynamically
  const themes = getThemes(baseurl);
  const cards = getCards(baseurl);

  // Send the JSON response with all themes and cards
  res.json({ themes, cards });
});

/* New API endpoint for fetching cards with error handling */
router.get("/api/card", (req, res) => {
  const { theme = "light", type = "jokes-card" } = req.query;

  // Get baseurl
  const baseurl = generateBaseURL(req);

  // Get available themes and cards
  const themes = getThemes(baseurl);
  const cards = getCards(baseurl);

  // Validate theme
  const themeValidation = validateTheme(theme, themes);
  if (!themeValidation.valid) {
    return res.status(400).json({ error: themeValidation.message });
  }

  // Check if card type exists
  if (!cards[type]) {
    return res.status(404).json({ error: `Card type '${type}' not found.` });
  }

  // Generate card data dynamically
  const cardInfo = cards[type].info;
  const example = cards[type].api.example;

  res.json({
    card: type,
    theme: theme,
    description: cardInfo,
    examples: example,
  });
});

module.exports = router;
