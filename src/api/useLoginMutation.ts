import { useMutation } from 'react-query';
import { loginAxios } from './authApi';

export const useLoginMutation = (options?: object) => {
    return useMutation(loginAxios, options);
};
