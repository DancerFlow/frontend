import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { UserGameResult } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getGameResult = async (scoreId: number): Promise<UserGameResult> => {
    const response = await axios.get(`${baseUrl}/game/result/${scoreId}`, {
        withCredentials: true
    });

    return response.data;
};

export const useGetGameResultQuery = (scoreId: number) =>
    useQuery({ queryKey: ['gameresult', scoreId], queryFn: () => getGameResult(scoreId) });
