import { useMutation } from '@tanstack/react-query';
import { logoutAxios } from './authApi';

export const useDeleteLogoutMutation = (options?: object) => {
    return useMutation(logoutAxios, options);
};
