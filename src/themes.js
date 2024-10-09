const { loadImage } = require("canvas");
const { GradientConstants } = require("./constants");
const { generateGradient } = require("./gradients");

const loadImageAsync = async (path) => {
    try {
        return await loadImage(path);
    } catch (error) {
        console.error(`Error loading image: ${error}`);
        return null;
    }
};

const generateGradientAsync = async (gradientType, ctx, canvas, width) => {
    try {
        return await generateGradient(gradientType, ctx, canvas, width);
    } catch (error) {
        console.error(`Error generating gradient: ${error}`);
        return null;
    }
};

const createTheme = async (ctx, canvas, theme, width, themeConfig = {}) => {
    let themeObj = {
        cardBg: "#fff",
        fontColor: "#fff",
        shadow: false, // Only true for dark themes
        shadowColor: "#000",
        background: "#000",
        ...themeConfig
    };

    let patternPath;
    let image;
    if (theme.startsWith("pattern_")) {
        // Load image for pattern theme
        // Add pattern path here if theme has pattern in it
        if (theme === "pattern_1") {
            patternPath = "./src/assets/images/endless-constellation-bg.svg";
        } else if (theme === "pattern_2") {
            patternPath = "./src/assets/images/protruding-squares-bg.svg";
        } else if (theme === "pattern_3") {
            patternPath = "./src/assets/images/rainbow-vortex-bg.svg";
        }
        image = await loadImageAsync(patternPath);
        if (!image) {
            // If image is not found, fallback to default theme
            theme = THEMES[0];
        }
    }

    switch (theme) {
        case "dark":
            themeObj.background = await generateGradientAsync(GradientConstants.DARK_1, ctx, canvas, width);
            themeObj.cardBg = "#282828";
            themeObj.fontColor = "#fff";
            themeObj.shadow = true;
            themeObj.shadowColor = "#000";
            break;
        case "dark_2":
            themeObj.background = await generateGradientAsync(GradientConstants.DARK_2, ctx, canvas, width);
            themeObj.cardBg = "#282828";
            themeObj.fontColor = "#fff";
            themeObj.shadow = true;
            themeObj.shadowColor = "#000";
            break;
        case "light":
            themeObj.background = await generateGradientAsync(GradientConstants.LIGHT, ctx, canvas, width);
            themeObj.cardBg = "#eee";
            themeObj.fontColor = "#222";
            themeObj.shadow = false;
            break;
        case "rgb":
            themeObj.background = await generateGradientAsync(GradientConstants.RGB, ctx, canvas, width);
            themeObj.cardBg = "#282828";
            themeObj.fontColor = "#fff";
            themeObj.shadow = true;
            themeObj.shadowColor = "#000";
            break;
        case "pattern_1":
            themeObj.background = ctx.createPattern(image, "repeat");
            themeObj.cardBg = "#eee";
            themeObj.fontColor = "#222";
            themeObj.shadow = false;
            break;
        case "pattern_2":
            themeObj.background = ctx.createPattern(image, "repeat");
            themeObj.cardBg = "#282828";
            themeObj.fontColor = "#fff";
            themeObj.shadow = false;
            break;
        case "pattern_3":
            image.height = canvas.height;
            image.width = canvas.width;
            themeObj.background = ctx.createPattern(image, "repeat");
            themeObj.cardBg = "#eee";
            themeObj.fontColor = "#222";
            themeObj.shadow = false;
            break;
        case "lemonade":
            themeObj.background = await generateGradientAsync(GradientConstants.LEMONADE, ctx, canvas, width);
            themeObj.cardBg = "#E1E5EA";
            themeObj.fontColor = "#222";
            themeObj.shadow = false;
            break;
    }

    return themeObj;
};

module.exports = { createTheme };

module.exports.THEMES = THEMES;
module.exports.create_theme = create_theme;