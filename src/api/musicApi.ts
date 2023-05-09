import axios from 'axios';

const BASE_URL = 'http://localhost:3306';

export const musicApi = axios.create({
    baseURL: BASE_URL
});

export const fetchMusicList = async () => {
    const response = await axios.get(`${BASE_URL}/music`);
    const json = response.data;
    return json;
};

export const fetchMusicDetail = async (musicId: number) => {
    const response = await axios.get(`${BASE_URL}/music/${musicId}`);
    // const response = await axios.get(`http://localhost:3306/music/1`);
    const json = response.data;
    return json;
};
