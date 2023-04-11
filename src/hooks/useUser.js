import { useQuery } from '@tanstack/react-query'
import { testUser } from '../testData'
import { UserService } from '../services/userService';

const getTestStatistic = () => ({
   login: testUser.login,
   location: testUser.location,
   cardsViewed: testUser.cardsViewed,
   hours: testUser.hours,
   cardsCreatedCount: testUser.cardsCreatedCount,
   score: testUser.score,
});

const getTestInfo = () => ({
   firstName: testUser.firstName,
   lastName: testUser.lastName,
   email: testUser.email,
   hours: testUser.hours,
   location: testUser.location,
});

export const useUser = () => {
   const { isLoading1, data: statistic } = useQuery(
      ['user statistic'],
      async () => await UserService.getStatistic(),
      {
         onError: error => alert(error.message),
         initialData: getTestStatistic()
      },
   );

   const { isLoading2, data: info } = useQuery(
      ['user info'],
      async () => await UserService.getInfo(),
      {
         onError: error => alert(error.message),
         initialData: getTestInfo()
      },
   );

   return { isLoading: isLoading1 || isLoading2, data: { ...statistic, ...info } }
}