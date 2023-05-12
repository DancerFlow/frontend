import { useMutation } from 'react-query';
import { signUpAxios } from './authApi';

export const useSignUpMutation = (options?: object) => {
    return useMutation(signUpAxios, options);
};
