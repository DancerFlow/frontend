import { useMutation } from 'react-query';
import { deleteMusicLike } from './musicApi';

export const useDeleteMusicLikeMutation = (musicId: number, options?: object) => {
    return useMutation(() => deleteMusicLike(musicId), options);
};
