import { fetchMusicList } from './musicApi';
import { useQuery } from 'react-query';

export const useGetMusicListQuery = (options?: object) => {
    return useQuery(['musicList'], () => fetchMusicList(), options);
};
