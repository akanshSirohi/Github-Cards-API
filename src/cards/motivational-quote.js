import { loadJSONFile } from '../utils/load-json-file';
import { Languages, generateHTMLCard } from '../core/card-generator';

export default async function motivationalQuoteHandler({ req, env }) {
  try {
    // Load motivational quotes JSON
    const data = await loadJSONFile(env, 'motivational_quotes.json');

    // Return 404 if data not found
    if (!data) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random motivational quote
    const randomQuote = data[Math.floor(Math.random() * data.length)];
    const cardContent = `${randomQuote.quote}\n\n- ${randomQuote.author}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, cardContent, searchParams, Languages.ENGLISH, theme);

    // Return response with SVG and cache headers
    return new Response(svgCard, {
      headers: {
        'Content-Type': 'image/svg+xml'
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
