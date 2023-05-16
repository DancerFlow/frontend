import { UserGameHistoryDetail } from '../interface';
import { useQuery } from 'react-query';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserGameHistoryDetail = async (musicId: number): Promise<UserGameHistoryDetail> => {
    const response = await axios.get(`${baseUrl}/user/game/history/${musicId}`, {
        withCredentials: true
    });
    return response.data;
};

export const useGetGameHistoryDetailQuery = (musicId: number) =>
    useQuery({ queryKey: ['usergamehistorydetail', musicId], queryFn: () => getUserGameHistoryDetail(musicId) });
