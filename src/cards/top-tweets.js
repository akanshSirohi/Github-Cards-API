import { loadJSONFile } from '../utils/load-json-file';
import { Languages, generateHTMLCard } from '../core/card-generator';

export default async function topTweetsHandler({ req, env }) {
  try {
    // Load top tweets JSON 
    const tweets = await loadJSONFile(env, 'top_tweets.json');

    // Return 404 if data not found
    if (!tweets) {
      return new Response('Data not found', { status: 404 });
    }

    // Pick a random tweet
    const random_tweet = tweets[Math.floor(Math.random() * tweets.length)];
    const tweet_content = `${random_tweet.tweet}\n\n- ${random_tweet.author}`;

    // Parse URL for theme and additional search parameters
    const url = new URL(req.url);
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Generate SVG card
    const svgCard = await generateHTMLCard(env, tweet_content, searchParams, Languages.ENGLISH, theme);

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
