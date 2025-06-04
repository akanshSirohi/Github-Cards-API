import { loadJSONFile } from '../utils/load-json-file';
import { Languages, generateHTMLCard } from '../core/card-generator';

export default async function jokeCardHandler({ req, env }) {
  try {
    // Load jokes JSON 
    const jokes = await loadJSONFile(env, 'jokes.json');

    // Return 404 if data not found
    if (!jokes) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random joke
    const random_joke = jokes[Math.floor(Math.random() * jokes.length)];

    // Construct joke content based on type
    let joke_content;
    if (random_joke.type === 'single') {
      joke_content = random_joke.joke;
    } else if (random_joke.type === 'double') {
      joke_content = `Q. ${random_joke.joke.q}\n\n${random_joke.joke.a}`;
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
        'Content-Type': 'image/svg+xml'
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
