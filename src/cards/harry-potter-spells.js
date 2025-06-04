import { loadJSONFile } from '../utils/load-json-file';
import { Languages, generateHTMLCard } from '../core/card-generator';

export default async function harryPotterSpellsHandler({ req, env }) {
  try {
    // Load Harry Potter spells JSON
    const harryPotterSpellsData = await loadJSONFile(env, 'harry-potter-spells.json');

    // Return 404 if data not found
    if (!harryPotterSpellsData) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random spell
    const randomSpell = harryPotterSpellsData[Math.floor(Math.random() * harryPotterSpellsData.length)];
    const spellContent = `"${randomSpell.spell}"\n\nEffect: ${randomSpell.effect}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, spellContent, searchParams, Languages.ENGLISH, theme);

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
