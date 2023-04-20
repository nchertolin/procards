import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorDeckService } from '../services/editorDecksService';
import { onError } from './useUser'


const useEditorDecks = (searchQuery) => {
   const { isLoading, data } = useQuery(
      ['editor-decks', searchQuery],
      async () => await EditorDeckService.getDecks(searchQuery),
      {
         onError,
         initialData: testData.decks.filter(({ deckName }) =>
            deckName.toLowerCase().includes(searchQuery.toLowerCase())),
      },
   );

   return { isLoading, data }
};

const useCreateDeck = (reset, setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: createDeck } = useMutation(
      async (data) => await EditorDeckService.createDeck(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('editor-decks');
            setOpened(false)
            reset();
         },
         onError
      }
   );

   return { isLoading, createDeck };
};

const useEditDeck = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: editDeck } = useMutation(
      async (data) => await EditorDeckService.editDeck(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('editor-decks');
            setOpened(false);
         },
         onError
      }
   );

   return { isLoading, editDeck };
};

const useEditDeckPassword = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: editPassword } = useMutation(
      async (data) => await EditorDeckService.editDeckPassword(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('editor-decks');
            setOpened(false);
         },
         onError
      }
   );

   return { isLoading, editPassword };
};

const useDeleteDeck = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: deleteDeck } = useMutation(
      async (data) => await EditorDeckService.deleteDeck(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('editor-decks');
            setOpened(false);
         },
         onError
      }
   );

   return { isLoading, deleteDeck };
};

export { useEditorDecks, useCreateDeck, useEditDeck, useDeleteDeck, useEditDeckPassword };
