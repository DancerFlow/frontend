import { fetchMusicList } from './musicApi';
import { useQuery } from 'react-query';

enum FilterType {
    Popular = 'popular',
    Latest = 'latest'
}

export const useGetMusicListQuery = (filter: FilterType, options?: object) => {
    return useQuery(['musicList', filter], () => fetchMusicList(filter), options);
};
