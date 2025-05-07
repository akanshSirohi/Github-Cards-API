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

      const font_alignements_options = {
        'tl': {
          'card_justify': 'flex-start',
          'card_align': 'flex-start',
          'text_align': 'flex-start',
        },
        'tm': {
          'card_justify': 'center',
          'card_align': 'flex-start',
          'text_align': 'center'
        },
        'tr': {
          'card_justify': 'flex-end',
          'card_align': 'flex-start',
          'text_align': 'flex-end'
        },
        'ml': {
          'card_justify': 'flex-start',
          'card_align': 'center',
          'text_align': 'flex-start'
        },
        'mm': {
          'card_justify': 'center',
          'card_align': 'center',
          'text_align': 'center'
        },
        'mr': {
          'card_justify': 'flex-end',
          'card_align': 'center',
          'text_align': 'flex-end'
        },
        'bl': {
          'card_justify': 'flex-start',
          'card_align': 'flex-end',
          'text_align': 'flex-start'
        },
        'bm': {
          'card_justify': 'center',
          'card_align': 'flex-end',
          'text_align': 'center'
        },
        'br': {
          'card_justify': 'flex-end',
          'card_align': 'flex-end',
          'text_align': 'flex-end'
        },
      };

      const font_align_config = font_alignements_options[options.font_align];

      for (const [key, value] of Object.entries(font_align_config)) {
        html = html.replace(`{{${key}}}`, value);
      }

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
