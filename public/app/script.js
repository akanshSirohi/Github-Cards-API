import { CARD_TYPES, THEMES } from "./config.js";
import { generateRandomGradient } from "./gradientFactory.js";

let card_url_state = null;

/* ---------- helpers ---------- */
const b64Encode = (str) => {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

const human = (s) => {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

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

$("#cardSelect").change(function(){
  $("#customTextWapper").toggleClass("hidden", this.value !== "my-card");
});

$(".dynamic-range").on('input',function(){
  let target = $(this).data("target");
  $(`#${target}`).html(`(${$(this).val()}px)`);
});

/* ---------- Pickr colour pickers ---------- */
new lc_color_picker('#fontColorHex', {
  modes: ['solid'],
  dark_theme: true,
  preview_style: {
    separator_color: '#374151',
    width: 40
  },
});

new lc_color_picker('#shadowColorHex', {
  modes: ['solid'],
  dark_theme: true,
  preview_style: {
    separator_color: '#374151',
    width: 40
  }
});

new lc_color_picker('#bgColorHex', {
  modes: ['solid', 'linear-gradient', 'radial-gradient'],
  dark_theme: true,
  preview_style: {
    separator_color: '#374151',
    width: 40
  }
});

new lc_color_picker('#cardColorHex', {
  modes: ['solid', 'linear-gradient', 'radial-gradient'],
  dark_theme: true,
  preview_style: {
    separator_color: '#374151',
    width: 40
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

  if(data.get("card_name") === "my-card") {
    qs.set("text", b64Encode(data.get("customText")));
  }

  if (data.get("theme") === "custom") {
    let card_color = data.get("cardColorHex");
    if (card_color.includes("gradient")) {
      qs.set("card_color", b64Encode(card_color.trim()));
    } else {
      card_color = card_color.includes("rgb") ? rgbToHex(card_color) : card_color
      qs.set("card_color", card_color.slice(1));
    }

    /* background colour */
    let bg_color = data.get("bgColorHex");
    if (bg_color.includes("gradient")) {
      qs.set("bg_color", b64Encode(bg_color.trim()));
    } else {
      bg_color = bg_color.includes("rgb") ? rgbToHex(bg_color) : bg_color;
      qs.set("bg_color", bg_color.slice(1));
    }

    /* font & shadow */
    let font_color = data.get("fontColorHex");
    let shadow_color = data.get("shadowColorHex");
    font_color = font_color.includes("rgb") ? rgbToHex(font_color) : font_color.slice(1);
    shadow_color = shadow_color.includes("rgb") ? rgbToHex(shadow_color) : shadow_color.slice(1);
    qs.set("font_color", font_color);
    qs.set("shadow_color", shadow_color);

    let custom_font = data.get("customGoogleFont");
    if (custom_font) {
      qs.set("google_font", custom_font);
    }

    let text_align = data.get("textAlgnment");
    if (text_align) {
      qs.set("text_align", text_align);
    }

    let outer_pad = data.get("outerPad");
    if(outer_pad != 15) { // Only add if differ from default
      qs.set("outer_pad", outer_pad);
    }

    let inner_pad = data.get("innerPad");
    if(inner_pad != 15) { // Only add if differ from default
      qs.set("inner_pad", inner_pad);
    }

    let font_size = data.get("fontSize");
    if(font_size != 16) { // Only add if differ from default
      qs.set("font_size", font_size);
    }

    let card_width = data.get("cardWidth");
    if(card_width != 400) { // Only add if differ from default
      qs.set("card_width", card_width);
    }

    let card_min_height = data.get("cardMinHeight");
    if(card_min_height != 100) { // Only add if differ from default
      qs.set("card_min_height", card_min_height);
    }

  }

  

  /* ----------- build final card URL ----------- */
  const DEBUG = false;
  const cardPath = `/${data.get("card_name")}`;
  const url = `${cardPath}?${qs.toString()}${DEBUG ? `&t=${new Date().getTime()}` : ''}`;
  const host = window.location.protocol + "//" + window.location.host;

  if (card_url_state === url) {
    return;
  }

  card_url_state = url;

  const preview = $('#preview');
  const loader = $('#loader');
  const preload = new Image();
  preload.onload = () => {
    preview.attr("src",preload.src);
    preview.removeClass("hidden")
    loader.addClass('hidden');
  };
  preload.onerror = () => {
    loader.text('Failed to load');
    loader.attr("class","absolute");
  };
  preload.src = url;
  preview.addClass('hidden');
  loader.text('');
  loader.attr("class","absolute w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin");
  loader.removeClass('hidden');

  $("#downloadBtn").attr("href",url);
  let title = cardTitleMaker(data.get("card_name"));
  $("#mdOutput").val(`![${title}](${host}${url})`);
  $("#htmlOutput").val(`<img src="${host}${url}" alt="${title}" />`);
  $("#resultSection").removeClass("hidden");
});

$(".reset-btn").click(function(){
  let range = $(this).data("target");
  let value = $(this).data("val");
  $(`#${range}`).val(value);
  $(`#${range}Label`).html(`(${value}px)`);
});

$(".random-grad-gen-btn").click(function(){
  let target = $(this).data("target");
  let randomGradient = generateRandomGradient();
  $(`#${target}`).val(randomGradient);
  $(`#${target}`).parent().find(".lccp-preview").css("background", randomGradient);
});

/* Copy functionality */
const clipboard = new ClipboardJS('.copy-btn');

clipboard.on('success', e => {
  const btn = e.trigger;
  btn.dataset.tooltip = 'Copied!';
  btn.dataset.show = 'true';

  setTimeout(() => {
    btn.dataset.tooltip = 'Copy';
    delete btn.dataset.show;
  }, 1200);
});

clipboard.on('error', e => {
  const btn = e.trigger;
  btn.dataset.tooltip = 'Failed';
  btn.dataset.show = 'true';
  setTimeout(() => {
    btn.dataset.tooltip = 'Copy';
    delete btn.dataset.show;
  }, 1200);
});