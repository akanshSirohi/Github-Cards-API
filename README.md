# Github-Cards-Api

## Table of Contents

- [Github-Cards-Api](#github-cards-api)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Using Markdown](#using-markdown)
    - [Using HTML](#using-html)
  - [Available Cards](#available-cards)
  - [Themes](#themes)
    - [Options](#options)
    - [Custom Arguments](#custom-arguments)
    - [Examples](#examples)
  - [Contributing](#contributing)
    - [Adding a New Card](#adding-a-new-card)
    - [Adding a New Theme](#adding-a-new-theme)
  - [Additional Information](#additional-information)

## Usage

Visit the following endpoint URL for **all available cards and their respective options**:  
[`https://afraid-ninnetta-github-cards.koyeb.app/`](https://afraid-ninnetta-github-cards.koyeb.app/)

You can embed one of the available cards in your README using either Markdown **OR** HTML:

### Using Markdown

```md
<!-- Markdown -->
![Card](https://afraid-ninnetta-github-cards.koyeb.app/any_card_name)
```

### Using HTML

```html
<!-- HTML -->
<img src="https://afraid-ninnetta-github-cards.koyeb.app/any_card_name" alt="Card" />
```

## Available Cards

Here is a list of cards that can currently be used:

| Available Cards | Example |
| --------------- | ------- |
| `jokes-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark)` | 
| `programming-quotes-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/programming-quotes-card)` |
| `motivational-quotes-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/motivational-quotes-card)` |
| `word-of-the-day-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/word-of-the-day-card)` |
| `challenge-of-the-week-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/challenge-of-the-week-card)` |
| `team-work-quote-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/team-work-quote-card)` |
| `bhagavad-geeta-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/bhagavad-geeta-card)` |
| `random-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/random-card)` |
| `programming-facts-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/programming-facts-card?theme=dark)` |
| `top-tweets-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/top-tweets-card)` |
| `spanish-quote-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/spanish-quote-card?theme=dark)` |
| `fun-fact-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/fun-fact-card?theme=dark)` |
| `github-facts-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/github-facts-card?theme=dark)` |
| `random-facts-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/random-facts-card?theme=dark)` |


## Themes

### Options

You can customize the appearance of the cards by selecting one of the following themes:

1. [`light`](#light-theme-card)
2. [`dark`](#dark-theme-card)
3. [`dark_2`](#dark_2-theme-card)
4. [`rgb`](#rgb-theme-card)
5. [`lemonade`](#lemonade-theme-card)
6. [`pattern_1`](#pattern_1-theme-card)
7. [`pattern_2`](#pattern_2-theme-card)
8. [`pattern_3`](#pattern_3-theme-card)
9. `random` - A random theme from those listed above will be applied
10. `custom` - You may set your own custom arguments

#### NEW HTML THEMES (LIMITED TO HTML CARDS)
1. [`techy`](#techy-theme-card)
2. (More coming soon...)

### Custom Arguments

If you choose the `custom` theme, you can configure the card with the following arguments:

```JS
args: {
    card_color: "Card color. Default: #ffffff  [Optional]",
    font_color: "Card text color. Default: #000000  [Optional]",
    bg_color: "Card Background color. Default: #fff  [Optional]",
    shadow: "Card shadow. Default: false  [Optional]",
    shadow_color: "Card shadow color. Default: #000000  [Optional]",
},
```

### Examples

- #### `Light` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=light)

- #### `Dark` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark)

- #### `Dark_2` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark_2)

- #### `Rgb` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=rgb)

- #### `Lemonade` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=lemonade)

- #### `Pattern_1` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_1)

- #### `Pattern_2` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_2)

- #### `Pattern_3` Theme Card

  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_3)

- #### `Techy` Theme Card
  (Limited to HTML Cards)<br>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/motivational-quotes-card?theme=techy)

- #### `Neon_Horizon` Theme Card
  (Limited to HTML Cards)<br>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/programming-quotes-card?theme=neon_horizon)

## Contributing

### Adding a New Card

1. Fork this repository.
2. Add your card in the `src/cards` directory. You can refer to the existing cards for guidance.
3. If your card needs data, add a file inside the `data` directory (supported languages: English and Hindi).
4. Add a route for your card in the `index.js` file.
5. Update the `src/help.js` file and the `README` with your new card's API reference.
6. Create a pull request.
7. Ensure your data file has at least around 100 entries.

You can also create cards in HTML and CSS! Check out the `src/cards/motivational-quote.js` file to see how cards are generated with unique styles using HTML and Satori. Refer to the official Satori documentation [here](https://github.com/vercel/satori?tab=readme-ov-file#documentation) for supported CSS properties.

### Adding a New Theme

1. Fork this repository.
2. If you want to add a gradient background, add your gradient code in `src/gradients.js` (refer to the existing gradients).
3. Add your theme name to the `src/themes.js` file, placing it second-to-last in the array and ensuring the name is unique.
4. Define your theme in `src/themes.js` (refer to existing themes for structure).
5. Update the `src/help.js` file and the `README` with your new theme's API reference.

### Contributing Guidelines
- Ensure your code is properly formatted and follows the existing code style.
- Ensure your code is well-commented and tested before creating a pull request.
- Ensure your card/theme is unique and not a duplicate of an existing card/theme.
- Ensure your card/theme is not offensive or inappropriate.
- Do not commit package-lock.json, yarn.lock, package.json, or any other unnecessary files.

## Additional Information

For more information, visit [https://afraid-ninnetta-github-cards.koyeb.app/](https://afraid-ninnetta-github-cards.koyeb.app/).
