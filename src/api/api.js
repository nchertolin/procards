import axios from 'axios';
import {AuthService} from "../services/authService";
import {notifyError} from "../js/utils";


// const ORIGIN = window.location.origin;
// const SERVER_URL = `${ORIGIN}/api`;
const SERVER_URL = 'https://localhost:8443';

const $url = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

$url.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            await AuthService.refresh();
            return $url.request(originalRequest);
        }
        notifyError(error);
        throw error;
    }
);

export {SERVER_URL}
export default $url;
