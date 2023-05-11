import axios from 'axios';
import { useQuery } from 'react-query';
import { UserLikes } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserLikes = async (userId: number, pageNo: number): Promise<UserLikes[]> => {
    const response = await axios.get(`${baseUrl}user/likes/${userId}`, {
        params: { pageno: pageNo }
    });
    return response.data;
};

export const useGetUserLikes = (userId: number, pageNo: number) =>
    useQuery({ queryKey: ['userlikes', userId, pageNo], queryFn: () => getUserLikes(userId, pageNo) });
