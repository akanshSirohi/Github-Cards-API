/**
 * The function `isValidHexColor` checks if a given string is a valid hexadecimal color code.
 * @param hex - The `isValidHexColor` function is used to validate whether a given string is a valid
 * hexadecimal color code. The `hex` parameter represents the hexadecimal color code that needs to be
 * validated.
 * @returns The `isValidHexColor` function returns a boolean value indicating whether the input `hex`
 * string is a valid hexadecimal color code.
 */
const isValidHexColor = (hex) => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
    return regex.test(hex);
}

/**
 * The function `isValidNumber` checks if a value is a valid number in JavaScript.
 * @param value - The `isValidNumber` function checks if the `value` parameter is a valid number. It
 * returns `true` if the `value` is of type 'number' and is not NaN (Not a Number), otherwise it
 * returns `false`.
 * @returns The function `isValidNumber` returns `true` if the `value` is a number and not `NaN`,
 * otherwise it returns `false`.
 */
function isValidNumber(value) {
    return typeof value === 'string' && value.trim() !== '' && !isNaN(Number(value));
}

/**
 * Validate RFC 4648 Base64 / Base64-URL (padded **or** un-padded).
 * @param {string} str              String to test.
 * @param {boolean} [urlSafe=true] Accept URL-safe charset ( - _ instead of + / ).
 * @returns {boolean}
 */
const isValidBase64 = (str, urlSafe = true) => {
    if (typeof str !== "string" || str.length === 0) return false;

    // 1. Allowed glyphs
    const charSet = urlSafe ? "A-Za-z0-9_-" : "A-Za-z0-9+/";

    // 2. Fast character check (no padding rules yet)
    if (!new RegExp(`^[${charSet}]+=*$`).test(str)) return false;

    // 3. Length sanity: mod-4 may be 0, 2 or 3; only “1 mod 4” is impossible
    if (str.length % 4 === 1) return false;

    // 4. Normalise for decoding: swap URL-safe chars & add missing padding
    let normalised = urlSafe
        ? str.replace(/-/g, "+").replace(/_/g, "/")
        : str;

    if (normalised.length % 4) {
        normalised += "=".repeat(4 - (normalised.length % 4));
    }

    // 5. Real decode test
    try {
        // atob in browsers, Buffer in Node
        typeof atob === "function"
            ? atob(normalised)
            : Buffer.from(normalised, "base64").toString("binary");
        return true;
    } catch {
        return false;
    }
}

/**
 * Decode Base64 / Base64-URL (padded **or** un-padded) to a UTF-8 string.
 *
 * @param {string} input   The Base64 text to decode.
 * @returns {string}       Decoded UTF-8 string.
 *
 */
const decodeBase64 = (input) => {
    if (isValidBase64(input) === false) {
        return ""; // invalid Base64: return empty string
    }

    // 1. URL-safe → standard charset
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");

    // 2. Add missing padding (length mod 4 may be 0, 2, or 3 — never 1)
    const mod = base64.length % 4;
    if (mod === 1) {
        return ""; // invalid Base64: return empty string
    }
    if (mod) base64 += "=".repeat(4 - mod);

    // 3. Decode the binary string
    let binary;
    try {
        binary = atob(base64);            // throws on corrupt input
    } catch (err) {
        return "";                  // invalid Base64: return empty string
    }

    // 4. Convert binary → UTF-8
    const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}


/**
 * The `parseColor` function takes a raw input and returns a valid color in hexadecimal format or a
 * default color if the input is not valid.
 * @param raw - The `raw` parameter in the `parseColor` function is the input color value that needs to
 * be parsed. It can be either a hexadecimal color code (e.g., "ff0000") or a base64 encoded string
 * representing a color. If the input is not a valid hexadecimal color or
 * @param [def=#fff] - The `def` parameter in the `parseColor` function is a default value that will be
 * returned if the input `raw` does not match the specified conditions for a valid color. In this case,
 * the default value is `#fff`, which represents the color white in hexadecimal format.
 * @returns The `parseColor` function returns a valid color value in hexadecimal format if the input
 * `raw` is a valid hex color or a base64 encoded string. If the input is a valid base64 encoded
 * string, it decodes it and returns the decoded value. If none of these conditions are met, it returns
 * the default color value `#fff`.
 */
