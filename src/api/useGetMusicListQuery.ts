import { fetchMusicList } from './musicApi';
import { useQuery } from '@tanstack/react-query';

export enum FilterType {
    Popular = 'popular',
    Latest = 'latest',
    Like = 'isLiked',
    Search = "search"
}

export const useGetMusicListQuery = (filter: FilterType | '', options?: object) => {
    return useQuery(['musicList', filter], () => fetchMusicList(filter), options);
};
