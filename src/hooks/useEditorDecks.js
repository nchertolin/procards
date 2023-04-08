import { useQuery } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorDeckService } from '../services/editorDecksService';


export const useEditorDecks = (searchQuery) => {
   const { isLoading, data } = useQuery(
      ['editor decks', searchQuery],
      () => EditorDeckService.getDecks(searchQuery),
      {
         onError: error => alert(error.message),
         initialData: testData.decks,
      },
   );

   return { isLoading, data }
}