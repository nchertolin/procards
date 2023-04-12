import { useMutation } from '@tanstack/react-query';
import { LearningCardsService } from '../services/learningCardsService';



export const useGrade = (nextCard) => {
   const { isLoading, mutate: postGrade } = useMutation(
      async (data) => await LearningCardsService.postGrade(data),
      {
         onSuccess: () => nextCard(),
         onError: () => nextCard(),
      }
   );

   return { isLoading, postGrade };
};