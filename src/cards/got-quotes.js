import { loadJSONFile } from '../utils/load-json-file';
const { CARD_AGE, Languages, generateHTMLCard } = require('../card-generator');

export default async function gotQuotesHandler({ req, env }) {
  try {
    // Load GoT quotes JSON from assets/mock-data (or R2 in production)
    const gotQuotes = await loadJSONFile(env, 'got-quotes.json');

    // Return 404 if data not found
    if (!gotQuotes) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random quote
    const random_quotes = gotQuotes[Math.floor(Math.random() * gotQuotes.length)];
    const quotes_content = `${random_quotes.sentence}\n\n- ${random_quotes.character}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, quotes_content, searchParams, Languages.ENGLISH, theme);

    return new Response(svgCard, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': `public, max-age=${CARD_AGE}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
