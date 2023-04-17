import { useQuery } from '@tanstack/react-query';
import { GlobalService } from '../services/globalService';
import { testGlobalStatictics } from '../testData';



export const useGlobalStatistics = (id) => {
   const { isLoading, data } = useQuery(
      ['global-statistic', id],
      async () => await GlobalService.getStatistics(id),
      {
         onError: error => alert(error.message),
         initialData: testGlobalStatictics
      },
   );

   return { isLoading, data };
};