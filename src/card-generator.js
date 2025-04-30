const { generateSvg } = require("./satori_renderer");
const { HTML_THEMES } = require("../src/themes");
const { parseOptions } = require("./options-parser");

// Supported Languages
const Languages = {
  HINDI: 'hindi',
  ENGLISH: 'english',
}

const generateHTMLCard = async (env, html, query, language, theme = false) => {
  const font = language === Languages.ENGLISH ? "Ubuntu" : "NotoSans";
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
    }else{
      theme = HTML_THEMES[theme];
      html = theme.replace("{{card_content}}", html);
    }
  }
  return await generateSvg(html, font, env);
}

module.exports.generateHTMLCard = generateHTMLCard;

// Card Options
module.exports.CARD_AGE = 300;
module.exports.Languages = Languages;
