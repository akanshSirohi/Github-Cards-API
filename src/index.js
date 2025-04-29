import { Router } from '@tsndr/cloudflare-worker-router'

// Initialize the router
const router = new Router()

// Import all card handlers
import jokeCard from './cards/joke-card'
import programmingQuote from './cards/programming-quotes'
import motivationalQuote from './cards/motivational-quote'
import wordOfTheDay from './cards/word_of_the_day'
import challengeOfTheWeek from './cards/challenge-of-the-week'
import teamWorkQuote from './cards/team-work-quote'
import breakingBadQuote from './cards/breaking-bad-quotes'
import bhagavadGeetaQuote from './cards/bhagavad-geeta-quotes'
import programmingFacts from './cards/programming-facts'
import spanishJokes from './cards/spanish-jokes'
import topTweets from './cards/top-tweets'
import githubFacts from './cards/github-facts'
import securityTips from './cards/security-tips-cards'
import randomFacts from './cards/random-facts'
import funFact from './cards/fun-fact-card'
import gotQuotes from './cards/got-quotes'
import harryPotterSpells from './cards/harry-potter-spells'
import travelDestinations from './cards/travel_destinations'
import frenchWordOfTheDay from './cards/french_word_of_the_day'
import healthTip from './cards/health-tip-card'

// Help route
import helpHandler from './help'

// Available cards mapping
const availableCards = {
  '/jokes-card': jokeCard,
  '/programming-quotes-card': programmingQuote,
  '/motivational-quotes-card': motivationalQuote,
  '/word-of-the-day-card': wordOfTheDay,
  '/challenge-of-the-week-card': challengeOfTheWeek,
  '/team-work-quote-card': teamWorkQuote,
  '/breaking-bad-quote-card': breakingBadQuote,
  '/bhagavad-geeta-card': bhagavadGeetaQuote,
  '/programming-facts-card': programmingFacts,
  '/spanish-jokes-card': spanishJokes,
  '/top-tweets-card': topTweets,
  '/github-facts-card': githubFacts,
  '/security-tips-card': securityTips,
  '/random-facts-card': randomFacts,
  '/fun-fact-card': funFact,
  '/got-quotes-card': gotQuotes,
  '/harry-potter-spell-card': harryPotterSpells,
  '/travel-destinations-card': travelDestinations,
  '/french-word-of-the-day-card': frenchWordOfTheDay,
  '/health-tip-card': healthTip,
}

// Mount all card routes
for (const path in availableCards) {
  router.get(path, availableCards[path])
}

// Random Card Redirect
router.get('/random-card', ({ req }) => {
  const urls = Object.keys(availableCards)
  const randomIndex = Math.floor(Math.random() * urls.length)

  const url = new URL(req.url)
  const query = url.search || ''

  const randomPath = urls[randomIndex] + query
  return Response.redirect(randomPath, 302)
})

// Root route
router.get('/', helpHandler);

// 404 fallback
router.notFoundHandler = () => new Response('Not Found', { status: 404 })

// Export fetch handler properly
export default {
  fetch: (request, env, ctx) => router.handle(request, env, ctx)
}
