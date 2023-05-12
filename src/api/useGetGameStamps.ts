import axios from 'axios';
import { useQuery } from 'react-query';
import { Stamps } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getGameStamps = async (userId: number, year: number, month: number): Promise<Stamps[]> => {
    const response = await axios.get(`${baseUrl}user/calendar/${userId}`, {
        params: { year, month }
    });
    console.log('calendar', response.data);
    return response.data;
};

export const useGetGameStamps = (userId: number, year: number, month: number) =>
    useQuery({ queryKey: ['attendance', year, month], queryFn: () => getGameStamps(userId, year, month) });
