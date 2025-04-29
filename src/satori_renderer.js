import { html as parseHTML } from 'satori-html'
import satori from 'satori'

// Helper function to fetch fonts from /fonts
async function fetchFont(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch font from ${path}`);
    return await res.arrayBuffer();
}

// Generate SVG from HTML string and font
export async function generateSvg(html_code, font, env) {
    const base = env.ASSETS_BASE_URL;
    const ubuntuFontBuffer = await fetchFont(`${base}/fonts/Ubuntu-Regular.ttf`)
    const notoFontBuffer = await fetchFont(`${base}/fonts/NotoSans-Regular.ttf`)

    const markup = parseHTML(`
    <div style="display:flex;width:auto;height:auto;font-family:${font};">
      ${html_code}
    </div>
  `)

    const svg = await satori(markup, {
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
    })

    return svg
}
