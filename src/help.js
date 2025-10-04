export default async function helpHandler({ req, env }) {
  const baseurl = env.BASE_URL;
  const themes = {
    techy: {
      info: "Techy Theme",
      example: [
        `${baseurl}/jokes-card?theme=techy`,
        `${baseurl}/programming-quotes-card?theme=techy`,
        `${baseurl}/programming-facts-card?theme=techy`,
        `${baseurl}/motivational-quotes-card?theme=techy`,
        `${baseurl}/travel-destinations-card?theme=techy`,
        `${baseurl}/random-facts-card?theme=techy`,
        `${baseurl}/space-facts-card?theme=techy`,
        `${baseurl}/harry-potter-spell-card?theme=techy`,
        `${baseurl}/blockchain-web3-facts-card?theme=techy`,
      ],
    },
    neon_horizon: {
      info: "Neon Horizon Theme",
      example: [
        `${baseurl}/jokes-card?theme=neon_horizon`,
        `${baseurl}/programming-quotes-card?theme=neon_horizon`,
        `${baseurl}/programming-facts-card?theme=neon_horizon`,
        `${baseurl}/motivational-quotes-card?theme=neon_horizon`,
        `${baseurl}/travel-destinations-card?theme=neon_horizon`,
        `${baseurl}/random-facts-card?theme=neon_horizon`,
        `${baseurl}/space-facts-card?theme=neon_horizon`,
        `${baseurl}/harry-potter-spell-card?theme=neon_horizon`,
        `${baseurl}/blockchain-web3-facts-card?theme=horizon`,
      ],
    },
    anime: {
  info: "Anime Theme",
  example: [
    `${baseurl}/jokes-card?theme=anime`,
    `${baseurl}/programming-quotes-card?theme=anime`,
    `${baseurl}/programming-facts-card?theme=anime`,
    `${baseurl}/motivational-quotes-card?theme=anime`,
    `${baseurl}/travel-destinations-card?theme=anime`,
    `${baseurl}/random-facts-card?theme=anime`,
    `${baseurl}/space-facts-card?theme=anime`,
    `${baseurl}/harry-potter-spell-card?theme=anime`,
    `${baseurl}/blockchain-web3-facts-card?theme=anime`,
  ],
},
    galactic_dusk: {
      info: "Galactic Dusk Theme",
      example: [
        `${baseurl}/jokes-card?theme=galactic_dusk`,
        `${baseurl}/programming-quotes-card?theme=galactic_dusk`,
        `${baseurl}/programming-facts-card?theme=galactic_dusk`,
        `${baseurl}/motivational-quotes-card?theme=galactic_dusk`,
        `${baseurl}/travel-destinations-card?theme=galactic_dusk`,
        `${baseurl}/random-facts-card?theme=galactic_dusk`,
        `${baseurl}/space-facts-card?theme=galactic_dusk`,
        `${baseurl}/harry-potter-spell-card?theme=galactic_dusk`,
        `${baseurl}/blockchain-web3-facts-card?theme=galactic_duck`,
      ],
    },
    aurora_borealis: {
      info: "Aurora Borealis Theme",
      example: [
        `${baseurl}/jokes-card?theme=aurora_borealis`,
        `${baseurl}/programming-quotes-card?theme=aurora_borealis`,
        `${baseurl}/programming-facts-card?theme=aurora_borealis`,
        `${baseurl}/motivational-quotes-card?theme=aurora_borealis`,
        `${baseurl}/travel-destinations-card?theme=aurora_borealis`,
        `${baseurl}/random-facts-card?theme=aurora_borealis`,
        `${baseurl}/space-facts-card?theme=aurora_borealis`,
        `${baseurl}/harry-potter-spell-card?theme=aurora_borealis`,
        `${baseurl}/blockchain-web3-facts-card?theme=aurora_borealis`,
      ],
    },
    retro_block: {
      info: "Retro Block Theme",
      example: [
        `${baseurl}/jokes-card?theme=retro_block`,
        `${baseurl}/programming-quotes-card?theme=retro_block`,
        `${baseurl}/programming-facts-card?theme=retro_block`,
        `${baseurl}/motivational-quotes-card?theme=retro_block`,
        `${baseurl}/travel-destinations-card?theme=retro_block`,
        `${baseurl}/random-facts-card?theme=retro_block`,
        `${baseurl}/space-facts-card?theme=retro_block`,
        `${baseurl}/harry-potter-spell-card?theme=retro_block`,
        `${baseurl}/blockchain-web3-facts-card?theme=retro_block`,
      ],
    },
    rainbow_vortex: {
      info: "Rainbow Vortex Theme",
      example: [
        `${baseurl}/jokes-card?theme=rainbow_vortex`,
        `${baseurl}/programming-quotes-card?theme=rainbow_vortex`,
        `${baseurl}/programming-facts-card?theme=rainbow_vortex`,
        `${baseurl}/motivational-quotes-card?theme=rainbow_vortex`,
        `${baseurl}/travel-destinations-card?theme=rainbow_vortex`,
        `${baseurl}/random-facts-card?theme=rainbow_vortex`,
        `${baseurl}/space-facts-card?theme=rainbow_vortex`,
        `${baseurl}/harry-potter-spell-card?theme=rainbow_vortex`,
        `${baseurl}/blockchain-web3-facts-card?theme=rainbow_vortex`,
      ],
    },
    endless_constellation: {
      info: "Endless Constellation Theme",
      example: [
        `${baseurl}/jokes-card?theme=endless_constellation`,
        `${baseurl}/programming-quotes-card?theme=endless_constellation`,
        `${baseurl}/programming-facts-card?theme=endless_constellation`,
        `${baseurl}/motivational-quotes-card?theme=endless_constellation`,
        `${baseurl}/travel-destinations-card?theme=endless_constellation`,
        `${baseurl}/random-facts-card?theme=endless_constellation`,
        `${baseurl}/space-facts-card?theme=endless_constellation`,
        `${baseurl}/harry-potter-spell-card?theme=endless_constellation`,
        `${baseurl}/blockchain-web3-facts-card?theme=endless_constellation`,
      ],
    },
    lemonade: {
      info: "Lemonade Theme",
      example: [
        `${baseurl}/jokes-card?theme=lemonade`,
        `${baseurl}/programming-quotes-card?theme=lemonade`,
        `${baseurl}/programming-facts-card?theme=lemonade`,
        `${baseurl}/motivational-quotes-card?theme=lemonade`,
        `${baseurl}/travel-destinations-card?theme=lemonade`,
        `${baseurl}/random-facts-card?theme=lemonade`,
        `${baseurl}/space-facts-card?theme=lemonade`,
        `${baseurl}/harry-potter-spell-card?theme=lemonade`,
        `${baseurl}/blockchain-web3-facts-card?theme=lemonade`,
      ],
    },
    vintage: {
      info: "Vintage Theme",
      example: [
        `${baseurl}/jokes-card?theme=vintage`,
        `${baseurl}/programming-quotes-card?theme=vintage`,
        `${baseurl}/programming-facts-card?theme=vintage`,
        `${baseurl}/motivational-quotes-card?theme=vintage`,
        `${baseurl}/travel-destinations-card?theme=vintage`,
        `${baseurl}/random-facts-card?theme=vintage`,
        `${baseurl}/space-facts-card?theme=vintage`,
        `${baseurl}/harry-potter-spell-card?theme=vintage`,
        `${baseurl}/blockchain-web3-facts-card?theme=vintage`,
      ],
    },
    galaxy: {
      info: "Galaxy theme",
      example: [
        `${baseurl}/jokes-card?theme=galaxy`,
        `${baseurl}/programming-quotes-card?theme=galaxy`,
        `${baseurl}/programming-facts-card?theme=galaxy`,
        `${baseurl}/motivational-quotes-card?theme=galaxy`,
        `${baseurl}/random-facts-card?theme=galaxy`,
        `${baseurl}/space-facts-card?theme=galaxy`,
        `${baseurl}/blockchain-web3-facts-card?theme=galaxy`,
      ],
    },
    cyber_grid: {
      info: "Cyber Grid Theme",
      example: [
        `${baseurl}/jokes-card?theme=cyber_grid`,
        `${baseurl}/programming-quotes-card?theme=cyber_grid`,
        `${baseurl}/programming-facts-card?theme=cyber_grid`,
        `${baseurl}/motivational-quotes-card?theme=cyber_grid`,
        `${baseurl}/travel-destinations-card?theme=cyber_grid`,
        `${baseurl}/random-facts-card?theme=cyber_grid`,
        `${baseurl}/space-facts-card?theme=cyber_grid`,
        `${baseurl}/harry-potter-spell-card?theme=cyber_grid`,
        `${baseurl}/blockchain-web3-facts-card?theme=cyber_grid`,
      ],
    },
    digital_rain: {
      info: "Digital Rain Theme",
      example: [
        `${baseurl}/jokes-card?theme=digital_rain`,
        `${baseurl}/programming-quotes-card?theme=digital_rain`,
        `${baseurl}/programming-facts-card?theme=digital_rain`,
        `${baseurl}/motivational-quotes-card?theme=digital_rain`,
        `${baseurl}/travel-destinations-card?theme=digital_rain`,
        `${baseurl}/random-facts-card?theme=digital_rain`,
        `${baseurl}/space-facts-card?theme=digital_rain`,
        `${baseurl}/harry-potter-spell-card?theme=digital_rain`,
        `${baseurl}/blockchain-web3-facts-card?theme=digital_rain`,
      ],
    },
    custom: {
      info: "Custom theme",
      args: {
        card_color: "Card color, with gradient support. Refer to README.md for more info. Default: #ffffff [Optional]",
        font_color: "Card text color. Default: #000000 [Optional]",
        bg_color: "Card background color, with gradient support. Refer to README.md for more info. Default: #ffffff [Optional]",
        shadow_color: "Card shadow color. Default: #00000000 [Optional]",
        google_font: "Custom google font. Default: none [Optional]",
        text_align: {
          info: "Text alignment. Default: Top Left [Optional]",
          available_options: {
            "tl": "Top Left",
            "tm": "Top Middle",
            "tr": "Top Right",
            "ml": "Middle Left",
            "mm": "Middle Middle",
            "mr": "Middle Right",
            "bl": "Bottom Left",
            "bm": "Bottom Middle",
            "br": "Bottom Right",
          },
        },
        outer_pad: "Outer card padding. Default: 15 [Optional]",
        inner_pad: "Inner card padding. Default: 15 [Optional]",
        font_size: "Font size. Default: 12 [Optional]",
        card_width: "Card width. Default: 400 [Optional]",
        card_min_height: "Card minimum height. Default: 100 [Optional]",
      },
      basic_examples: [
        `${baseurl}/jokes-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow_color=fff`,
        `${baseurl}/motivational-quotes-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow_color=fff`,
        `${baseurl}/jokes-card?theme=custom&bg_color=ffff00&font_color=0000ff`,
        `${baseurl}/programming-quotes-card?theme=custom&bg_color=000000&font_color=ff0000&shadow_color=ff0000`,
        `${baseurl}/motivational-quotes-card?theme=custom&bg_color=008000&font_color=000000`,
        `${baseurl}/programming-quotes-card?theme=custom&bg_color=ff69b4&font_color=000000`,
        `${baseurl}/travel-destinations-card?theme=custom&bg_color=0000ff&font_color=ffffff`,
        `${baseurl}/random-facts-card?theme=custom&card_color=f0f&font_color=fff&bg_color=000&shadow_color=fff`,
        `${baseurl}/space-facts-card?theme=custom&card_color=ff0&font_color=000&bg_color=000&shadow_color=fff`,
        `${baseurl}/harry-potter-spell-card?theme=custom&card_color=00f&font_color=fff&bg_color=000&shadow_color=fff`,
        `${baseurl}/blockchain-web3-facts-card?theme=custom&card_color=00f&font_color=fff&bg_color=000&shadow_color=fff`,
      ],
      advanced_examples: [
        `${baseurl}/programming-quotes-card?theme=custom&bg_color=ff69b4&font_color=000000&google_font=Tagesschrift`,
        `${baseurl}/programming-facts-card?theme=custom&card_color=515151&bg_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLCAjRkM0NjZCIDAlLCAjM0Y1RUZCIDEwMCUp&font_color=fff&shadow_color=000&google_font=Cascadia+Code&text_align=mm&outer_pad=25&card_width=550&card_min_height=150`,
        `${baseurl}/space-facts-card?theme=custom&card_color=515151&bg_color=bGluZWFyLWdyYWRpZW50KCMyYjE1MCwgIzAwMDAwMCk&font_color=fff&shadow_color=000&google_font=Oswald&text_align=mm`
      ],
    },
  };

  const cards = {
    "my-card": {
      info: "Special card to show the customized text only.",
      api: {
        args: {
          text: "URL safe base64 string, more info in README.md on how to encode. [Required]",
          theme: "Theme of card: All themes. [Optional]",
        },
        example: [
          `${baseurl}/my-card?theme=neon_horizon&text=SGVsbG8sIFdvcmxkIQ`,
          `${baseurl}/my-card?theme=custom&text=QWthbnNoIFNpcm9oaQo8c3BhbiBzdHlsZT0iZm9udC1zaXplOiAxNHB4Ij4tIFNvZnR3YXJlIEVuZ2luZWVyPC9zcGFuPg&card_color=515151&bg_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLCAjRkM0NjZCIDAlLCAjM0Y1RUZCIDEwMCUp&font_color=fff&shadow_color=000&google_font=Oswald&text_align=mm&font_size=40`,
        ],
      },
    },
    "jokes-card": {
      info: "Random programming jokes card",
      api: {
        args: {
          theme: "Theme of card: All themes. [Optional]",
        },
        example: [
          `${baseurl}/jokes-card?theme=galactic_dusk`,
          `${baseurl}/jokes-card?theme=vintage`,
        ],
      },
    },
    "programming-quotes-card": {
      info: "Random programming quotes card",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/programming-quotes-card`],
      },
    },
    "motivational-quotes-card": {
      info: "Random motivational quotes card",
      api: {
        args: {
          theme:
            "Theme of card [Optional]",
        },
        example: [
          `${baseurl}/motivational-quotes-card`,
          `${baseurl}/motivational-quotes-card?theme=neon_horizon`,
        ],
      },
    },
    "word-of-the-day-card": {
      info: "Generates random word of the day with their meanings.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/word-of-the-day-card`],
      },
    },
    "french-word-of-the-day-card": {
      info: "Generates random french word of the day with their english meanings.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/french-word-of-the-day-card`],
      },
    },
    "challenge-of-the-week-card": {
      info: "Generates a random challenge for you to take on in that week.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/challenge-of-the-week-card`],
      },
    },
    "team-work-quote-card": {
      info: "Generate random motivational quote related to the teamwork.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/team-work-quote-card`],
      },
    },
    "got-quotes-card": {
      info: "Generate random motivational quote related to the game of thrones.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/got-quotes-card`],
      },
    },
    "breaking-bad-quote-card": {
      info: "Generate random motivational quote related to the breaking bad.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/breaking-bad-quote-card`],
      },
    },
    "bhagavad-geeta-card": {
      info: "Generate a random quote from the bhagavad-geeta-card",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/bhagavad-geeta-card`],
      },
    },
    "blockchain-web3-facts-card": {
      info: "Generates a random blockchain fact.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/blockchain-web3-facts-card`],
      },
    },
    "programming-facts-card": {
      info: "Random programming facts card",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/programming-facts-card`],
      },
    },
    "fun-fact-card": {
      info: "Displays a random fun fact card",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/fun-fact-card`],
      },
    },
    "spanish-jokes-card": {
      info: "Random spanish jokes card",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/spanish-jokes-card`],
      },
    },
    "top-tweets-card": {
      info: "Random top Twitter Tweets card",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/top-tweets-card`],
      },
    },
    "github-facts-card": {
      info: "Random github facts",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/github-facts-card`],
      },
    },
    "space-facts-card": {
      info: "Random space and astronomy facts",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/space-facts-card`],
      },
    },
    "security-tips-card": {
      info: "Programming security tips",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/security-tips-card`],
      },
    },
    "random-facts-card": {
      info: "Generates a random interesting fact",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/random-facts-card`],
      },
    },
    "harry-potter-spell-card": {
      info: "Generates a random spell from the Harry Potter books",
      api: {
        args: {
          theme: "Theme of a card [Optional]",
        },
        example: [`${baseurl}/harry-potter-spell-card`],
      },
    },
    "travel-destinations-card": {
      info: "Generates a random travel destination and an interesting fact.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/travel-destinations-card`],
      },
    },
    "health-tip-card": {
      info: "Generates a random health tip for good health.",
      api: {
        args: {
          theme: "Theme of card [Optional]",
        },
        example: [`${baseurl}/health-tip-card`],
      },
    },
    
  };

  // API endpoints
  const api_endpoints = {
    "repo-stats": {
      info: "Returns GitHub repository statistics in JSON format",
      endpoint: `${baseurl}/api/repo-stats`,
      method: "GET",
      response_format: "application/json",
      fields: {
        stars: "Number of GitHub stars",
        forks: "Number of repository forks", 
        contributors: "Number of contributors",
        updatedAt: "Last update timestamp",
        language: "Primary programming language",
        method: "Data source method used"
      },
      example: `${baseurl}/api/repo-stats`
    }
  };

  return new Response(JSON.stringify({ themes, cards, api_endpoints }), {
    headers: {
      "Content-Type": "application/json"
    },
  });
};
