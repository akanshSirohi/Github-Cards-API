import { loadJSONFile } from '../utils/load-json-file'
const { Languages, generateHTMLCard } = require("../core/card-generator");

export default async function programmingQuoteHandler({ req, env }) {
  try {

    const programmingQuotesData = await loadJSONFile(env, 'programming_quotes.json')

    if (!programmingQuotesData) {
      return new Response('Data not found', { status: 404 })
    }

    const url = new URL(req.url)
    const theme = url.searchParams.get('theme') || 'GALACTIC_DUSK';
    const searchParams = Object.fromEntries(url.searchParams.entries());

    const random_quote = programmingQuotesData[Math.floor(Math.random() * programmingQuotesData.length)]
    const quote_content = `${random_quote.quote}\n\n- ${random_quote.author}`

    let quote_card = await generateHTMLCard(env, quote_content, searchParams, Languages.ENGLISH, theme)    

    return new Response(quote_card, {
      headers: {
        'Content-Type': 'image/svg+xml'
      }
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
