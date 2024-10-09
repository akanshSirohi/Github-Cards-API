const { loadImage } = require("canvas");
const fs = require('fs').promises;

// Define font buffers
let ubuntuFontBuffer, notoFontBuffer;

// Load font buffers
(async () => {
    try {
        // English font
        const ubuntuBuffer = await fs.readFile("src/assets/fonts/Ubuntu-Regular.ttf");
        ubuntuFontBuffer = new Uint8Array(ubuntuBuffer).buffer;

        // Hindi font
        const notoBuffer = await fs.readFile("src/assets/fonts/NotoSans-Regular.ttf");
        notoFontBuffer = new Uint8Array(notoBuffer).buffer;
    } catch (error) {
        console.error("Error loading font buffers:", error);
    }
})();

// Define HTML and Satori modules
let html, satori;
(async () => {
    try {
        const htmlModule = await import('satori-html');
        const satoriModule = await import('satori');

        html = htmlModule.html;
        satori = satoriModule.default;
    } catch (error) {
        console.error("Error loading HTML and Satori modules:", error);
    }
})();

/**
 * Generates a CSS gradient pattern.
 *
 * @param {string} cssGradientCode - The CSS gradient code.
 * @param {number} width - The width of the gradient pattern.
 * @param {number} height - The height of the gradient pattern.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {boolean} [repeat=false] - Whether to repeat the gradient pattern.
 * @returns {Promise<CanvasPattern>} The generated gradient pattern.
 */
const generateCssGradient = async (cssGradientCode, width, height, ctx, repeat = false) => {
    try {
        let markup = html(`
            <div style="display:flex;width:${width}px;height:${height}px;background:${cssGradientCode}"></div>
        `);
        let svg = await satori(markup, {
            width: width,
            height: height,
        });
        let img = await loadImage("data:image/svg+xml;base64," + Buffer.from(svg).toString('base64'));
        img = ctx.createPattern(img, repeat ? "repeat" : "no-repeat");
        return img;
    } catch (error) {
        console.error("Error generating CSS gradient:", error);
        throw error;
    }
};

/**
 * Generates an SVG string from HTML code.
 *
 * @param {string} htmlCode - The HTML code.
 * @param {string} font - The font family.
 * @param {number} [fontSize=14] - The font size.
 * @returns {Promise<string>} The generated SVG string.
 */
const generateSvg = async (htmlCode, font, fontSize = 14) => {
    try {
        let markup = html(`
            <div style="display:flex;width:auto;height:auto;font-family:${font};font-size:${fontSize}px;">
                ${htmlCode}
            </div>
        `);
        let svg = await satori(markup, {
            fonts: [
                {
                    name: 'Ubuntu',
                    data: ubuntuFontBuffer,
                    weight: 400,
                    style: 'normal',
                },
                {
                    name: 'NotoSans',
                    data: notoFontBuffer,
                    weight: 400,
                    style: 'normal',
                }
            ],
        });
        return svg;
    } catch (error) {
        console.error("Error generating SVG:", error);
        throw error;
    }
};

/**
 * Generates an image from an SVG string.
 *
 * @param {string} svg - The SVG string.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {Promise<CanvasImageSource>} The generated image.
 */
const generateImageFromSvg = async (svg, ctx) => {
    try {
        let img = await loadImage("data:image/svg+xml;base64," + Buffer.from(svg).toString('base64'));
        return img;
    } catch (error) {
        console.error("Error generating image from SVG:", error);
        throw error;
    }
};

/**
 * Saves an image to a file.
 *
 * @param {CanvasImageSource} img - The image to save.
 * @param {string} filePath - The file path to save the image to.
 * @returns {Promise<void>} A promise that resolves when the image is saved.
 */
const saveImageToFile = async (img, filePath) => {
    try {
        // Create a new canvas element
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Save the canvas to a file
        const dataURL = canvas.toDataURL();
        const buffer = Buffer.from(dataURL.split(',')[1], 'base64');
        await fs.writeFile(filePath, buffer);
    } catch (error) {
        console.error("Error saving image to file:", error);
        throw error;
    }
};

module.exports = {
    generateCssGradient,
    generateSvg,
    generateImageFromSvg,
    saveImageToFile,
};
module.exports.generateCssGradient = generateCssGradient;
module.exports.generateSvg = generateSvg;