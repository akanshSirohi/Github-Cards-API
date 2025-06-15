import { html as parseHTML } from 'satori-html'
import satori from 'satori';
import {googleFontLoader} from "../utils/google-fonts-loader";

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

// Generate SVG from HTML string and font
export async function generateSvg(html_code, env, language = Languages.ENGLISH, google_font = null) {
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
            const fontData = await googleFontLoader(google_font);
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
