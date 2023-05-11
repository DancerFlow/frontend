import { fetchMusicRank } from './musicApi';
import { useQuery } from 'react-query';

export const useGetMusicRankingQuery = (musicId: number, options?: object) => {
    return useQuery(['musicRank', musicId], () => fetchMusicRank(musicId), options);
};
