import { useMutation } from 'react-query';
import { signUpAxios } from './authApi';

export const usePostSignUpMutation = (options?: object) => {
    return useMutation(signUpAxios, options);
};
