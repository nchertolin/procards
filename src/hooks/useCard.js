import { useMutation } from '@tanstack/react-query';
import { LearningCardsService } from '../services/learningCardsService';
import { notifyError } from '../util';



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

export { useGrade };