# Github-Cards-Api

### How to use

Visit endpoint url for all available cards and available options for each card <br/>
Endpoint URL: `https://afraid-ninnetta-github-cards.koyeb.app`

Embed one of these in your README:

```md
<!-- Markdown -->

![Card](https://afraid-ninnetta-github-cards.koyeb.app/any_card_name)
```

<h3 align="center">OR</h3>

```html
<!-- HTML -->
<img src="https://afraid-ninnetta-github-cards.koyeb.app/any_card_name" alt="Card" />
```

### List of card names currently available

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
| `travel-destinations-card` | `![Card](https://afraid-ninnetta-github-cards.koyeb.app/travel-destinations-card?theme=dark)` | ![Card](https://afraid-ninnetta-github-cards.koyeb.app/travel-destinations-card?theme=dark) |

### Available Themes List

1. light
2. dark
3. dark_2
4. rgb
5. lemonade
6. pattern_1
7. pattern_2
8. pattern_3
9. random - Any random theme will we applied
10. custom - You can set your custom arguments

## Custom Theme Arguments

```JS
args: {
    card_color: "Card color. Default: #ffffff  [Optional]",
    font_color: "Card text color. Default: #000000  [Optional]",
    bg_color: "Card Background color. Default: #fff  [Optional]",
    shadow: "Card shadow. Default: false  [Optional]",
    shadow_color: "Card shadow color. Default: #000000  [Optional]",
},
```

## Themes Example

- Light Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=light)

- Dark Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark)

- Dark_2 Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=dark_2)

- Rgb Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=rgb)

- Lemonade Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=lemonade)

- Pattern_1 Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_1)

- Pattern_2 Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_2)

- Pattern_3 Theme Card <br/>
  ![Card](https://afraid-ninnetta-github-cards.koyeb.app/jokes-card?theme=pattern_3)

## For More Visit

[https://afraid-ninnetta-github-cards.koyeb.app/](https://afraid-ninnetta-github-cards.koyeb.app/)

## How to contribute

### Add new card

1. Fork this repository.
2. Add your card in `src/cards` directory, you can take the refrence from already added cards.
3. Add any data file inside data directory that your card will use. (Languages Support: Hindi & English)
4. Add route of your card in `index.js` file.
5. Add your card api refrence inside in `src/help.js` file and also in README.md file.
6. Create pull request.
7. Data file must have around 100 entries minimum.
8. You can create cards in HTML and CSS too! Check out the `src/cards/motivational-quote.js` file to see how you can generate cards with your own unique styles. This project uses Satori to generate cards via HTML, so please refer to the official Satori documentation for the supported CSS properties.

### Add new theme

1. Fork this repository.
2. If you want to add gradient background then add your gradient code in `src/gradients.js` file.
   > Take refrence from already added gradients.
3. Add your theme name in the `src/themes.js` file.
   > Theme name should be unique and should be in the second last position of the array.
4. Create your theme in `src/themes.js` file.
   > Take refrence from already added themes.
5. Add your theme api refrence inside in `src/help.js` file and also in `README.md` file.
