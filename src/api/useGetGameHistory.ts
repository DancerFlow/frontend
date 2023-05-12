import axios from 'axios';
import { useQuery } from 'react-query';
import { UserGameHistory } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserGameHistory = async (userId: number, pageNo: number): Promise<UserGameHistory[]> => {
    const response = await axios.get(`${baseUrl}user/game/history/${userId}`, {
        params: { pageno: pageNo }
    });
    return response.data;
};

export const useGetGameHistory = (userId: number, pageNo: number) =>
    useQuery({ queryKey: ['usergamehistory', userId, pageNo], queryFn: () => getUserGameHistory(userId, pageNo) });
