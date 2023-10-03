const {createCanvas} = require("canvas");
const {THEMES, create_theme} = require("./themes");
let extra_options = null;

// prettier-ignore
const roundRect = (ctx, x, y, width, height, radius, fill, stroke, shadow, shadowColor) => {
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    if(shadow) {
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 7;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    ctx.fill();
    if(shadow) {
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
  }
  if (stroke) {
    ctx.stroke();
  }
};

const wrapText = (context, text, x, y, maxWidth, lineHeight, measure) => {
  var cars = text.split("\n");
  let linesCnt = 0;
  for (let ii = 0; ii < cars.length; ii++) {
    var line = "";
    var words = cars[ii].split(" ");
    for (let n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth) {
        if (!measure) {
          context.fillText(line, x, y);
        }
        linesCnt++;
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (!measure) {
      context.fillText(line, x, y);
    }
    linesCnt++;
    y += lineHeight;
  }
  return linesCnt * lineHeight;
};

const processCard = async (txt, theme) => {
  // Card Constants
  const W = 400; // Width Of Card
  const fontSize = 11; // Font Size
  const padding = 30; // Padding Of Card

  // Canvas Creation
  const canvas = createCanvas(W, W, "svg");
  const ctx = canvas.getContext("2d");

  // Text Configuration
  let textConf = {
    x: padding,
    y: fontSize * 3.6,
    maxWidth: W - padding * 1.8,
    lineHeight: fontSize + 2,
  };

  let mHeight = wrapText(
    ctx,
    txt,
    textConf.x,
    textConf.y,
    textConf.maxWidth,
    textConf.lineHeight,
    true
  );

  // Change card height according to text
  canvas.height = mHeight + fontSize * 6.5;

  // Background Creation
  let background;

  // Theme Creation
  const theme_obj = await create_theme(ctx, canvas, theme, W);
  card_bg = theme_obj.card_bg;
  font_color = theme_obj.font_color;
  shadow = theme_obj.shadow;
  shadowColor = theme_obj.shadowColor;
  background = theme_obj.background;

  // Custom Theme Using Url Params
  if (extra_options != null) {
    if ("card_color" in extra_options) {
      card_bg = extra_options.card_color;
    }
    if ("font_color" in extra_options) {
      font_color = extra_options.font_color;
    }
    if ("shadow" in extra_options) {
      if (typeof extra_options.shadow === "boolean") {
        shadow = extra_options.shadow;
        if (shadow) {
          if ("shadow_color" in extra_options) {
            shadowColor = extra_options.shadow_color;
          }
        }
      }
    }
    if ("bg_color" in extra_options) {
      background = extra_options.bg_color;
    }
  }

  // Draw Background
  ctx.beginPath();
  ctx.fillStyle = background;
  ctx.strokeStyle = "#00000000";
  ctx.fillRect(0, 0, W, canvas.height);
  ctx.stroke();

  // Draw Card
  ctx.beginPath();
  ctx.fillStyle = card_bg;
  ctx.strokeStyle = "#00000000";
  roundRect(
    ctx,
    padding / 2,
    padding / 2,
    W - padding,
    canvas.height - padding,
    5,
    true,
    true,
    shadow,
    shadowColor
  );

  // Draw Text
  ctx.fillStyle = font_color;
  // ctx.font = `${fontSize}px Ubuntu`;
  ctx.font = `${fontSize}px 'Montserrat', sans-serif`;

  wrapText(
    ctx,
    txt,
    textConf.x,
    textConf.y,
    textConf.maxWidth,
    textConf.lineHeight,
    false
  );

  let svg = canvas.toBuffer().toString("utf-8");
  return svg;
};

const generateCard = async (txt, theme, options, callback) => {
  extra_options = options;

  if (theme === "random") {
    theme = THEMES[Math.floor(Math.random() * (valid_themes.length - 1))];
  }

  if (!THEMES.includes(theme)) {
    theme = THEMES[0];
  }

  const svg = await processCard(txt, theme);
  callback(svg);
};

module.exports.generateCard = generateCard;
