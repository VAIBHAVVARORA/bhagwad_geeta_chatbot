import { gitaQuotes } from '../data/gitaQuotes';

export function findRelevantQuote(situation) {
  const situationWords = situation.toLowerCase().split(/\s+/);
  
  return gitaQuotes.reduce((best, quote) => {
    const matchScore = quote.keywords.reduce((score, keyword) => {
      return score + (situationWords.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    
    return matchScore > best.score ? { quote, score: matchScore } : best;
  }, { quote: gitaQuotes[Math.floor(Math.random() * gitaQuotes.length)], score: 0 }).quote;
}