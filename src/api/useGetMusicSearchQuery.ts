import { fetchMusicSearch } from './musicApi';
import { useQuery } from 'react-query';

export const useGetMusicSearchQuery = (keyword: string | undefined, options?: object) => {
    return useQuery(['musicSearch', keyword], () => fetchMusicSearch(keyword), options);
};
