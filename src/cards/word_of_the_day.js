import { loadJSONFile } from '../utils/load-json-file';
const { Languages, generateHTMLCard } = require('../core/card-generator');

export default async function wordOfTheDayHandler({ req, env }) {
  try {
    // Load Word of the Day JSON
    const data = await loadJSONFile(env, 'word_of_the_day.json');

    // Return 404 if data not found
    if (!data) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random word
    const randomWord = data[Math.floor(Math.random() * data.length)];
    const wordContent = `${randomWord.word}\n\nMeaning: ${randomWord.meaning}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, wordContent, searchParams, Languages.ENGLISH, theme);

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
