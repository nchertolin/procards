import { useQuery } from '@tanstack/react-query';
import { GlobalService } from '../services/globalService';
import { testGlobalStatictics } from '../testData';
import { notifyError } from '../util';



export const useGlobalStatistics = (id) => {
   const { isLoading, data } = useQuery(
      ['global-statistic', id],
      async () => await GlobalService.getStatistics(id),
      {
         onError: notifyError,
         initialData: testGlobalStatictics
      },
   );

   return { isLoading, data };
};