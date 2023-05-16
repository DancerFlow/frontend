import axios from 'axios';
import { useQuery } from 'react-query';
import { Profile } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserProfile = async (): Promise<Profile> => {
    const response = await axios.get(`${baseUrl}/user/profile/`, {
        withCredentials: true
    });
    return response.data;
};

export const useGetUserProfileQuery = () => useQuery({ queryKey: ['userprofile'], queryFn: () => getUserProfile() });
