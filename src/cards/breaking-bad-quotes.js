import { loadJSONFile } from '../utils/load-json-file';
const { Languages, generateHTMLCard } = require("../card-generator");

export default async function programmingQuoteHandler({ req, env }) {
  try {
    const programmingQuotesData = await loadJSONFile(env, 'breaking-bad-quotes.json');

    // Return 404 if data not found
    if (!programmingQuotesData) {
      return new Response('Data not found', { status: 404 });
    }

    // Parse URL and query params
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Pick a random quote
    const random_quote = programmingQuotesData[Math.floor(Math.random() * programmingQuotesData.length)];
    const quote_content = `${random_quote.quote}\n\n- ${random_quote.author}`;

    // Generate SVG card with HTML theme
    const quote_card = await generateHTMLCard(env, quote_content, searchParams, Languages.ENGLISH, theme);

    // Return response
    return new Response(quote_card, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
