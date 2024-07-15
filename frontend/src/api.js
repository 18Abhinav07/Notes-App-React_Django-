// writing an interceptor so that we can add heaeders using axios for network request.
// axios request interceptor

import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL // import the urls from a specific env file to have easy url change if needed

})

// create an interceptor to add the tokens if we have them to the request.

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // this is how jwt token is passed in a bearer header.
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api