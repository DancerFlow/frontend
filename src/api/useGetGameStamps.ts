import axios from 'axios';
import { useQuery } from 'react-query';
import { Stamps } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getGameStamps = async (year: number, month: number): Promise<Stamps[]> => {
    const response = await axios.get(`${baseUrl}/user/calendar`, { withCredentials: true, params: { year, month } });
    return response.data;
};

export const useGetGameStamps = (year: number, month: number) =>
    useQuery({ queryKey: ['attendance', year, month], queryFn: () => getGameStamps(year, month) });
