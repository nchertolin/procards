import { useMutation, useQuery } from '@tanstack/react-query';
import { LearningCardsService } from '../services/learningCardsService';
import { notifyError } from '../util';
import { EditorCardsService } from '../services/editorCardsService';



const useGrade = nextCard => {
   const { isLoading, mutate: postGrade } = useMutation(
      async (data) => await LearningCardsService.postGrade(data),
      {
         onSuccess: () => nextCard(),
         onError: error => {
            notifyError(error);
            nextCard();
         }
      }
   );

   return { isLoading, postGrade };
};

const useImages = (deckId, cardId) => {
   const { isLoading, data: frontImage } = useQuery(
      ['card-image', deckId, cardId],
      async () => await EditorCardsService.getImage({ deckId, cardId, side: true }),
      {
         onError: () => null,
      },
   )

   const { isLoading: isLoading1, data: backImage } = useQuery(
      ['card-image', deckId, cardId],
      async () => await EditorCardsService.getImage({ deckId, cardId, side: false }),
      {
         onError: () => null,
      },
   )

   return { isLoading: isLoading || isLoading1, images: [frontImage, backImage] }
}

export { useGrade, useImages };