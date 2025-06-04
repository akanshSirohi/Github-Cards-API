import { loadJSONFile } from '../utils/load-json-file'
import { Languages, generateHTMLCard } from "../core/card-generator";

export default async function programmingFactsHandler({ req, env }) {
  try {
    const programmingFactsData = await loadJSONFile(env, 'programming_facts.json')

    if (!programmingFactsData) {
      return new Response('Data not found', { status: 404 })
    }

    const url = new URL(req.url)
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    const random_fact = programmingFactsData[Math.floor(Math.random() * programmingFactsData.length)];
    const facts_content = `${random_fact.facts}\n\n- ${random_fact.topic}`;

    let quote_card = await generateHTMLCard(env, facts_content, searchParams, Languages.ENGLISH, theme);

    return new Response(quote_card, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    });
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
