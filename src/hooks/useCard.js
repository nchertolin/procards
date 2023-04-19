/* eslint-disable react-hooks/rules-of-hooks */
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

const useImages = (deckId, card) => {
   const images = [];
   let isLoading1 = false;
   let isLoading2 = false;

   if (card.hasFrontImage) {
      const { isLoading, data: frontImage } = useQuery(
         ['front', deckId, card],
         async () => await EditorCardsService.getImage({ deckId, cardId: card.id, side: true }),
         {
            onError: () => null,
         },
      )

      isLoading1 = isLoading
      images.push(frontImage);
   }

   if (card.hasBackImage) {
      const { isLoading, data: backImage } = useQuery(
         ['back', deckId, card],
         async () => await EditorCardsService.getImage({ deckId, cardId: card.id, side: false }),
         {
            onError: () => null,
         },
      )
      isLoading2 = isLoading;
      images.push(backImage);
   }

   return { isLoading: isLoading1 || isLoading2, images }
}

export { useGrade, useImages };