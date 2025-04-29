import { loadJSONFile } from '../utils/load-json-file';
const { CARD_AGE, Languages, generateHTMLCard } = require('../card-generator');

export default async function spanishJokesHandler({ req, env }) {
  try {
    // Load Spanish jokes JSON from assets/mock-data (or R2 in production)
    const jokes = await loadJSONFile(env, 'spanish_jokes.json');

    // Return 404 if data not found
    if (!jokes) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random joke
    const random_joke = jokes[Math.floor(Math.random() * jokes.length)];

    // Construct joke content based on type (single or double)
    let joke_content;
    if (random_joke.type === 'single') {
      joke_content = random_joke.joke;
    } else if (random_joke.type === 'double') {
      joke_content = `P. ${random_joke.joke.q}\n\nR. ${random_joke.joke.a}`;
    }

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, joke_content, searchParams, Languages.ENGLISH, theme);

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
