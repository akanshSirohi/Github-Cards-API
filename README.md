# Github-Cards-Api

Github README.md cards api

### How to use

Visit endpoint url for all available cards and available options for each card <br/>
Endpoint URL: `https://github-cards-api.herokuapp.com`

Embed one of these in your README:

```md
<!-- Markdown -->
![Card](https://github-cards-api.herokuapp.com/any_card_name)
```

<h3 align="center">OR</h3>

```html
<!-- HTML -->
<img src="https://github-cards-api.herokuapp.com/any_card_name" alt="Card" />
```


### List of card names currently available

| Available Cards | Example | Available Params | Preview |
| --------------- | ------- | ---------------- | ------- |
| `jokes-card` | `![Card](https://github-cards-api.herokuapp.com/jokes-card?theme=dark)` | theme=all_themes | https://github-cards-api.herokuapp.com/jokes-card?theme=dark |
| `programming-quotes-card` | `![Card](https://github-cards-api.herokuapp.com/programming-quotes-card)` | theme=all_themes | https://github-cards-api.herokuapp.com/programming-quotes-card |

### Available Themes List
1. light
2. dark
3. dark_2
4. pattern_1
5. pattern_2
6. pattern_3
7. random - Any random theme will we applied

## Examples
- Light Theme Card <br/>
![Card](https://github-cards-api.herokuapp.com/jokes-card?theme=light)

- Dark Theme Card <br/>
![Card](https://github-cards-api.herokuapp.com/jokes-card?theme=dark)

- Dark_2 Theme Card <br/>
![Card](https://github-cards-api.herokuapp.com/jokes-card?theme=dark_2)

- Pattern_1 Theme Card <br/>
![Card](https://github-cards-api.herokuapp.com/jokes-card?theme=pattern_1)

- Pattern_2 Theme Card <br/>
![Card](https://github-cards-api.herokuapp.com/jokes-card?theme=pattern_2)

- Pattern_3 Theme Card <br/>
![Card](https://github-cards-api.herokuapp.com/jokes-card?theme=pattern_3)

## How to contribute

1. Fork this repository
2. Add your card in cards directory, you can take the refrence from already added cards
3. Add any data file inside data directory that your card will use
4. Add route of your card in `index.js` file
5. Add your api refrence inside in `help.js` file and also in README.md file
6. Create pull request

