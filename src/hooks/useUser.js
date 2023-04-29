import {useMutation, useQuery} from '@tanstack/react-query'
import {UserService} from '../services/userService';
import {getErrorDataWithoutUserId, notifySuccess, userId} from '../util';
import {tryRefreshToken} from '../services/authService';


const useUser = (id = userId) => {
    const {isLoading: isLoading1, data: statistic, refetch: getStat} = useQuery(
        ['user-statistic', id],
        async () => await UserService.getStatistics(id),
        {
            onError: error => tryRefreshToken(error, getStat)
        },
    );

    const {isLoading: isLoading2, data: info, refetch: getInfo} = useQuery(
        ['user-info', id],
        async () => await UserService.getInfo(id),
        {
            onError: error => tryRefreshToken(error, getInfo)
        },
    );

    return {isLoading: isLoading1 || isLoading2, data: {...statistic, ...info}}
};

const useUserStatistic = (id) => {
    const {isLoading, data, refetch} = useQuery(
        ['user-statistic', id],
        async () => await UserService.getStatistics(id),
        {
            onError: error => tryRefreshToken(error, refetch)
        },
    );

    return {isLoading, data};
};

const useEditInfo = () => {
    const {isLoading, mutate: editInfo} = useMutation(
        async (data) => await UserService.editInfo(data),
        {
            onSuccess: () => notifySuccess('Информация изменена'),
            onError: error =>
                tryRefreshToken(
                    error,
                    null,
                    () => editInfo(getErrorDataWithoutUserId(error))
                )
        }
    );

    return {isLoading, editInfo};
};

const useEditPassword = () => {
    const {isLoading, mutate: editPassword} = useMutation(
        async (data) => await UserService.editPassword(data),
        {
            onSuccess: () => notifySuccess('Пароль изменен'),
            onError: error =>
                tryRefreshToken(
                    error,
                    null,
                    () => editPassword(getErrorDataWithoutUserId(error))
                )
        }
    );

    return {isLoading, editPassword};
};

export {
    useUser,
    useUserStatistic,
    useEditInfo,
    useEditPassword
};