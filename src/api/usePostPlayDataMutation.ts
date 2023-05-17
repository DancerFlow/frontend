import { useMutation } from 'react-query';
import { PostGuestPlayData, PostUserPlayData } from './gameApi';

export const usePostGuestPlayDataMutation = (musicId: number, playData: any, options?: object) => {
    return useMutation(() => PostGuestPlayData(musicId, playData), options);
};

export const usePostUserPlayDataMutation = (musicId: number, playData: any, options?: object) => {
    return useMutation(() => PostUserPlayData(musicId, playData), options);
};
