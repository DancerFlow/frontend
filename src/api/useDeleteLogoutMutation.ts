import { useMutation } from 'react-query';
import { logoutAxios } from './authApi';

export const useDeleteLogoutMutation = (options?: object) => {
    return useMutation(logoutAxios, options);
};
