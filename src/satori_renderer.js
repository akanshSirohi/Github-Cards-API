const { loadImage } = require("canvas");

let html,satori;
(async () => {
    const htmlModule = await import('satori-html');
    const satoriModule = await import('satori');
  
    html = htmlModule.html;
    satori = satoriModule.default;
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

module.exports.generateCssGradient = generateCssGradient;