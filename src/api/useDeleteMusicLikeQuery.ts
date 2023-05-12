import { useMutation } from 'react-query';
import { deleteMusicLike } from './musicApi';

export const usePatchMusicLikeMutation = (musicId: number, options?: object) => {
    return useMutation(() => deleteMusicLike(musicId), options);
};
