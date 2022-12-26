/* eslint-disable no-console */
import axios from "axios";

export const Axios = axios.create({
    baseURL: process.env.API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

Axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.error(error);

        if (error.code === "ERR_NETWORK") {
            throw Error("네트워크를 확인해주세요");
        }

        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error(error);

        if (error.code === "ERR_NETWORK") {
            throw Error("네트워크를 확인해주세요");
        }

        console.log(error.response.status); // 404

        return Promise.reject(error);
    }
);
