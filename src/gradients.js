const { generateCssGradient } = require("./satori_renderer");

// Define Gradient Constants
const GradientConstants = {
  DARK_1: "dark_1",
  DARK_2: "dark_2",
  LIGHT: "light",
  RGB: "rgb",
  LEMONADE: "lemonade",
  CUSTOM: "custom", // Added support for custom gradients
};

// Function to generate a dynamic gradient
const generateGradient = async (grad_name, ctx, canvas, w, options = {}) => {
  let background;

  // Handle gradient options like type and custom color stops
  const gradientType = options.gradientType || "linear"; // linear or radial
  const gradientDirection = options.gradientDirection || "to right"; // Used in CSS gradients
  const customColorStops = options.colorStops || []; // For custom color stop points

  // Add gradient here
  switch (grad_name) {
    case GradientConstants.DARK_1:
      // CSS Gradient
      background = await generateCssGradient(
        `linear-gradient(${gradientDirection}, rgb(106, 17, 203), rgb(37, 117, 252))`,
        w,
        canvas.height,
        ctx
      );
      return background;

    case GradientConstants.DARK_2:
      // SVG Linear Gradient
      background = ctx.createLinearGradient(
        w / 2 - (canvas.height >= 0 ? w / 2 - canvas.height : 0),
        canvas.height / 2,
        w / 2 + canvas.height,
        canvas.height >= 290 ? canvas.height - 290 : 0
      );
      background.addColorStop(0, "rgba(61, 51, 147, 1)");
      background.addColorStop(0.37, "rgba(43, 118, 185, 1)");
      background.addColorStop(0.65, "rgba(44, 172, 209, 1)");
      background.addColorStop(1, "rgba(53, 235, 147, 1)");
      return background;

    case GradientConstants.LIGHT:
      background = await generateCssGradient(
        `linear-gradient(${gradientDirection}, rgb(42, 245, 152), rgb(0, 158, 253))`,
        w,
        canvas.height,
        ctx
      );
      return background;

    case GradientConstants.RGB:
      // CSS Gradient for RGB Colors
      background = await generateCssGradient(
        `linear-gradient(${gradientDirection}, rgb(255, 0, 0), rgb(0, 255, 0) 50%, rgb(0, 0, 255))`,
        w,
        canvas.height,
        ctx
      );
      return background;

    case GradientConstants.LEMONADE:
      // SVG Linear Gradient for Lemonade Theme
      background = ctx.createLinearGradient(0, canvas.height / 2, w, canvas.height / 2);
      background.addColorStop(0, "rgba(171, 236, 54, 1)");
      background.addColorStop(0.49, "rgba(238, 219, 92, 1)");
      background.addColorStop(1, "rgba(249, 245, 75, 1)");
      return background;

    case GradientConstants.CUSTOM:
      // Support for custom gradients
      if (customColorStops.length > 0) {
        // Custom Linear Gradient
        if (gradientType === "linear") {
          background = ctx.createLinearGradient(0, 0, w, canvas.height);
          customColorStops.forEach(({ stop, color }) => {
            background.addColorStop(stop, color);
          });
        } else if (gradientType === "radial") {
          // Custom Radial Gradient
          background = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.height / 2
          );
          customColorStops.forEach(({ stop, color }) => {
            background.addColorStop(stop, color);
          });
        }
        return background;
      } else {
        throw new Error("Custom gradient requires at least one color stop.");
      }

    default:
      throw new Error(`Unknown gradient name: ${grad_name}`);
  }
};

// Function to dynamically generate a CSS-like gradient string
const generateCssGradientString = (direction = "to right", colorStops = []) => {
  if (!colorStops || colorStops.length === 0) {
    throw new Error("At least one color stop is required for a gradient.");
  }
  const colorStopString = colorStops.map(({ stop, color }) => `${color} ${stop * 100}%`).join(", ");
  return `linear-gradient(${direction}, ${colorStopString})`;
};

// Function to add more flexibility and beauty
const generateFlexibleGradient = (ctx, canvas, options) => {
  const { type = "linear", direction = "to right", colorStops = [] } = options;

  let gradient;
  if (type === "linear") {
    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  } else if (type === "radial") {
    gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2
    );
  }

  colorStops.forEach(({ color, stop }) => {
    gradient.addColorStop(stop, color);
  });

  return gradient;
};

// Example usage of the custom gradient
const customGradientExample = async (ctx, canvas, w) => {
  const customGradient = await generateGradient(
    GradientConstants.CUSTOM,
    ctx,
    canvas,
    w,
    {
      gradientType: "linear",
      colorStops: [
        { stop: 0, color: "#FF5F6D" },
        { stop: 0.5, color: "#FFC371" },
        { stop: 1, color: "#FFCC00" },
      ],
    }
  );
  return customGradient;
};

// Export the constants and functions
module.exports.GradientConstants = GradientConstants;
module.exports.generateGradient = generateGradient;
module.exports.generateFlexibleGradient = generateFlexibleGradient;
module.exports.generateCssGradientString = generateCssGradientString;
