import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorCardsService } from '../services/editorCardsService';


const useEditorDeck = (id, searchQuery) => {
   const testDeck = testData.decks.find(({ deckId }) => deckId === id);
   const { isLoading, data } = useQuery(
      ['editor-deck', id, searchQuery],
      async () => await EditorCardsService.getCards(id, searchQuery),
      {
         onError: error => alert(error.message),
         initialData: {
            name: testDeck.name,
            cards: testDeck.cards.filter(card =>
               card.frontSide.toLowerCase().includes(searchQuery.toLowerCase()))
         }
      },
   );

   return { isLoading, data }
};

const useCreateCard = (reset, setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: createCard } = useMutation(
      async (data) => await EditorCardsService.createCard(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('deck-cards');
            setOpened(false)
            reset();
         },
         onError: error => alert(error.message)
      }
   );

   return { isLoading, createCard };
};

const useEditCard = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: editCard } = useMutation(
      async (data) => await EditorCardsService.editCard(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('deck-cards');
            setOpened(false)
         },
         onError: error => alert(error.message)
      }
   );

   return { isLoading, editCard };
};

const useDeleteCard = (setOpened) => {
   const queryClient = useQueryClient();

   const { isLoading, mutate: deleteCard } = useMutation(
      async (data) => await EditorCardsService.deleteCard(data),
      {
         onSuccess: () => {
            queryClient.invalidateQueries('deck-cards');
            setOpened(false);
         },
         onError: error => alert(error.message)
      }
   );

   return { isLoading, deleteCard };
};

export { useEditorDeck, useCreateCard, useEditCard, useDeleteCard };