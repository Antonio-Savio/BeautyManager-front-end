import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';
import { AuthTokenError } from "./erros/AuthTokenError";
import { signOut } from "@/context/AuthContext";

export function setupAPI(serverToken?: string){
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    })

    api.interceptors.request.use(config => {

        if(serverToken){
            config.headers.Authorization = `Bearer ${serverToken}`
        } else {
            const clientToken = Cookies.get("beauty-token");
            if(clientToken){
                config.headers.Authorization = `Bearer ${clientToken}`
            }
        }

        return config;
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401){
            if(typeof window !== 'undefined'){
                signOut();
            } else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;
}

export const clientApi = setupAPI();
