const { createCanvas } = require("canvas");

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
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
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 7;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

function wrapText(context, text, x, y, maxWidth, lineHeight, measure) {
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
}

const getTestSvg = () => {
  const W = 500;
  const fontSize = 11;
  const padding = 30;

  const canvas = createCanvas(W, W, "svg");
  const ctx = canvas.getContext("2d");

  let txt =
    "Some very very long text to print Some very very long text to print Some very very long text to print Some very very long text to print Some very very long text to print Some very very long text to print Some very very long text to print Some very very long text to print Some very very long text to print Some very very long text to print";

  let textConf = {
    x: padding,
    y: fontSize * 3.6,
    maxWidth: W - padding * 1.5,
    lineHeight: fontSize,
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

  canvas.height = mHeight + fontSize * 6;

  // Gradient Creation
  let grad = ctx.createLinearGradient(
    0,
    canvas.height / 2,
    W,
    canvas.height / 2
  );
  grad.addColorStop(0, "rgba(106, 17, 203, 1)");
  grad.addColorStop(1, "rgba(37, 117, 252, 1)");

  // Draw Gradient
  ctx.beginPath();
  ctx.fillStyle = grad;
  ctx.strokeStyle = "#00000000";
  ctx.fillRect(0, 0, W, canvas.height);
  ctx.stroke();

  // Draw Card
  ctx.beginPath();
  ctx.fillStyle = "#282828";
  ctx.lineWidth = 0;
  ctx.strokeStyle = "#00000000";
  roundRect(
    ctx,
    padding / 2,
    padding / 2,
    W - padding,
    canvas.height - padding,
    5,
    true,
    true
  );

  // Draw Text
  ctx.fillStyle = "#fff";
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

  let svg = "data:image/svg+xml;base64," + canvas.toBuffer().toString("base64");
  return svg;
  // fs.writeFileSync("out.svg", buff);
};

module.exports.getTestSvg = getTestSvg;
