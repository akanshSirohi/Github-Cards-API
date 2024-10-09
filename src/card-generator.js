const { createCanvas, registerFont } = require("canvas");
const { THEMES, create_theme } = require("./themes");
const { generateSvg } = require("./satori_renderer");

registerFont("./src/assets/fonts/Ubuntu-Regular.ttf", { family: "Ubuntu" }); // English Font
registerFont("./src/assets/fonts/NotoSans-Regular.ttf", { family: "NotoSans" }); // Hindi Font

// Supported Languages
const Languages = {
  HINDI: 'hindi',
  ENGLISH: 'english',
};

// Default Card Constants
const DEFAULT_CARD_WIDTH = 400;
const DEFAULT_CARD_HEIGHT = 200;
const DEFAULT_FONT_SIZE = 14; // Default font size
const DEFAULT_PADDING = 30; // Padding of card

// Function to generate a rounded rectangle with optional shadow
const roundRect = (ctx, x, y, width, height, radius, fill, stroke, shadow = false, shadowOptions = {}) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (shadow) {
    ctx.shadowColor = shadowOptions.shadowColor || '#000000';
    ctx.shadowBlur = shadowOptions.shadowBlur || 10;
    ctx.shadowOffsetX = shadowOptions.shadowOffsetX || 5;
    ctx.shadowOffsetY = shadowOptions.shadowOffsetY || 5;
  }

  if (fill) {
    ctx.fill();
  }

  if (stroke) {
    ctx.stroke();
  }
};

// Function to wrap text
const wrapText = (context, text, x, y, maxWidth, lineHeight, measure) => {
  const words = text.split(' ');
  let line = '';
  let height = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      if (!measure) context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      height += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (!measure) context.fillText(line, x, y);
  height += lineHeight;
  return height;
};

// Dynamic Font Size Scaling Based on Content
const adjustFontSize = (ctx, text, maxWidth, maxHeight, initialFontSize) => {
  let fontSize = initialFontSize;
  let textWidth;
  do {
    ctx.font = `${fontSize}px Ubuntu`;
    textWidth = ctx.measureText(text).width;
    fontSize -= 1;
  } while (textWidth > maxWidth && fontSize > 5);
  return fontSize;
};

// Function to process the card creation
const processCard = async (txt, theme, language, options) => {
  const cardWidth = options?.width || DEFAULT_CARD_WIDTH;
  const cardHeight = options?.height || DEFAULT_CARD_HEIGHT;
  const fontSize = options?.fontSize || DEFAULT_FONT_SIZE;
  const padding = options?.padding || DEFAULT_PADDING;

  const canvas = createCanvas(cardWidth, cardHeight, "svg");
  const ctx = canvas.getContext("2d");

  // Text Configuration
  const textConf = {
    x: padding,
    y: padding * 1.5,
    maxWidth: cardWidth - padding * 2,
    lineHeight: fontSize + 2,
  };

  // Background, font color, shadow, and shadow color from theme
  const themeObj = await create_theme(ctx, canvas, theme, cardWidth);
  let { cardBg, fontColor, shadow, shadowColor, background } = themeObj;

  // Custom Theme Using URL Params
  if (options) {
    if (options.card_color) cardBg = options.card_color;
    if (options.font_color) fontColor = options.font_color;
    if (options.bg_color) background = options.bg_color;
    if (options.shadow) {
      shadow = options.shadow;
      if (options.shadow_color) shadowColor = options.shadow_color;
    }
  }

  // Draw Background
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  // Draw Card with Shadow
  ctx.fillStyle = cardBg;
  roundRect(ctx, padding / 2, padding / 2, cardWidth - padding, cardHeight - padding, 10, true, true, shadow, {
    shadowColor,
    shadowBlur: 20,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
  });

  // Adjust font size dynamically based on text
  const dynamicFontSize = adjustFontSize(ctx, txt, textConf.maxWidth, cardHeight, fontSize);

  // Draw Text
  ctx.fillStyle = fontColor;
  ctx.font = `${dynamicFontSize}px ${language === Languages.HINDI ? 'NotoSans' : 'Ubuntu'}`;
  wrapText(ctx, txt, textConf.x, textConf.y, textConf.maxWidth, textConf.lineHeight, false);

  // Return SVG output
  return canvas.toBuffer().toString("utf-8");
};

// Function to generate a card
const generateCard = async (txt, theme, options, language) => {
  // If theme is random, pick a random theme
  if (theme === "random") {
    theme = THEMES[Math.floor(Math.random() * THEMES.length)];
  }

  // If theme is invalid, fallback to default
  if (!THEMES.includes(theme)) {
    theme = THEMES[0];
  }

  // Generate SVG
  const svg = await processCard(txt, theme, language, options);
  return svg;
};

// Function to generate an HTML-based card
const generateHTMLCard = async (html, language) => {
  const font = language === Languages.ENGLISH ? "Ubuntu" : "NotoSans";
  return await generateSvg(html, font);
};

// Module exports
module.exports.generateCard = generateCard;
module.exports.generateHTMLCard = generateHTMLCard;
module.exports.CARD_AGE = 300;
module.exports.Languages = Languages;
