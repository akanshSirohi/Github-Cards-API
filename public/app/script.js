import { CARD_TYPES, THEMES } from "./config.js";
import { generateRandomGradient } from "./gradientFactory.js";

let card_url_state = null;

/* ---------- Repository Stats Functions ---------- */
async function fetchRepoStats() {
  try {
    // Use our own API endpoint which has caching and better rate limit handling
    const response = await fetch('/api/repo-stats');
    if (!response.ok) throw new Error('Failed to fetch repo stats from API');
    
    const stats = await response.json();
    
    // Update UI with stats
    updateRepoStats({
      stars: stats.stars,
      forks: stats.forks,
      contributors: stats.contributors,
      updatedAt: stats.updatedAt
    });
  } catch (error) {
    console.warn('Failed to fetch repository stats:', error);
    // Update UI with fallback values
    updateRepoStats({
      stars: '?',
      forks: '?',
      contributors: '?',
      updatedAt: null
    });
  }
}

function updateRepoStats(stats) {
  const formatNumber = (num) => {
    if (typeof num !== 'number') return num;
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Update DOM elements and remove loading animation
  const starsEl = document.getElementById('stars-count');
  const forksEl = document.getElementById('forks-count');
  const contributorsEl = document.getElementById('contributors-count');
  const updatedEl = document.getElementById('updated-date');
  
  if (starsEl) {
    starsEl.textContent = formatNumber(stats.stars);
    starsEl.classList.remove('stat-loading');
  }
  
  if (forksEl) {
    forksEl.textContent = formatNumber(stats.forks);
    forksEl.classList.remove('stat-loading');
  }
  
  if (contributorsEl) {
    contributorsEl.textContent = formatNumber(stats.contributors);
    contributorsEl.classList.remove('stat-loading');
  }
  
  if (updatedEl) {
    updatedEl.textContent = formatDate(stats.updatedAt);
    updatedEl.classList.remove('stat-loading');
  }
}

/* ---------- helpers ---------- */
const b64Encode = (str) => {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const human = (s) => {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

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
  const match = rgbString.match(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/);
  if (!match) throw new Error("Invalid RGB(A) string");
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : null;
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return (`#${toHex(r)}${toHex(g)}${toHex(b)}${a !== null ? toHex(a) : ""}`).toUpperCase();
}

/* ---------- populate selects ---------- */
const cardItems = Array.isArray(CARD_TYPES) ? CARD_TYPES : Object.values(CARD_TYPES);
cardItems.forEach((c) => addOption(cardSelect, c));
const themeItems = Array.isArray(THEMES) ? THEMES : Object.values(THEMES);
themeItems.forEach((t) => addOption(themeSelect, t));

/* ---------- custom theme show/hide ---------- */
themeSelect.addEventListener("change", () => {
  customWrapper.classList.toggle("hidden", themeSelect.value !== "custom");
});

$("#cardSelect").change(function () {
  $("#customTextWapper").toggleClass("hidden", this.value !== "my-card");
});

/* range -> live label */
$(".dynamic-range").on("input", function () {
  let target = $(this).data("target");
  $(`#${target}`).html(`(${$(this).val()}px)`);
});

/* ---------- lc_color_picker instances (library kept intact) ---------- */
const savedTheme = localStorage.getItem("gcg-theme");
if (savedTheme === "light") document.documentElement.classList.remove("dark");
if (savedTheme === "dark")  document.documentElement.classList.add("dark");

function initPickers() {
  const isDark = document.documentElement.classList.contains("dark");
  
  new lc_color_picker("#fontColorHex", {
    modes: ["solid"],
    dark_theme: isDark,
    preview_style: { separator_color: isDark ? "#374151" : "#e5e7eb", width: 40 },
  });
  new lc_color_picker("#shadowColorHex", {
    modes: ["solid"],
    dark_theme: isDark,
    preview_style: { separator_color: isDark ? "#374151" : "#e5e7eb", width: 40 },
  });
  new lc_color_picker("#bgColorHex", {
    modes: ["solid","linear-gradient","radial-gradient"],
    dark_theme: isDark,
    preview_style: { separator_color: isDark ? "#374151" : "#e5e7eb", width: 40 },
  });
  new lc_color_picker("#cardColorHex", {
    modes: ["solid","linear-gradient","radial-gradient"],
    dark_theme: isDark,
    preview_style: { separator_color: isDark ? "#374151" : "#e5e7eb", width: 40 },
  });
}

initPickers();

function cardTitleMaker(slug) {
  let title = slug.replaceAll("-", " ");
  return title.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ---------- Dark mode toggle (new, non-breaking) ---------- */
(function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeToggleIcon");
  const stored = localStorage.getItem("gcg-theme");
  if (stored === "light") root.classList.remove("dark"); // default is dark (existing)
  if (stored === "dark") root.classList.add("dark");
  const setIcon = () => (icon.textContent = root.classList.contains("dark") ? "🌙" : "☀️");
  setIcon();
  btn?.addEventListener("click", () => {
    root.classList.toggle("dark");
    localStorage.setItem("gcg-theme", root.classList.contains("dark") ? "dark" : "light");
    setIcon();

    ['#fontColorHex','#shadowColorHex','#bgColorHex','#cardColorHex'].forEach(sel => {
      const el = document.querySelector(sel);
      const clone = el.cloneNode(true);    // drop old listeners
      el.replaceWith(clone);
    });
    initPickers(); // calls the four new lc_color_picker(...) with fresh isDark
  });
})();

/* ---------- submit handler ---------- */
cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const placeholder = $("#placeholder");
  placeholder.addClass("hidden");

  const data = new FormData(cardForm);
  const qs = new URLSearchParams({ theme: data.get("theme") });

  if (data.get("card_name") === "my-card") {
    qs.set("text", b64Encode(data.get("customText") || ""));
  }

  if (data.get("theme") === "custom") {
    // card colour
    let card_color = data.get("cardColorHex");
    if (card_color.includes("gradient")) {
      qs.set("card_color", b64Encode(card_color.trim()));
    } else {
      card_color = card_color.includes("rgb") ? rgbToHex(card_color) : card_color;
      qs.set("card_color", card_color.slice(1));
    }

    // background colour
    let bg_color = data.get("bgColorHex");
    if (bg_color.includes("gradient")) {
      qs.set("bg_color", b64Encode(bg_color.trim()));
    } else {
      bg_color = bg_color.includes("rgb") ? rgbToHex(bg_color) : bg_color;
      qs.set("bg_color", bg_color.slice(1));
    }

    // font & shadow
    let font_color = data.get("fontColorHex");
    let shadow_color = data.get("shadowColorHex");
    font_color = font_color.includes("rgb") ? rgbToHex(font_color) : font_color;
    shadow_color = shadow_color.includes("rgb") ? rgbToHex(shadow_color) : shadow_color;
    qs.set("font_color", font_color.replace(/^#/, ""));
    qs.set("shadow_color", shadow_color.replace(/^#/, ""));

    // google font
    let custom_font = data.get("customGoogleFont");
    if (custom_font) qs.set("google_font", custom_font);

    // text align
    let text_align = data.get("textAlignment");
    if (text_align) qs.set("text_align", text_align);

    // paddings/sizes (only if not default)
    let outer_pad = data.get("outerPad");
    if (outer_pad != 15) qs.set("outer_pad", outer_pad);

    let inner_pad = data.get("innerPad");
    if (inner_pad != 15) qs.set("inner_pad", inner_pad);

    let font_size = data.get("fontSize");
    if (font_size != 16) qs.set("font_size", font_size);

    let card_width = data.get("cardWidth");
    if (card_width != 400) qs.set("card_width", card_width);

    let card_min_height = data.get("cardMinHeight");
    if (card_min_height != 100) qs.set("card_min_height", card_min_height);
  }

  /* ----------- build final card URL ----------- */
  const DEBUG = false;
  const cardPath = `/${data.get("card_name")}`;
  const url = `${cardPath}?${qs.toString()}${DEBUG ? `&t=${new Date().getTime()}` : ""}`;
  const host = window.location.protocol + "//" + window.location.host;

  if (card_url_state === url) return;
  card_url_state = url;

  const preview = $("#preview");
  const loader = $("#loader");
  const preload = new Image();

  preload.onload = () => {
    preview.attr("src", preload.src);
    preview.removeClass("hidden");
    loader.addClass("hidden");
    $("#resultSection").removeClass("hidden"); // ensure visible after first success
  };
  preload.onerror = () => {
    loader.text("Failed to load");
    loader.attr("class", "absolute text-sm text-red-500");
  };
  preload.src = url;

  preview.addClass("hidden");
  loader.text("");
  loader.attr("class", "absolute w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin");
  loader.removeClass("hidden");

  $("#downloadBtn").attr("href", url);
  const title = cardTitleMaker(data.get("card_name"));
  $("#mdOutput").val(`![${title}](${host}${url})`);
  $("#htmlOutput").val(`<img src="${host}${url}" alt="${title}" />`);
});

/* Reset single range */
$(".reset-btn").click(function () {
  let range = $(this).data("target");
  let value = $(this).data("val");
  $(`#${range}`).val(value);
  $(`#${range}Label`).html(`(${value}px)`);
});

/* Random gradient buttons */
$(".random-grad-gen-btn").click(function () {
  let target = $(this).data("target");
  let randomGradient = generateRandomGradient();
  $(`#${target}`).val(randomGradient);
  $(`#${target}`).parent().find(".lccp-preview").css("background", randomGradient);
});

/* Copy functionality (kept) */
const clipboard = new ClipboardJS(".copy-btn");
clipboard.on("success", (e) => {
  const btn = e.trigger;
  btn.dataset.tooltip = "Copied!";
  btn.dataset.show = "true";
  setTimeout(() => {
    btn.dataset.tooltip = "Copy";
    delete btn.dataset.show;
  }, 1200);
});
clipboard.on("error", (e) => {
  const btn = e.trigger;
  btn.dataset.tooltip = "Failed";
  btn.dataset.show = "true";
  setTimeout(() => {
    btn.dataset.tooltip = "Copy";
    delete btn.dataset.show;
  }, 1200);
});

// --- Icon-only text alignment picker ---
(function initAlignPicker(){
  const picker = document.getElementById('alignPicker');
  const hidden = document.getElementById('textAlignment');
  if (!picker || !hidden) return;

  const buttons = Array.from(picker.querySelectorAll('.align-btn'));

  const select = (val) => {
    buttons.forEach(b => b.setAttribute('aria-checked', (b.dataset.value === val) ? 'true' : 'false'));
    hidden.value = val;
  };

  // click support
  buttons.forEach(btn => btn.addEventListener('click', () => select(btn.dataset.value)));

  // keyboard nav (arrows/wasd/enter/space)
  picker.addEventListener('keydown', (e) => {
    const keys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const order = ['tl','tm','tr','ml','mm','mr','bl','bm','br'];
    const current = hidden.value || 'mm';
    const idx = order.indexOf(current);
    const col = idx % 3, row = Math.floor(idx / 3);
    let [r,c] = [row,col];
    if (e.key==='ArrowUp' || e.key==='w' || e.key==='W')   r = Math.max(0, r-1);
    if (e.key==='ArrowDown'|| e.key==='s' || e.key==='S')  r = Math.min(2, r+1);
    if (e.key==='ArrowLeft'|| e.key==='a' || e.key==='A')  c = Math.max(0, c-1);
    if (e.key==='ArrowRight'|| e.key==='d'|| e.key==='D')  c = Math.min(2, c+1);
    select(order[r*3 + c]);
  });

  // optional: default to center
  select(hidden.value || 'mm');
})();

/* ---------- Initialize Repository Stats ---------- */
// Fetch repository stats when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchRepoStats();
});
