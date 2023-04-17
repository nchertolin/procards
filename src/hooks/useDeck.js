import { useQuery } from '@tanstack/react-query'
import { testData } from '../testData'
import { LearningDeckService } from '../services/learningDecksService';
import { LearningCardsService } from '../services/learningCardsService';


const useDeck = id => {
   const testDeck = testData.decks.find(({ deckId }) => deckId === id);
   const testDeckWithoutCards = { ...testDeck };
   delete testDeckWithoutCards.cards

   const { isLoading, data } = useQuery(
      ['deck-name', id],
      async () => await LearningDeckService.getDeck(id),
      {
         onError: error => alert(error.message),
         initialData: testDeckWithoutCards
      },
   );

   return { isLoading, data }
};

const useCards = id => {
   const testDeck = testData.decks.find(({ deckId }) => deckId === id);
   const { isLoading, data } = useQuery(
      ['deck', id],
      async () => await LearningCardsService.getCards(id),
      {
         onError: error => alert(error.message),
         initialData: {
            deckName: testDeck.deckName,
            cards: testDeck.cards
         }
      },
   );

   return { isLoading, data }
}

export { useDeck, useCards }