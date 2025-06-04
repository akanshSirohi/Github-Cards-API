import { loadJSONFile } from '../utils/load-json-file';
import { Languages, generateHTMLCard } from "../core/card-generator";

export default async function challengeOfTheWeekHandler({ req, env }) {
  try {
    // Load Challenge of the Week JSON 
    const challengeData = await loadJSONFile(env, 'challenge_of_the_week.json');

    // Return 404 if data not found
    if (!challengeData) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random challenge
    const randomChallenge = challengeData[Math.floor(Math.random() * challengeData.length)];

    // Construct card content
    const cardContent = `Challenge of the Week:\n\n${randomChallenge.challenge}`;

    // Parse URL and extract theme and search params
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card with HTML theme
    const svgCard = await generateHTMLCard(env, cardContent, searchParams, Languages.ENGLISH, theme);

    // Return response
    return new Response(svgCard, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
