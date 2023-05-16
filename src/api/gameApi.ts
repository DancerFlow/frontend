import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const gameApi = axios.create({
    baseURL: baseUrl,
    withCredentials: true
});

export const fetchGameData = async (musicId: number) => {
    const res = await gameApi.get(`/game/answer/${musicId}`);
    return res.data;
};
