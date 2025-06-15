export async function googleFontLoader(font) {
    font = font.replace(/\s+/g, '+');
    const res = await fetch(
        `https://fonts.googleapis.com/css2?family=${font}`,
        {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 ' +
                    '(KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36',
            },
        }
    );

    const css = await res.text();

    const fontFaceMatch = css.match(/@font-face\s*{([^}]+)}/);
    if (!fontFaceMatch) return false;

    const block = fontFaceMatch[1];

    const family = block.match(/font-family:\s*['"]?([^;'"]+)['"]?;/)?.[1];
    const style = block.match(/font-style:\s*([^;]+);/)?.[1];
    const weight = block.match(/font-weight:\s*([^;]+);/)?.[1];
    const url = block.match(/url\((https:\/\/[^)]+?\.(ttf|woff))\)/)?.[1];

    if (family && style && weight && url) {
        const fontData = await fetch(url).then(res => res.arrayBuffer());

        return {
            fontFamily: family,
            fontStyle: style,
            fontWeight: weight,
            fontUrl: url,
            fontBuffer: fontData
        };
    }

    return false;
}
