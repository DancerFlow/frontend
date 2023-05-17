import axios from 'axios';
import { useQuery } from 'react-query';
import { UserGameHistorywithMaxPage } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserGameHistory = async (pageNo?: number): Promise<UserGameHistorywithMaxPage> => {
    const params = pageNo ? { pageno: pageNo } : {};
    const response = await axios.get(`${baseUrl}/user/game/history`, {
        withCredentials: true,
        params
    });
    return response.data;
};

export const useGetGameHistoryQuery = (pageNo?: number) =>
    useQuery({ queryKey: ['usergamehistory', pageNo], queryFn: () => getUserGameHistory(pageNo) });
