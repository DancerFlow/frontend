import { fetchGameData } from './gameApi';
import { useQuery } from 'react-query';

export const useGetGameDataQuery = (musicId: number, options?: object) => {
    return useQuery(['gameData', musicId], () => fetchGameData(musicId), options);
};
