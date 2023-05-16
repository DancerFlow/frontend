import axios from 'axios';
import { UserForm, UserRespose } from '../interface';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const signUpAxios = async (userData: UserForm) => {
    const res = await authApi.post<UserRespose>('/auth/join', userData);
    return res.data;
};

export const loginAxios = async (userData: UserForm) => {
    const res = await authApi.post<UserRespose>('/auth/signin', userData);
    return res.data;
};

export const logoutAxios = async () => {
    const res = await authApi.delete('/auth/signout');
    return res.data;
};

export const verifyAxios = async () => {
    const res = await authApi.get('/auth/checkUser');
    return res.data;
};
