import axios from 'axios';
import { UserGameHistory } from '../interface';

export const useGetGameHistory = (url: string) => {
    //add async await later

    // const response = await axios.get(base_url + url);
    // const json = response.data;
    // return json;

    const gamehistory: UserGameHistory[] = [
        {
            music_id: '0',
            music_name: 'Bad boy',
            music_image_url:
                'https://cdn-bastani.stunning.kr/prod/portfolios/2ae0be98-67cb-44e4-968a-5bf0f8d39ed4/contents/4d09fee5ae27fa145f1a6087e819cbd490fbbdb11d4b330c64792cf44a9afab0_v2.jpg',
            music_singer: 'Red velvet',
            user_music_best_score: 255,
            music_total_score: 300
        },
        {
            music_id: '1',
            music_name: 'Sunday Night Drive',
            music_image_url:
                'https://lh3.googleusercontent.com/NmlKI9pzrI6dtC9yKxwZxR5LVyzM5krQCrhjSeIrziKvfFYLxyFviMKNKoO4ixsGx-_eXKL08NYnfyEz7w=w544-h544-l90-rj',
            music_singer: 'Jay Park',
            user_music_best_score: 150,
            music_total_score: 200
        },

        {
            music_id: '2',
            music_name: 'Shoong! (feat. LISA of BLACKPINK)',
            music_image_url:
                'https://lh3.googleusercontent.com/JIO2pp9Y3a0-9HP69aZ8xH4hiOv6c1soiV40kuP9HuKTQf9qStqTXzFJi9K96wWKLnoukexoau2U3ldu=w544-h544-l90-rj',
            music_singer: 'TAEYANG',
            user_music_best_score: 150,
            music_total_score: 200
        },

        {
            music_id: '3',
            music_name: 'You & Me',
            music_image_url:
                'https://lh3.googleusercontent.com/2UTUgzceFC44xJOGOkvGMpHLBklqtlkRuJIY8RmJBE5XHQm9JmkuSRmecD3FVmua_3Ksz2SN8MzU9V0=w544-h544-l90-rj',
            music_singer: 'Disclosure',
            user_music_best_score: 177,
            music_total_score: 230
        },

        {
            music_id: '4',
            music_name: 'You & Me (Flume Remix) (feat. Eliza Doolittle)',
            music_image_url:
                'https://lh3.googleusercontent.com/2UTUgzceFC44xJOGOkvGMpHLBklqtlkRuJIY8RmJBE5XHQm9JmkuSRmecD3FVmua_3Ksz2SN8MzU9V0=w544-h544-l90-rj',
            music_singer: 'Disclosure',
            user_music_best_score: 177,
            music_total_score: 230
        }
    ];

    return gamehistory;
};

// const data = { music_id, music_name, music_image_url, music_singer, user_music_best_score, music_total_score };
