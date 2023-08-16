import { fetchGameData } from './gameApi';
import { useQuery } from '@tanstack/react-query';

export const useGetGameDataQuery = (musicId: any, options?: object) => {
    return useQuery(['gameData', musicId], () => fetchGameData(musicId), options);
};
