import axios from 'axios';
import { Profile, Tier } from '../interface';

const base_url: string = 'http://localhost:3000';

export const useGetMyProfile = (url: string) => {
    //add async await later

    // const response = await axios.get(base_url + url);
    // const json = response.data;
    // return json;

    const profile: Profile = {
        user_nickname: 'anna',
        user_email: 'anna@gmail.com',
        user_profile_image_url:
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        user_tier: Tier.Platinum,
        user_xp: 555
    };

    return profile;
};
