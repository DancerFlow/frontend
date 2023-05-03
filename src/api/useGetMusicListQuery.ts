import music_likes from '../pages/musicListPage/data/music_likes.json';
import music_latest from '../pages/musicListPage/data/music_latest.json';
import music_is_like from '../pages/musicListPage/data/music_is_like.json';

export const useGetMusicLikesQuery = () => {
    return music_likes;
};

export const useGetMusicLatestQuery = () => {
    return music_latest;
};

export const useGetMusicIsLikeQuery = () => {
    return music_is_like;
};
