import { generateSvg, Languages } from './satori_renderer';
import { HTML_THEMES } from './themes';
import { parseOptions } from '../utils/options-parser';

export const generateHTMLCard = async (env, html, query, language = Languages.ENGLISH, theme = false) => {
  let g_font = null;
  if (theme) {
    theme = theme.toUpperCase();
    if (Object.keys(HTML_THEMES).includes(theme) === false) {
      theme = 'TECHY';
    }
    if (theme == 'CUSTOM') {
      theme = HTML_THEMES[theme];
      let options = parseOptions(query);
      html = theme.replace("{{card_content}}", html);
      for (const [key, value] of Object.entries(options)) {
        html = html.replace(`{{${key}}}`, value);
      }
      g_font = options.google_font;

      const text_alignment_options = {
        tl: {
          card_justify: 'flex-start', card_align: 'flex-start',
          flex_align: 'flex-start', css_align: 'left'
        },
        tm: {
          card_justify: 'center', card_align: 'flex-start',
          flex_align: 'center', css_align: 'center'
        },
        tr: {
          card_justify: 'flex-end', card_align: 'flex-start',
          flex_align: 'flex-end', css_align: 'right'
        },
        ml: {
          card_justify: 'flex-start', card_align: 'center',
          flex_align: 'flex-start', css_align: 'left'
        },
        mm: {
          card_justify: 'center', card_align: 'center',
          flex_align: 'center', css_align: 'center'
        },
        mr: {
          card_justify: 'flex-end', card_align: 'center',
          flex_align: 'flex-end', css_align: 'right'
        },
        bl: {
          card_justify: 'flex-start', card_align: 'flex-end',
          flex_align: 'flex-start', css_align: 'left'
        },
        bm: {
          card_justify: 'center', card_align: 'flex-end',
          flex_align: 'center', css_align: 'center'
        },
        br: {
          card_justify: 'flex-end', card_align: 'flex-end',
          flex_align: 'flex-end', css_align: 'right'
        },
      };

      const text_align_config = text_alignment_options[options.text_align];

      for (const [key, value] of Object.entries(text_align_config)) {
        html = html.replaceAll(`{{${key}}}`, value);
      }
    } else {
      theme = HTML_THEMES[theme];
      // html = theme.replace("{{card_content}}", html);
      if (typeof theme === 'function') {
        html = theme(html);
      } else {
        html = theme.replace('{{card_content}}', html);
      }
    }
  }
  return await generateSvg(html, env, language, g_font);
}

export { Languages };
