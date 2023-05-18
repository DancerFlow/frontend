import axios from 'axios';
import { useQuery } from 'react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserItem = async (): Promise<any> => {
    const response = await axios.get(`${baseUrl}/user/item`, {
        withCredentials: true
    });
    console.log('getusreItem', response.data);
    return response.data;
};

export const useGetUserItemQuery = () => useQuery({ queryKey: ['useritem'], queryFn: () => getUserItem() });
