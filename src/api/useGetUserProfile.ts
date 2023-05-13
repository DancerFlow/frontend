import axios from 'axios';
import { useQuery } from 'react-query';
import { Profile } from '../interface';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getUserProfile = async (userId: number): Promise<Profile> => {
    const response = await axios.get(`${baseUrl}user/profile/${userId}`);
    return response.data;
};

export const useGetUserProfile = (userId: number) => useQuery({ queryKey: ['userprofile'], queryFn: () => getUserProfile(userId) });
