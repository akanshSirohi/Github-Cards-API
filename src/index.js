import { Router } from '@tsndr/cloudflare-worker-router'
import { withKvCache } from './middleware/withKvCache';

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
import myCard from './cards/my-card'
import spaceFacts from './cards/space-facts'
import repoStats from './cards/repo-stats'
import blockchainFacts from './cards/blockchain-web3-facts';

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
  '/blockchain-web3-facts-card':blockchainFacts,
  '/programming-facts-card': programmingFacts,
  '/spanish-jokes-card': spanishJokes,
  '/top-tweets-card': topTweets,
  '/github-facts-card': githubFacts,
  '/space-facts-card': spaceFacts,
  '/security-tips-card': securityTips,
  '/random-facts-card': randomFacts,
  '/fun-fact-card': funFact,
  '/got-quotes-card': gotQuotes,
  '/harry-potter-spell-card': harryPotterSpells,
  '/travel-destinations-card': travelDestinations,
  '/french-word-of-the-day-card': frenchWordOfTheDay,
  '/health-tip-card': healthTip,
  '/my-card': myCard
}

// API endpoints (non-cached)
const apiEndpoints = {
  '/api/repo-stats': repoStats
}

const CACHE_ENABLED = true;

// Mount all card routes
for (const path in availableCards) {
  if(CACHE_ENABLED) {
    router.get(path, withKvCache(availableCards[path]));
  }else {
    router.get(path, availableCards[path]);
  }
}

// Mount API endpoints (without caching middleware)
for (const path in apiEndpoints) {
  router.get(path, apiEndpoints[path]);
}

// Root route
router.get('/', helpHandler);

// 404 fallback
router.notFoundHandler = () => new Response('Not Found', { status: 404 })

// Export fetch handler properly
export default {
  fetch: (request, env, ctx) => router.handle(request, env, ctx)
}
