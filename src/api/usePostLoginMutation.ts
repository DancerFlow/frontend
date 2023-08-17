import { useMutation } from '@tanstack/react-query';
import { loginAxios } from './authApi';

export const usePostLoginMutation = (options?: object) => {
    return useMutation(loginAxios, options);
};
