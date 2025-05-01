/*  GitHub Card Generator front-end
    ---------------------------------------------------------- */
import { CARD_TYPES, THEMES } from "./config.js";

let card_url_state = null;

/* ---------- helpers ---------- */
const $ = (id) => document.getElementById(id);

const encodeGradient = (str) =>
  btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const human = (s) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const addOption = (select, item) => {
  const opt = document.createElement("option");
  if (typeof item === "string") {
    opt.value = item;
    opt.textContent = human(item);
  } else {
    opt.value = item.value;
    opt.textContent = item.label ?? human(item.value);
  }
  select.appendChild(opt);
};

function rgbToHex(rgbString) {
  // Match rgba or rgb values inside the string
  const match = rgbString.match(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/);

  if (!match) {
      throw new Error("Invalid RGB(A) string");
  }

  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : null;

  const toHex = (value) => value.toString(16).padStart(2, '0');

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}${a !== null ? toHex(a) : ''}`;
  return hex.toUpperCase();
}


/* ---------- populate selects ---------- */
const cardItems = Array.isArray(CARD_TYPES)
  ? CARD_TYPES
  : Object.values(CARD_TYPES);
cardItems.forEach((c) => addOption(cardSelect, c));

const themeItems = Array.isArray(THEMES) ? THEMES : Object.values(THEMES);
themeItems.forEach((t) => addOption(themeSelect, t));

/* ---------- custom theme show/hide ---------- */
themeSelect.addEventListener("change", () => {
  customWrapper.classList.toggle("hidden", themeSelect.value !== "custom");
});

/* ---------- Pickr colour pickers ---------- */
new lc_color_picker('#fontColorHex',{
  modes : ['solid'],
  dark_theme : true,
  preview_style : {
      separator_color : '#374151',
  }
});

new lc_color_picker('#shadowColorHex',{
  modes : ['solid'],
  dark_theme : true,
  preview_style : {
      separator_color : '#374151',
  }
});

new lc_color_picker('#bgColorHex',{
  modes : ['solid', 'linear-gradient', 'radial-gradient'],
  dark_theme : true,
  preview_style : {
      separator_color : '#374151',
  }
});

new lc_color_picker('#cardColorHex',{
  modes : ['solid', 'linear-gradient', 'radial-gradient'],
  dark_theme : true,
  preview_style : {
      separator_color : '#374151',
  }
});

function cardTitleMaker(slug) {
  let title = slug.replaceAll("-", " ");

  // Capitalize each word
  title = title
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return title;
}


/* ---------- submit handler ---------- */
cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(cardForm);
  const qs = new URLSearchParams({
    theme: data.get("theme"),
  });

  if (data.get("theme") === "custom") {
    let card_color = $("cardColorHex").value;
    if (card_color.includes("gradient")) {
      qs.set("card_color", encodeGradient(card_color.trim()));
    } else {
      card_color = card_color.includes("rgb") ? rgbToHex(card_color) : card_color
      qs.set("card_color", card_color.slice(1));
    }

    /* background colour */
    let bg_color = $("bgColorHex").value;
    if (bg_color.includes("gradient")) {
      qs.set("bg_color", encodeGradient(bg_color.trim()));
    } else {
      bg_color = bg_color.includes("rgb") ? rgbToHex(bg_color) : bg_color;
      qs.set("bg_color", bg_color.slice(1));
    }

    /* font & shadow */
    let font_color = $("fontColorHex").value.slice(1);
    let shadow_color = $("shadowColorHex").value.slice(1);
    font_color = font_color.includes("rgb") ? rgbToHex(font_color) : font_color;
    shadow_color = shadow_color.includes("rgb") ? rgbToHex(shadow_color) : shadow_color;
    qs.set("font_color", font_color);
    qs.set("shadow_color", shadow_color);
  }

  /* ----------- build final card URL ----------- */
  const cardPath = `/${data.get("card_name")}`;
  const url = `${cardPath}?${qs.toString()}`;
  const host = window.location.protocol + "//" + window.location.host;

  if(card_url_state === url) {
    return;
  }

  card_url_state = url;

  $("preview").src = url;
  $("downloadBtn").href = url;
  let title = cardTitleMaker(data.get("card_name"));
  $("codeOutput").value =
    `Markdown:\n![${title}](${host}${url})\n\n` +
    `HTML Tag:\n<img src="${host}${url}" alt="${title}" />`;
  $("resultSection").classList.remove("hidden");
});
