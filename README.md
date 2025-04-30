# 🌐 Github Cards API&#x20;

A fully serverless card rendering service built with **Cloudflare Workers** and **Satori**. All themes are HTML-based and rendered dynamically without the need for Canvas. Supports a wide variety of card types and customizations.

---

<!--
## 📚 Table of Contents

- [Usage](#usage)
  - [Using Markdown](#using-markdown)
  - [Using HTML](#using-html)
- [Available Cards](#available-cards)
- [Themes](#themes)
  - [Available Themes](#available-themes)
  - [Custom Arguments](#custom-arguments)
  - [Examples](#examples)
- [Contributing](#contributing)
  - [Adding a New Card](#adding-a-new-card)
  - [Adding a New Theme](#adding-a-new-theme)
- [Additional Information](#additional-information)

---
-->

## 🚀 Usage

Access all available cards and their respective options at:
[`https://github-cards-worker.akanshsirohi-dev.workers.dev/`](https://github-cards-worker.akanshsirohi-dev.workers.dev/)

### 📎 Using Markdown

```md
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/card-name)
```

### 🧩 Using HTML

```html
<img src="https://github-cards-worker.akanshsirohi-dev.workers.dev/card-name" alt="Card" />
```

---

## 🧾 Available Cards

All cards are managed via `help.js`. A few popular examples include:

| Card Name              | Example                                                                                      |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `programming-facts`    | `![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card)`   |
| `motivational-quote`   | `![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/motivational-quotes-card)` |
| `programming-quote`    | `![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-quotes-card)`  |
| `bhagwad-geeta-quotes` | `![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/bhagavad-geeta-card )`     |
| `fun-facts`            | `![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/fun-fact-card)`            |

👉 For the full list, visit [`/help`](https://github-cards-worker.akanshsirohi-dev.workers.dev/help)

---

## 🎨 Themes

All themes are created using HTML and rendered via **Satori**.

### ✅ Available Themes

- `custom` (fully customizable)
- `techy`
- `neon_horizon`
- `galactic_dusk`
- `aurora_borealis`
- `retro_block`
- `rainbow_vortex`
- `endless_constellation`
- `lemonade`
- `galaxy`
- `vintage`

### ⚙️ Custom Arguments (for `CUSTOM` theme only)

| Parameter      | Description                  | Default     |
| -------------- | ---------------------------- | ----------- |
| `card_color`   | Card's main background color | `#ffffff`   |
| `font_color`   | Text color                   | `#000000`   |
| `bg_color`     | Outer background color       | `#ffffff`   |
| `shadow_color` | Card shadow color            | `#00000000` |

#### Example

```md
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=custom&card_color=000000&font_color=ffffff&shadow_color=ff0000)
```

### 🖼️ Examples

- **Galactic Dusk Theme** <br>
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=galactic_dusk)

- **Neon Horizon Theme** <br>
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=neon_horizon)

- **Custom Theme Example** <br>
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/motivational-quotes-card?theme=custom&card_color=f00&font_color=fff&bg_color=000&shadow_color=fff)

---

## 🤝 Contributing

### 🧩 Adding a New Card

1. Fork this repository.
2. Add your card in the `src/cards` directory. Refer to existing cards for guidance.
3. If needed, add a file inside the `data` directory (supports English & Hindi).
4. Register your route in `index.js`.
5. Update both `help.js` and this README.
6. Ensure your dataset contains at least \~100 entries.
7. Submit a pull request.
8. Test locally:

```bash
wrangler dev
```

### 🎨 Adding a New Theme

1. Fork this repository.
2. Open `themes.js`.
3. Add your theme inside the exported `HTML_THEMES` object.
4. Use inline styles & valid Satori-compatible HTML.
5. Reference `{{card_content}}` properly.
6. Update `help.js` and the README.
7. Submit a pull request.

### ✅ Contribution Guidelines

- Code should be clean and minimal.
- Themes must be visually distinct.
- Cards must be useful, interesting, or educational.
- Avoid copyright violations.

---

## 🔎 Additional Information

- Built with **Cloudflare Workers** for speed and scalability.
- Uses **Satori** for HTML-to-image rendering.
- All assets (fonts, images) are served via Cloudflare Worker assets.
- Cards and themes are maintained centrally in `help.js` and `themes.js`.

---

✨ Feel free to create a PR and contribute a card or theme! Let’s build something cool together.

