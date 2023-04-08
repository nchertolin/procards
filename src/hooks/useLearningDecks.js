import { useQuery } from '@tanstack/react-query'
import { LearningDeckService } from '../services/learningDecksService'
import { testData } from '../testData'


export const useLearningDecks = (searchQuery) => {
   const { isLoading, data } = useQuery(
      ['learning decks', searchQuery],
      () => LearningDeckService.getDecks(searchQuery),
      {
         onError: error => alert(error.message),
         initialData: testData.decks,
      },
   );

   return { isLoading, data }
}