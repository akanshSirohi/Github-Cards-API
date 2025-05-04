import { generateHTMLCard, Languages } from '../card-generator';
import { loadJSONFile } from '../utils/load-json-file';

export default async function travelDestinationsHandler({ req, env }) {
  // Load travel destinations JSON
  const destinations = await loadJSONFile(env, 'travel_destinations.json');

  // Pick a random destination
  const randomDest = destinations[Math.floor(Math.random() * destinations.length)];

  // Construct card content
  const cardContent = `Destination of the Day: ${randomDest.destination}\n\nFact: ${randomDest.fact}`;

  // Determine theme (default TECHY)
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
}
