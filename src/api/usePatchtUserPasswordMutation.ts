import axios from 'axios';
import { useMutation } from 'react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const usePatchtUserPasswordMutation = useMutation({
    mutationFn: async ({ currentpassword, newpassword }) => {
        return await axios.patch(`${baseUrl}/user/password`, { currentpassword, newpassword }, { withCredentials: true });
    }
});
