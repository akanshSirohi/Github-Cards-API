const { loadImage } = require("canvas");
const { GradientConstants, generateGradient } = require("./gradients");

// custom theme should be in the last position always
const THEMES = [
    "dark",
    "dark_2",
    "light",
    "pattern_1",
    "pattern_2",
    "pattern_3",
    "custom"
];

const create_theme = async (ctx, canvas, theme) => {
    let theme_obj = {
        card_bg: "#fff",
        font_color: "#fff",
        shadow: false, // Only true for false
        shadowColor: "#000",
        background: "#000",
    }

    let pattern_path;
    let image;
    if (theme.startsWith("pattern_")) {
        // Load image for pattern theme
        // Add pattern path here if theme has pattern in it
        if (theme === "pattern_1") {
           pattern_path = "./src/assets/endless-constellation-bg.svg";
        } else if (theme === "pattern_2") {
            pattern_path = "./src/assets/protruding-squares-bg.svg";
        } else if (theme === "pattern_3") {
            pattern_path = "./src/assets/rainbow-vortex-bg.svg";
        }
        try {
            image = await loadImage(pattern_path);
        }catch(e) {
            // If image is not found, fallback to default theme
            theme = THEMES[0];
        }
    }

    // Add more your theme here
    switch (theme) {
        case "dark":
            theme_obj.background = generateGradient(GradientConstants.DARK_1,ctx,canvas,W);
            theme_obj.card_bg = "#282828";
            theme_obj.font_color = "#fff";
            theme_obj.shadow = true;
            theme_obj.shadowColor = "#000";
            break;
        case "dark_2":
            theme_obj.background = generateGradient(GradientConstants.DARK_2,ctx,canvas,W);
            theme_obj.card_bg = "#282828";
            theme_obj.font_color = "#fff";
            theme_obj.shadow = true;
            theme_obj.shadowColor = "#000";
            break;
        case "light":
            theme_obj.background = generateGradient(GradientConstants.LIGHT,ctx,canvas,W);
            theme_obj.card_bg = "#eee";
            theme_obj.font_color = "#222";
            theme_obj.shadow = false;
            break;
        case "pattern_1":
            theme_obj.background = ctx.createPattern(image, "repeat");
            theme_obj.card_bg = "#eee";
            theme_obj.font_color = "#222";
            theme_obj.shadow = false;
            break;
        case "pattern_2":
            theme_obj.background = ctx.createPattern(image, "repeat");
            theme_obj.card_bg = "#282828";
            theme_obj.font_color = "#fff";
            theme_obj.shadow = false;
            break;
        case "pattern_3":
            image.height = canvas.height;
            image.width = canvas.width;
            theme_obj.background = ctx.createPattern(image, "repeat");
            theme_obj.card_bg = "#eee";
            theme_obj.font_color = "#222";
            theme_obj.shadow = false;
            break;
    }

    return theme_obj;
};

module.exports.THEMES = THEMES;
module.exports.create_theme = create_theme;