import axios from 'axios';
import { useQuery } from 'react-query';
import { UserLikes } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserLikes = async (pageNo?: number): Promise<UserLikes[]> => {
    const params = pageNo ? { pageno: pageNo } : {};

    const response = await axios.get(`${baseUrl}/user/likes`, {
        withCredentials: true,
        params: params
    });
    return response.data;
};

export const useGetUserLikesQuery = (pageNo?: number) => useQuery({ queryKey: ['userlikes', pageNo], queryFn: () => getUserLikes(pageNo) });
