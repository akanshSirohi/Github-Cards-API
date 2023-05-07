# Github-Cards-Api

### How to use

Visit endpoint url for all available cards and available options for each card <br/>
Endpoint URL: `https://github-cards.onrender.com`

Embed one of these in your README:

```md
<!-- Markdown -->
![Card](https://github-cards.onrender.com/any_card_name)
```

<h3 align="center">OR</h3>

```html
<!-- HTML -->
<img src="https://github-cards.onrender.com/any_card_name" alt="Card" />
```


### List of card names currently available

| Available Cards | Example | Available Params | Preview |
| --------------- | ------- | ---------------- | ------- |
| `jokes-card` | `![Card](https://github-cards.onrender.com/jokes-card?theme=dark)` | theme=all_themes | https://github-cards.onrender.com/jokes-card?theme=dark |
| `programming-quotes-card` | `![Card](https://github-cards.onrender.com/programming-quotes-card)` | theme=all_themes | https://github-cards.onrender.com/programming-quotes-card |
| `motivational-quotes-card` | `![Card](https://github-cards.onrender.com/motivational-quotes-card)` | theme=all_themes | https://github-cards.onrender.com/motivational-quotes-card |


### Available Themes List
1. light
2. dark
3. dark_2
4. pattern_1
5. pattern_2
6. pattern_3
7. random - Any random theme will we applied
8. custom - You can set your custom arguments

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
![Card](https://github-cards.onrender.com/jokes-card?theme=light)

- Dark Theme Card <br/>
![Card](https://github-cards.onrender.com/jokes-card?theme=dark)

- Dark_2 Theme Card <br/>
![Card](https://github-cards.onrender.com/jokes-card?theme=dark_2)

- Pattern_1 Theme Card <br/>
![Card](https://github-cards.onrender.com/jokes-card?theme=pattern_1)

- Pattern_2 Theme Card <br/>
![Card](https://github-cards.onrender.com/jokes-card?theme=pattern_2)

- Pattern_3 Theme Card <br/>
![Card](https://github-cards.onrender.com/jokes-card?theme=pattern_3)


## For More Visit
[https://github-cards.onrender.com/help](https://github-cards.onrender.com/help)

## How to contribute

1. Fork this repository
2. Add your card in cards directory, you can take the refrence from already added cards
3. Add any data file inside data directory that your card will use
4. Add route of your card in `index.js` file
5. Add your api refrence inside in `help.js` file and also in README.md file
6. Create pull request

