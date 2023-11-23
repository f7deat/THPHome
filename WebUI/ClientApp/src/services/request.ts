import axios from 'axios';
const request = axios.create();

request.interceptors.request.use(async (config: any) => {
    return config;
});

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default request;