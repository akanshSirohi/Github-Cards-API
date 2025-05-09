# 🌐 Github Cards API&#x20;

A fully serverless card rendering service built with **Cloudflare Workers** and **Satori**. All themes are HTML-based and rendered dynamically without the need for Canvas. Supports a wide variety of card types and customizations.

---

## 🌟 Live Demo & Interactive UI

Try the web-based Card Generator to build and preview your GitHub Cards without writing any code:

**🔗 Live Generator**: https://github-cards-worker.akanshsirohi-dev.workers.dev/app

Use the form to select a card type and theme, tweak custom colors or gradients, then generate and download your SVG card instantly.

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

### 📜 Using the Interactive UI

1. Select a **Card type** and **Theme**.
2. (Optional) For the **custom** theme, adjust the card, background, font, and shadow colors or gradients.
3. Click **Generate card**.
4. Preview your card, download the SVG, or copy the Markdown/HTML embed code.

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

👉 For the full list, visit [`https://github-cards-worker.akanshsirohi-dev.workers.dev`](https://github-cards-worker.akanshsirohi-dev.workers.dev)

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

| Parameter      | Description                                                                      | Default     |
| -------------- | -------------------------------------------------------------------------------- | ----------- |
| `card_color`   | Card's main background color **or** a Base64‑encoded CSS gradient string         | `#ffffff`   |
| `font_color`   | Text color                                                                       | `#000000`   |
| `bg_color`     | Outer background color **or** a Base64‑encoded CSS gradient string               | `#ffffff`   |
| `shadow_color` | Card shadow color                                                                | `#00000000` |
| `google_font`  | Custom google font                                                               | none        |

> **Gradient Support**  
> `card_color` and `bg_color` accept linear or radial gradients. Because commas & parentheses are not URL‑safe, supply the gradient as a **URL‑safe Base64 string**.
> Use <https://www.base64encode.org/> (or any encoder) and copy the **Encode (URL‑Safe)** output.
>
> ```text
> # Original CSS
> linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
>
> # URL‑safe Base64
> bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoMiwgMCwgMzYsIDEpIDAlLCByZ2JhKDksIDksIDEyMSwgMSkgMzUlLCByZ2JhKDAsIDIxMiwgMjU1LCAxKSAxMDAlKTs
> ```
>
> Then call the API:
>
> ```md
> ![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/jokes-card?theme=custom&card_color=<BASE64>&bg_color=<BASE64>&font_color=000&shadow_color=000)
> ```

#### Example (Solid Colors)

```md
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=custom&card_color=000000&font_color=ffffff&shadow_color=ff0000)
```

#### Example (Gradients)

```md
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/jokes-card?theme=custom&card_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoNDIsIDEyMywgMTU1LCAxKSAwJSwgcmdiYSg4NywgMTk5LCAxMzMsIDEpIDUwJSwgcmdiYSgyMzcsIDIyMSwgODMsIDEpIDEwMCUpOw&bg_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoMiwgMCwgMzYsIDEpIDAlLCByZ2JhKDksIDksIDEyMSwgMSkgMzUlLCByZ2JhKDAsIDIxMiwgMjU1LCAxKSAxMDAlKTs&font_color=000&shadow_color=000)
```

### 🖼️ Theme Examples

- **Galactic Dusk Theme** <br>
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=galactic_dusk)

- **Neon Horizon Theme** <br>
![Card](https://github-cards-worker.akanshsirohi-dev.workers.dev/programming-facts-card?theme=neon_horizon)

- **Custom (Gradient)**  <br>
![Custom Gradient](https://github-cards-worker.akanshsirohi-dev.workers.dev/motivational-quotes-card?theme=custom&card_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoNDIsIDEyMywgMTU1LCAxKSAwJSwgcmdiYSg4NywgMTk5LCAxMzMsIDEpIDUwJSwgcmdiYSgyMzcsIDIyMSwgODMsIDEpIDEwMCUpOw&font_color=fff&bg_color=bGluZWFyLWdyYWRpZW50KDkwZGVnLHJnYmEoMiwgMCwgMzYsIDEpIDAlLCByZ2JhKDksIDksIDEyMSwgMSkgMzUlLCByZ2JhKDAsIDIxMiwgMjU1LCAxKSAxMDAlKTs&shadow_color=fff)

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

