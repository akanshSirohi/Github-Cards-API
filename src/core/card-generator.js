const { generateSvg, Languages } = require("./satori_renderer");
const { HTML_THEMES } = require("./themes");
const { parseOptions } = require("../utils/options-parser");

const generateHTMLCard = async (env, html, query, language = Languages.ENGLISH, theme = false) => {
  let g_font = null;
  if(theme) {
    theme = theme.toUpperCase();
    if(Object.keys(HTML_THEMES).includes(theme) === false) {
      theme = 'TECHY';
    }
    if(theme == 'CUSTOM') {
      theme = HTML_THEMES[theme];
      let options = parseOptions(query);
      html = theme.replace("{{card_content}}", html);
      for (const [key, value] of Object.entries(options)) {
        html = html.replace(`{{${key}}}`, value);
      }
      g_font = options.google_font;
    }else{
      theme = HTML_THEMES[theme];
      html = theme.replace("{{card_content}}", html);
    }
  }
  return await generateSvg(html, env, language, g_font);
}

module.exports.generateHTMLCard = generateHTMLCard;

// Card Options
module.exports.Languages = Languages;
