import { generateHTMLCard, Languages } from '../core/card-generator';
import { loadJSONFile } from '../utils/load-json-file';

export default async function bhagavadGeetaQuoteHandler({ req, env }) {
  
  // Load Bhagavad Gita quotes JSON
  const quotes = await loadJSONFile(env, 'bhagavad_geeta_quotes.json');

  // Pick a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Determine language and construct card content
  let language = Languages.ENGLISH;
  let cardContent = `Quote of the day:-\n\n"${randomQuote.quote}"`;

  if (randomQuote.lang && randomQuote.lang.toLowerCase() === 'hi') {
    language = Languages.HINDI;
    cardContent = `आज का विचार:-\n\n"${randomQuote.quote}"`;
  }

  const url = new URL(req.url);
  const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
  const searchParams = Object.fromEntries(url.searchParams.entries());

  // Generate SVG card using the default TECHY HTML theme
  const svgCard = await generateHTMLCard(env, cardContent, searchParams,  language, theme);

  return new Response(svgCard, {
    headers: {
      'Content-Type': 'image/svg+xml'
    },
  });
}
