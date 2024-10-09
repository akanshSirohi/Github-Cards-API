# Github-Cards-Api

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

| Available Cards | Example | Preview |
| --------------- | ------- | ------- |
| `jokes-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark) |
| `programming-quotes-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/programming-quotes-card)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/programming-quotes-card) |
| `motivational-quotes-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/motivational-quotes-card)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/motivational-quotes-card) |
| `word-of-the-day-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/word-of-the-day-card)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/word-of-the-day-card) |
| `challenge-of-the-week-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/challenge-of-the-week-card)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/challenge-of-the-week-card) |
| `team-work-quote-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/team-work-quote-card)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/team-work-quote-card) |
| `bhagavad-geeta-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/bhagavad-geeta-card)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/bhagavad-geeta-card) |
| `random-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/random-card)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/random-card) |
| `programming-facts-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/programming-facts-card?theme=dark)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/programming-facts-card?theme=dark) |

## Themes

### Options

You can customize the appearance of the cards by selecting one of the following themes:

1. `light`
2. `dark`
3. `dark_2`
4. `rgb`
5. `lemonade`
6. `pattern_1`
7. `pattern_2`
8. `pattern_3`
9. `random` - Any random theme will we applied
10. `custom` - You can set your custom arguments

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

- `Light` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=light)

- `Dark` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark)

- `Dark_2` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark_2)

- `Rgb` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=rgb)

- `Lemonade` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=lemonade)

- `Pattern_1` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_1)

- `Pattern_2` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_2)

- `Pattern_3` Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_3)

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

## Additional Information

For more information, visit [https://afraid-ninnetta-github-cards.koyeb.app/](https://afraid-ninnetta-github-cards.koyeb.app/).
