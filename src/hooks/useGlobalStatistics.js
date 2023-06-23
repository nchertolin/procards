import {useQuery} from '@tanstack/react-query';
import {GlobalService} from '../services/globalService';


export const useGlobalStatistics = (id) => {
    const {isLoading, data} = useQuery(
        ['global-statistic', id],
        async () => await GlobalService.getStatistics(id),
    );

    return {isLoading, data};
};
