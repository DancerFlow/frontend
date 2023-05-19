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

export const PostMusicLikeTest = async (musicId: number) => {
    const response = await axios.patch(
        `${baseUrl}/music/like/${musicId}`,
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

export const PostGuestPlayData = async (musicId: number, playData: any) => {
    const res = await gameApi.post(`/game/result/guest/${musicId}`, playData);
    return res.data;
};
export const PostUserPlayData = async (musicId: number, playData: any) => {
    const res = await gameApi.post(`/game/result/user/${musicId}`, playData, { withCredentials: true });
    return res.data;
};
