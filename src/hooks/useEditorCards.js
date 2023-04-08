import { useQuery } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorCardsService } from '../services/editorCardsService';


export const useEditorCards = (id, searchQuery) => {
   const { isLoading, data } = useQuery(
      ['editor cards', id, searchQuery],
      () => EditorCardsService.getCards(id, searchQuery),
      {
         onError: error => alert(error.message),
         initialData: testData.decks.find(({ deckId }) => deckId === id).content
      },
   );

   return { isLoading, data }
}