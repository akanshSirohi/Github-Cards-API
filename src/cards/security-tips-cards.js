import { loadJSONFile } from '../utils/load-json-file';
const { CARD_AGE, Languages, generateHTMLCard } = require('../card-generator');

export default async function securityTipsHandler({ req, env }) {
  try {
    // Load security tips JSON 
    const data = await loadJSONFile(env, 'security-tips.json');

    // Return 404 if data not found
    if (!data) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random security tip
    const randomTip = data[Math.floor(Math.random() * data.length)];
    const cardContent = `${randomTip.tip}`;

    // Parse URL for theme and search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, cardContent, searchParams, Languages.ENGLISH, theme);

    // Return response with SVG and cache headers
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
