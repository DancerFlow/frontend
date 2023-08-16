import { verifyAxios } from './authApi';
import { useQuery } from '@tanstack/react-query';

export const useGetUserVerifyQuery = (options: object) => {
    return useQuery('userVerify', () => verifyAxios(), options);
};
