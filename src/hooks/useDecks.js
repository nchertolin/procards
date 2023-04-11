import { useQuery } from '@tanstack/react-query'
import { LearningDeckService } from '../services/learningDecksService'
import { testData } from '../testData'


export const useDecks = (searchQuery) => {
   const { isLoading, data } = useQuery(
      ['decks', searchQuery],
      async () => await LearningDeckService.getDecks(searchQuery),
      {
         onError: error => alert(error.message),
         initialData: testData.decks.filter(deck => deck.name.includes(searchQuery)),
      },
   );

   return { isLoading, data }
}