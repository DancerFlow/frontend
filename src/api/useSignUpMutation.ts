import { useMutation } from 'react-query';
import { signUpAxios } from './authApi';
import { UserForm } from '../interface';

export const useSignUpMutation = (userData: UserForm) => {
    return useMutation(() => signUpAxios(userData));
};