const parseColor = (raw, def = "#fff") => {
    if (isValidHexColor(`#${raw}`)) {
        return `#${raw}`;
    };
    if (isValidBase64(raw)) {
        try {
            let decoded = decodeBase64(raw);
            if (decoded.length != 0) {
                decoded = decoded.trim();
                decoded = decoded.endsWith(";") ? decoded.slice(0, -1) : decoded;
                return decoded;
            }
        } catch (_) { /* decoding failed – fall through to default */ }
    }
    return def;
}


/**
 * The `parseOptions` function parses query parameters to set color, font, and font options for a card.
 * @param query - The `parseOptions` function takes a `query` object as input and parses specific
 * properties from it to create an `options` object. The function checks for the presence of certain
 * properties in the `query` object and sets corresponding values in the `options` object based on
 * certain conditions.
 * @returns The `parseOptions` function returns an object containing various options based on the input
 * `query`. The options include `card_color`, `font_color`, `bg_color`, `shadow_color`, and
 * `google_font`. If the corresponding properties are present in the `query` object, they are parsed
 * and assigned to the options object. If not present, default values are used.
 */
const parseOptions = (query) => {
    let options = {};
    const regex = /[^a-zA-Z0-9]/g;
    if ("card_color" in query) {
        options.card_color = parseColor(query.card_color);
    } else {
        options.card_color = "#fff";
    }
    if ("font_color" in query) {
        query.font_color = `#${query.font_color.replace(regex, "")}`;
        options.font_color = isValidHexColor(query.font_color) ? query.font_color : "#000";
    } else {
        options.font_color = "#000";
    }
    if ("bg_color" in query) {
        options.bg_color = parseColor(query.bg_color);
    } else {
        options.bg_color = "#fff";
    }
    if ("shadow_color" in query) {
        query.shadow_color = `#${query.shadow_color.replace(regex, "")}`;
        options.shadow_color = isValidHexColor(query.shadow_color) ? query.shadow_color : "#000";
    } else {
        options.shadow_color = "#00000000";
    }
    if("google_font" in query) {
        options.google_font = query.google_font;
    }else{
        options.google_font = null;
    }
    if("text_align" in query) {
        let valid_alignments = ['tl', 'tm', 'tr', 'ml', 'mm', 'mr', 'bl', 'bm', 'br'];
        if(valid_alignments.includes(query.text_align)) {
            options.text_align = query.text_align;
        }else{
            options.text_align = 'tl';
        }
    }else{
        options.text_align = 'tl';
    }
    if("outer_pad" in query) {
        options.outer_pad = isValidNumber(query.outer_pad) ? query.outer_pad : 15;
    }else{
        options.outer_pad = 15;
    }

    if("inner_pad" in query) {
        options.inner_pad = isValidNumber(query.inner_pad) ? query.inner_pad : 15;
    }else{
        options.inner_pad = 15;
    }

    if("font_size" in query) {
        options.font_size = isValidNumber(query.font_size) ? query.font_size : 12;
    }else{
        options.font_size = 12;
    }

    if("card_width" in query) {
        options.card_width = isValidNumber(query.card_width) ? query.card_width : 400;
    }else{
        options.card_width = 400;
    }

    if("card_min_height" in query) {
        options.card_min_height = isValidNumber(query.card_min_height) ? query.card_min_height : 100;
    }else{
        options.card_min_height = 100;
    }

    return options;
};

module.exports.parseOptions = parseOptions;
module.exports.decodeBase64 = decodeBase64;