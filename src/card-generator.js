const { createCanvas, loadImage } = require("canvas");
const { GradientConstants, generateGradient } = require("./gradients");
const { THEMES } = require("./themes");
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
  for (var ii = 0; ii < cars.length; ii++) {
    var line = "";
    var words = cars[ii].split(" ");
    for (var n = 0; n < words.length; n++) {
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

const processCard = (txt, theme, image) => {
  
  // Card Constants
  const W = 400; // Width Of Card
  const fontSize = 11; // Font Size
  const padding = 30; // Padding Of Card

  // Card Variables
  let card_bg = "#fff";
  let font_color = "#fff";
  let shadow = false;
  let shadowColor = "#000";

  const canvas = createCanvas(W, W, "svg");
  const ctx = canvas.getContext("2d");

  // Text Configuration
  let textConf = {
    x: padding,
    y: fontSize * 3.6,
    maxWidth: W - padding * 1.8,
    lineHeight: fontSize + 2,
  };

  let mHeight = wrapText(ctx,txt,textConf.x,textConf.y,textConf.maxWidth,textConf.lineHeight,true);

  // Change card height according to text
  canvas.height = mHeight + fontSize * 6.5;

  // Background Creation
  let background;

  // Card Themes
  if (theme === "dark") {
    background = generateGradient(GradientConstants.DARK_1,ctx,canvas,W);
    card_bg = "#282828";
    font_color = "#fff";
    shadow = true;
    shadowColor = "#000";
  } else if (theme === "dark_2") {
    background = generateGradient(GradientConstants.DARK_2,ctx,canvas,W);
    card_bg = "#282828";
    font_color = "#fff";
    shadow = true;
    shadowColor = "#000";
  } else if (theme === "light") {
    background = generateGradient(GradientConstants.LIGHT,ctx,canvas,W);
    card_bg = "#eee";
    font_color = "#222";
    shadow = false;
  } else if (theme === "pattern_1") {
    background = ctx.createPattern(image, "repeat");
    card_bg = "#eee";
    font_color = "#222";
    shadow = false;
  } else if (theme === "pattern_2") {
    background = ctx.createPattern(image, "repeat");
    card_bg = "#282828";
    font_color = "#fff";
    shadow = false;
  } else if (theme === "pattern_3") {
    image.height = canvas.height;
    image.width = canvas.width;
    background = ctx.createPattern(image, "repeat");
    card_bg = "#eee";
    font_color = "#222";
    shadow = false;
  }

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
        if(shadow) {
          if("shadow_color" in extra_options) {
            shadowColor = extra_options.shadow_color;
          }
        }
      }
    }
    if ("bg_color" in extra_options) {
      background = extra_options.bg_color;
    }
  }

  // Draw Gradient
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
  ctx.font = `${fontSize}px Ubuntu`;

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
  // Pre processing for predefined pattern themes only

  let pattern_path;

  extra_options = options;

  if (theme === "random") {
    theme = THEMES[Math.floor(Math.random() * (valid_themes.length-1))];
  }

  if (!THEMES.includes(theme)) {
    theme = THEMES[0];
  }

  if (theme.startsWith("pattern_")) {
    if (theme === "pattern_1") {
      pattern_path = "./src/assets/endless-constellation-bg.svg";
    } else if (theme === "pattern_2") {
      pattern_path = "./src/assets/protruding-squares-bg.svg";
    } else if (theme === "pattern_3") {
      pattern_path = "./src/assets/rainbow-vortex-bg.svg";
    }

    try {
      const image = await loadImage(pattern_path);
      callback(processCard(txt, theme, image));
    }catch(e) {
      console.log(e);
      callback(processCard(txt, THEMES[0], null));
    }
  } else {
    callback(processCard(txt, theme, null));
  }
};

module.exports.generateCard = generateCard;
