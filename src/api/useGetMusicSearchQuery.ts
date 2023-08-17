import { fetchMusicSearch } from './musicApi';
import { useQuery } from '@tanstack/react-query';

export const useGetMusicSearchQuery = (keyword: string | undefined, options?: object) => {
    return useQuery(['musicSearch', keyword], () => fetchMusicSearch(keyword), options);
};
