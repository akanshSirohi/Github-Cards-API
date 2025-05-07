const { Languages, generateHTMLCard } = require("../core/card-generator");
const { decodeBase64 } = require("../utils/options-parser");

export default async function myCardHandler({ req, env }) {
  try {
    const url = new URL(req.url)
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    let content = Object.hasOwn(searchParams, 'text') ? decodeBase64(searchParams.text) : 'Hello, World!';

    let card = await generateHTMLCard(env, content, searchParams, Languages.ENGLISH, theme);

    return new Response(card, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
