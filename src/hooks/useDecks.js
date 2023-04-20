import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { LearningDeckService } from '../services/learningDecksService'
import { testData } from '../testData'
import { redirectToLearn } from '../util';
import { onError } from './useUser'


const useDecks = (searchQuery) => {
   const { isLoading, data } = useQuery(
      ['decks', searchQuery],
      async () => await LearningDeckService.getDecks(searchQuery),
      {
         onError,
         initialData: testData.decks.filter(({ deckName }) => deckName.toLowerCase().includes(searchQuery.toLowerCase())),
      },
   );

   return { isLoading, data }
}

const useRemoveDeckFromLatest = () => {
   const queryClient = new QueryClient();
   const { isLoading, mutate: removeDeckFromLatest } = useMutation(
      async (deckId) => await LearningDeckService.deleteDeck(deckId),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('decks');
            redirectToLearn();
         },
         onError,
      },
   );

   return { isLoading, removeDeckFromLatest }
}

export { useDecks, useRemoveDeckFromLatest };