import { useQuery } from '@tanstack/react-query'
import { testData } from '../testData'
import { LearningDeckService } from '../services/learningDecksService';
import { LearningCardsService } from '../services/learningCardsService';


export const useDeck = id => {
   const testDeck = testData.decks.find(({ deckId }) => deckId === id);
   const testDeckWithoutCards = { ...testDeck };
   delete testDeckWithoutCards.cards

   const { isLoading1, data: cards } = useQuery(
      ['deck-cards', id],
      async () => await LearningCardsService.getCards(id),
      {
         onError: error => alert(error.message),
         initialData: testDeck.cards
      },
   );

   const { isLoading2, data: deck } = useQuery(
      ['deck-name', id],
      async () => await LearningDeckService.getDeck(id),
      {
         onError: error => alert(error.message),
         initialData: testDeckWithoutCards
      },
   );

   return { isLoading: isLoading1 || isLoading2, data: { ...deck, cards } }
}