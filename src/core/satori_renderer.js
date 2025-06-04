import { html as parseHTML } from 'satori-html'
import satori from 'satori';
import {google_font_loader} from "../utils/google-fonts-loader";

// Supported Languages
export const Languages = {
    HINDI: 'hindi',
    ENGLISH: 'english',
}

// Helper function to fetch fonts from /fonts
async function fetchFont(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch font from ${path}`);
    return await res.arrayBuffer();
}

async function shapeHindiText(text, fontBuffer, fontSize, color) {
    const hbModule = await (new Function("return import('harfbuzzjs')"))();
    const hb = await (hbModule.default || hbModule);
    const blob = hb.createBlob(new Uint8Array(fontBuffer));
    const face = hb.createFace(blob, 0);
    const font = hb.createFont(face);
    font.setScale(face.upem, face.upem);
    const buffer = hb.createBuffer();
    buffer.addText(text);
    buffer.guessSegmentProperties();
    hb.shape(font, buffer);
    const glyphs = buffer.json();
    let x = 0;
    const scale = fontSize / face.upem;
    const paths = glyphs.map(g => {
        const p = font.glyphToPath(g.g);
        const transform = `translate(${(x + g.dx) * scale},${-g.dy * scale}) scale(${scale})`;
        x += g.ax;
        return `<path d="${p}" transform="${transform}" />`;
    }).join('');
    buffer.destroy();
    font.destroy();
    face.destroy();
    blob.destroy();
    const width = x * scale;
    const height = fontSize;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="${color}">${paths}</svg>`;
}

// Generate SVG from HTML string and font
export async function generateSvg(html_code, env, language = Languages.ENGLISH, google_font = null, cardText = '') {
    const base = env.ASSETS_BASE_URL;

    const getFontConfig = async () => {
        if (language === Languages.HINDI) {
            const fontBuffer = await fetchFont(`${base}/fonts/NotoSans-Regular.ttf`);
            return {
                name: 'NotoSans',
                data: fontBuffer,
                weight: 400,
                style: 'normal'
            };
        }

        if (google_font) {
            const fontData = await google_font_loader(google_font);
            if (fontData) {
                return {
                    name: fontData.fontFamily,
                    data: fontData.fontBuffer,
                    weight: fontData.fontWeight,
                    style: fontData.fontStyle
                };
            }
        }

        // Default font configuration
        const fontBuffer = await fetchFont(`${base}/fonts/Ubuntu-Regular.ttf`);
        return {
            name: 'Ubuntu',
            data: fontBuffer,
            weight: 400,
            style: 'normal'
        };
    };

    let fontConfig = await getFontConfig();

    if (language === Languages.HINDI) {
        const sizeMatch = html_code.match(/font-size:\s*(\d+)px/);
        const colorMatch = html_code.match(/color:\s*([^;"']+)/);
        const fontSize = sizeMatch ? parseInt(sizeMatch[1]) : 12;
        const fill = colorMatch ? colorMatch[1] : '#000';
        const shaped = await shapeHindiText(cardText || html_code, fontConfig.data, fontSize, fill);
        if (html_code.includes('__CARD_CONTENT__')) {
            html_code = html_code.replace('__CARD_CONTENT__', shaped);
        } else {
            html_code = shaped;
        }
    } else {
        if (html_code.includes('__CARD_CONTENT__')) {
            html_code = html_code.replace('__CARD_CONTENT__', cardText);
        }
    }

    const markup = parseHTML(`
        <div style="display:flex;width:auto;height:auto;font-family:${fontConfig.name};">
        ${html_code}
        </div>
  `)

    const svg = await satori(markup, {
        fonts: [fontConfig]
    })

    return svg
}
