import axios from 'axios';
import { useQuery } from 'react-query';
import { UserGameHistory } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserGameHistory = async (pageNo: number): Promise<UserGameHistory[]> => {
    const response = await axios.get(`${baseUrl}user/game/history`, {
        withCredentials: true,
        params: {
            pageno: pageNo // 원하는 페이지 번호
        }
    });
    return response.data;
};

export const useGetGameHistoryQuery = (pageNo: number) =>
    useQuery({ queryKey: ['usergamehistory', pageNo], queryFn: () => getUserGameHistory(pageNo) });
