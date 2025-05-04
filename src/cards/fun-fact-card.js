import { loadJSONFile } from '../utils/load-json-file';
const { Languages, generateHTMLCard } = require('../card-generator');

export default async function funFactCardHandler({ req, env }) {
  try {
    // Load fun facts JSON 
    const data = await loadJSONFile(env, 'fun_facts.json');

    // Return 404 if data not found
    if (!data) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random fun fact
    const randomFact = data[Math.floor(Math.random() * data.length)];
    const cardContent = `Fun Fact of the Day:\n\n${randomFact.fact}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, cardContent, searchParams, Languages.ENGLISH, theme);

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
