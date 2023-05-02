import { useQuery } from 'react-query';
import { fetch } from './api';

const URL = `https://api.coinpaprika.com/v1/tickers/btc-bitcoin`;

export const useGetMusicListQuery = () => {
    return useQuery(['key'], () => fetch(URL));
};


