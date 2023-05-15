import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const fetchMusicList = async (sort?: any) => {
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

export const fetchMusicRank = async (musicId: number) => {
    const response = await axios.get(`${BASE_URL}/game/ranking/${musicId}?top=30`);
    const json = response.data;
    return json;
};

export const fetchMusicSearch = async (keyword: string | undefined) => {
    const response = await axios.get(`${BASE_URL}/music/search/${keyword}`);
    const json = response.data;
    return json;
};

export const patchMusicLike = async (musicId: number) => {
    const response = await axios.patch(
        `${BASE_URL}/music/like/${musicId}`,
        {},
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
    );
    const json = response.data;
    return json;
};

export const deleteMusicLike = async (musicId: number) => {
    const response = await axios.delete(`${BASE_URL}/music/like/${musicId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    const json = response.data;
    return json;
};
