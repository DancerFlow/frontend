import axios from 'axios';
import { useQuery } from 'react-query';
import { UserLikes } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserLikes = async (pageNo: number): Promise<UserLikes[]> => {
    const response = await axios.get(`${baseUrl}user/likes`, {
        withCredentials: true,
        params: {
            pageno: pageNo // 원하는 페이지 번호
        }
    });
    return response.data;
};

export const useGetUserLikes = (pageNo: number) => useQuery({ queryKey: ['userlikes', pageNo], queryFn: () => getUserLikes(pageNo) });
