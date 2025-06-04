import { loadJSONFile } from '../utils/load-json-file';
import { Languages, generateHTMLCard } from '../core/card-generator';

export default async function healthTipCardHandler({ req, env }) {
  try {
    // Load health tips JSON 
    const healthTips = await loadJSONFile(env, 'health-tips.json');

    // Return 404 if data not found
    if (!healthTips) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random tip
    const random_tip = healthTips[Math.floor(Math.random() * healthTips.length)];

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, random_tip.tip, searchParams, Languages.ENGLISH, theme);

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
