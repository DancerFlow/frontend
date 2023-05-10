import axios from 'axios';
import { UserForm, UserRespose } from '../interface';

const BASE_URL = '';

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const signUpAxios = async (userData: UserForm) => {
    const res = await authApi.post<UserRespose>('/auth/join/email', userData);
    return res.data;
};

export const loginAxios = async (userData: UserForm) => {
    const res = await authApi.post<UserRespose>('/auth/signin', userData);
    return res.data;
};
