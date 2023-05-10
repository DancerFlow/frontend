import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const musicApi = axios.create({
    baseURL: BASE_URL
});

export const fetchMusicList = async (sort?) => {
    if (sort) {
        const response = await axios.get(`${BASE_URL}/music?sort=${sort}`);
        const json = response.data;
        return json;
    } else {
        const response = await axios.get(`${BASE_URL}/music`);
        const json = response.data;
        return json;
    }
};

export const fetchMusicDetail = async (musicId: number) => {
    const response = await axios.get(`${BASE_URL}/music/${musicId}`);
    const json = response.data;
    return json;
};
