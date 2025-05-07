import { loadJSONFile } from '../utils/load-json-file';
const { Languages, generateHTMLCard } = require('../core/card-generator');

export default async function randomFactsHandler({ req, env }) {
  try {
    // Load random facts JSON
    const randomFactData = await loadJSONFile(env, 'random_facts.json');

    // Return 404 if data not found
    if (!randomFactData) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random fact
    const randomFact = randomFactData[Math.floor(Math.random() * randomFactData.length)];
    const factContent = `Random Fact #${randomFact.index}\n\n${randomFact.fact}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, factContent, searchParams, Languages.ENGLISH, theme);

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
