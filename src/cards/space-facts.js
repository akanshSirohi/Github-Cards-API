import { loadJSONFile } from '../utils/load-json-file';
import { Languages, generateHTMLCard } from '../core/card-generator';

export default async function spaceFactsHandler({ req, env }) {
  try {
    const spaceFacts = await loadJSONFile(env, 'space_facts.json');

    if (!spaceFacts) {
      return new Response('Data not found', { status: 404 });
    }

    const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
    const factContent = `Space Fact #${randomFact.index}\n\n${randomFact.fact}`;

    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    const svgCard = await generateHTMLCard(env, factContent, searchParams, Languages.ENGLISH, theme);

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
