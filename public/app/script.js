/*  GitHub Card Generator front-end
    ---------------------------------------------------------- */
import { CARD_TYPES, THEMES } from "./config.js";

/* ---------- helpers ---------- */
const $ = (id) => document.getElementById(id);

const encodeGradient = (str) =>
  btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const human = (s) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const addOption = (select, item) => {
  const o = document.createElement("option");
  if (typeof item === "string") {
    o.value = item;
    o.textContent = human(item);
  } else {
    o.value = item.value;
    o.textContent = item.label ?? human(item.value);
  }
  select.appendChild(o);
};

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
function newPickr(el, hidden, def) {
  hidden.value = def;
  return Pickr.create({
    el,
    theme: "nano",
    default: def,
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: { hex: true, rgba: true, input: true, save: true },
    },
  }).on("save", (c, self) => {
    const hex = c.toHEXA().toString();
    self.applyColor(hex);
    hidden.value = hex;
  });
}

newPickr("#cardPickr", $("cardColorHex"), "#fff");
newPickr("#bgPickr", $("bgColorHex"), "#fff");
newPickr("#fontPickr", $("fontColorHex"), "#000");
newPickr("#shadowPickr", $("shadowColorHex"), "#000");

/* ---------- radio-driven visibility for card/bg ---------- */
function bindMode(radios, gradInput, pickrRoot) {
  radios.forEach((r) =>
    r.addEventListener("change", () => {
      const grad = r.value === "gradient" && r.checked;
      gradInput.classList.toggle("hidden", !grad);
      document.querySelectorAll(`.${pickrRoot} .pickr`)[0].classList.toggle("hidden", grad);
    })
  );
}

bindMode(
  document.querySelectorAll('input[name="cardColorMode"]'),
  $("cardColorGradientInput"),
  'card_color_pickr'
);
bindMode(
  document.querySelectorAll('input[name="bgColorMode"]'),
  $("bgColorGradientInput"),
  'bg_color_pickr'
);

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
    /* card colour */
    if (data.get("cardColorMode") === "solid") {
      qs.set("card_color", $("cardColorHex").value.slice(1));
    } else {
      qs.set("card_color", encodeGradient($("cardColorGradientInput").value.trim()));
    }

    /* background colour */
    if (data.get("bgColorMode") === "solid") {
      qs.set("bg_color", $("bgColorHex").value.slice(1));
    } else {
      qs.set("bg_color", encodeGradient($("bgColorGradientInput").value.trim()));
    }

    /* font & shadow */
    qs.set("font_color", $("fontColorHex").value.slice(1));
    qs.set("shadow_color", $("shadowColorHex").value.slice(1));
  }

  /* ----------- build final card URL ----------- */
  const cardPath = `/${data.get("card_name")}`;
  const url = `${cardPath}?${qs.toString()}`;
  const host = window.location.protocol + "//" + window.location.host;

  $("preview").src = url;
  $("downloadBtn").href = url;
  let title = cardTitleMaker(data.get("card_name"));
  $("codeOutput").value =
    `![${title}](${host}${url})\n\n` +
    `HTML Tag:\n<img src="${host}${url}" alt="${title}" />`;
  $("resultSection").classList.remove("hidden");
});
