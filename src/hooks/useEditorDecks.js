import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorDeckService } from '../services/editorDecksService';
import { notifyError } from '../util';


const useEditorDecks = (searchQuery) => {
   const { isLoading, data } = useQuery(
      ['editor-decks', searchQuery],
      async () => await EditorDeckService.getDecks(searchQuery),
      {
         onError: notifyError,
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
         onError: notifyError
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
         onError: notifyError
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
         onError: notifyError
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
         onError: notifyError
      }
   );

   return { isLoading, deleteDeck };
};

export { useEditorDecks, useCreateDeck, useEditDeck, useDeleteDeck, useEditDeckPassword };
