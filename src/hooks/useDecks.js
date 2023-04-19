import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { LearningDeckService } from '../services/learningDecksService'
import { testData } from '../testData'
import { notifyError, redirectToLearn } from '../util';


const useDecks = (searchQuery) => {
   const { isLoading, data } = useQuery(
      ['decks', searchQuery],
      async () => await LearningDeckService.getDecks(searchQuery),
      {
         onError: notifyError,
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
         onError: error => {
            notifyError(error)
            redirectToLearn();
         },
      },
   );

   return { isLoading, removeDeckFromLatest }
}

export { useDecks, useRemoveDeckFromLatest };