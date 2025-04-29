import { loadJSONFile } from '../utils/load-json-file';
const { CARD_AGE, Languages, generateHTMLCard } = require('../card-generator');

export default async function frenchWordOfTheDayHandler({ req, env }) {
  try {
    // Load French Word of the Day JSON from assets/mock-data (or R2 in production)
    const data = await loadJSONFile(env, 'french_word_of_the_day.json');

    // Return 404 if data not found
    if (!data) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random word
    const randomWord = data[Math.floor(Math.random() * data.length)];
    const cardContent = `${randomWord.french}\n\nMeaning: ${randomWord.english}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, cardContent, searchParams, Languages.ENGLISH, theme);

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
