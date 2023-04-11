import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { testData } from '../testData'
import { EditorCardsService } from '../services/editorCardsService';
import { LearningDeckService } from '../services/learningDecksService';


const useEditorDeck = (id, searchQuery) => {
   const testDeck = testData.decks.find(({ deckId }) => deckId === id);
   const { isLoading: isLoading1, data: cards } = useQuery(
      ['editor-deck-cards', id, searchQuery],
      async () => await EditorCardsService.getCards(id, searchQuery),
      {
         onError: error => alert(error.message),
         initialData: testDeck.cards.filter(card => card.frontSide.toLowerCase().includes(searchQuery.toLowerCase()))
      },
   );

   const { isLoading: isLoading2, data: name } = useQuery(
      ['deck-name', id],
      async () => await LearningDeckService.getDeck(id),
      {
         onError: error => alert(error.message),
         initialData: testDeck.name
      },
   );

   return { isLoading: isLoading1 || isLoading2, data: { name, cards } }
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