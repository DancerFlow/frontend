import { fetchMusicDetail } from './musicApi';
import { useQuery } from '@tanstack/react-query';

export const useGetMusicDetailQuery = (musicId: number, options?: object) => {
    return useQuery(['music', musicId], () => fetchMusicDetail(musicId), options);
};
