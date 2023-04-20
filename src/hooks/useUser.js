import { useMutation, useQuery } from '@tanstack/react-query'
import { testUser } from '../testData'
import { UserService } from '../services/userService';
import { notifyError, userId } from '../util';
import { tryRefreshToken } from '../services/authService';

const getTestStatistic = () => ({
   login: testUser.login,
   location: testUser.location,
   cardsViewed: testUser.cardsViewed,
   hours: testUser.hours,
   cardsCreated: testUser.cardsCreated,
   score: testUser.score,
});

const getTestInfo = () => ({
   firstName: testUser.firstName,
   lastName: testUser.lastName,
   email: testUser.email,
   hours: testUser.hours,
   location: testUser.location,
});

const onError = error => {
   tryRefreshToken(error);
   notifyError(error);
};

const useUser = (id = userId) => {
   const { isLoading: isLoading1, data: statistic } = useQuery(
      ['user-statistic', id],
      async () => await UserService.getStatistics(id),
      {
         onError,
         initialData: getTestStatistic()
      },
   );

   const { isLoading: isLoading2, data: info } = useQuery(
      ['user-info', id],
      async () => await UserService.getInfo(id),
      {
         onError,
         initialData: getTestInfo()
      },
   );

   return { isLoading: isLoading1 || isLoading2, data: { ...statistic, ...info } }
};

const useUserStatistic = (id) => {
   const { isLoading, data } = useQuery(
      ['user-statistic', id],
      async () => await UserService.getStatistics(id),
      {
         onError,
         initialData: getTestStatistic()
      },
   );

   return { isLoading, data };
};

const useEditInfo = () => {
   const { isLoading, mutate: editInfo } = useMutation(
      async (data) => await UserService.editInfo(data),
      {
         onError,
      }
   );

   return { isLoading, editInfo };
};

const useEditPassword = () => {
   const { isLoading, mutate: editPassword } = useMutation(
      async (data) => await UserService.editPassword(data),
      {
         onError,
      }
   );

   return { isLoading, editPassword };
};

export {
   onError,
   useUser,
   useUserStatistic,
   useEditInfo,
   useEditPassword
};