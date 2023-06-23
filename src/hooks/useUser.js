import {useMutation, useQuery} from '@tanstack/react-query'
import {UserService} from '../services/userService';
import {notifySuccess, userId} from '../utils';


const useUser = (id = userId) => {
    const {isLoading: isLoading1, data: statistic} = useQuery(
        ['user-statistic', id],
        async () => await UserService.getStatistics(id),
    );

    const {isLoading: isLoading2, data: info} = useQuery(
        ['user-info', id],
        async () => await UserService.getInfo(id),
    );

    return {isLoading: isLoading1 || isLoading2, data: {...statistic, ...info}}
};

const useUserStatistic = (id) => {
    const {isLoading, data} = useQuery(
        ['user-statistic', id],
        async () => await UserService.getStatistics(id),
    );

    return {isLoading, data};
};

const useEditInfo = () => {
    const {isLoading, mutate: editInfo} = useMutation(
        async (data) => await UserService.editInfo(data),
        {
            onSuccess: () => notifySuccess('Информация изменена'),
        }
    );

    return {isLoading, editInfo};
};

const useEditPassword = () => {
    const {isLoading, mutate: editPassword} = useMutation(
        async (data) => await UserService.editPassword(data),
        {
            onSuccess: () => notifySuccess('Пароль изменен'),
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
