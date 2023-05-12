import { useMutation } from 'react-query';
import { patchMusicLike } from './musicApi';

export const usePatchMusicLikeMutation = (musicId: number, options?: object) => {
    return useMutation(() => patchMusicLike(musicId), options);
};
