import $url from "../api/api";


const END_POINT = 'statistic';

const GlobalService = {
    async getStatistics() {
        const response = await $url.get(END_POINT);
        return response.data.statistics;
    }
};

export {GlobalService}
