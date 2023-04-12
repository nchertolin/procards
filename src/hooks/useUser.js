import { useMutation, useQuery } from '@tanstack/react-query'
import { testUser } from '../testData'
import { UserService } from '../services/userService';
import { userId } from '../util';

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

const useUser = (id = userId) => {
   const { isLoading: isLoading1, data: statistic } = useQuery(
      ['user-statistic', id],
      async () => await UserService.getStatistic(id),
      {
         onError: error => alert(error.message),
         initialData: getTestStatistic()
      },
   );

   const { isLoading: isLoading2, data: info } = useQuery(
      ['user-info', id],
      async () => await UserService.getInfo(id),
      {
         onError: error => alert(error.message),
         initialData: getTestInfo()
      },
   );

   return { isLoading: isLoading1 || isLoading2, data: { ...statistic, ...info } }
};

const useUserStatistic = (id) => {
   const { isLoading, data } = useQuery(
      ['user-statistic', id],
      async () => await UserService.getStatistic(id),
      {
         onError: error => alert(error.message),
         initialData: getTestStatistic()
      },
   );

   return { isLoading, data };
};

const useEditInfo = () => {
   const { isLoading, mutate: editInfo } = useMutation(
      async (data) => await UserService.editInfo(data),
      {
         onError: (error) => alert(error.message),
      }
   );

   return { isLoading, editInfo };
};

const useEditPassword = () => {
   const { isLoading, mutate: editPassword } = useMutation(
      async (data) => await UserService.editPassword(data),
      {
         onError: (error) => alert(error.message),
      }
   );

   return { isLoading, editPassword };
};

export {
   useUser,
   useUserStatistic,
   useEditInfo,
   useEditPassword
};