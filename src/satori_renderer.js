const { loadImage } = require("canvas");
const fs = require('fs').promises;

let html, satori, ubuntuFontBuffer, notoFontBuffer;
(async () => {
    const htmlModule = await import('satori-html');
    const satoriModule = await import('satori');
  
    html = htmlModule.html;
    satori = satoriModule.default;

    // English font
    const ubuntu_buffer = await fs.readFile("src/assets/fonts/Ubuntu-Regular.ttf");
    ubuntuFontBuffer = new Uint8Array(ubuntu_buffer).buffer;

    // Hindi font
    const noto_buffer = await fs.readFile("src/assets/fonts/NotoSans-Regular.ttf");
    notoFontBuffer = new Uint8Array(noto_buffer).buffer;
})();

const generateCssGradient = async (css_gradient_code,width,height,ctx) => {
    let markup = html(`
        <div style="display:flex;width:${width}px;height:${height}px;background:${css_gradient_code}"></div>
    `);
    let svg = await satori(markup, {
        width: width,
        height: height,
    });
    let img = await loadImage("data:image/svg+xml;base64," + Buffer.from(svg).toString('base64'));
    img = ctx.createPattern(img, "repeat");
    return img;
}

const generateSvg = async (html_code, font) => {
    let markup = html(`
        <div style="display:flex;width:auto;height:auto;font-family:${font};">
            ${html_code}
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
}

module.exports.generateCssGradient = generateCssGradient;
module.exports.generateSvg = generateSvg;