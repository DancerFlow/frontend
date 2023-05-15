import React from 'react';
import { useGetUserProfileQuery } from '../api/useGetUserProfileQuery';
import styled from 'styled-components';

import tempImg from './KakaoTalk_Photo_2023-05-15-20-09-53.png';

interface Props {
    onLogout: () => void;
}

const NavUserInfo = ({ onLogout }: Props) => {
    const { data: profile, isLoading, isError } = useGetUserProfileQuery();
    if (isLoading) {
        return <div>Loading profile...</div>;
    }
    if (isError) {
        return <div>Error loading profile</div>;
    }

    return (
        <ProfileContainer>
            <ProfileImage src={tempImg} alt="profile" />
            <ProfileNickname>"{profile?.nickname}"</ProfileNickname>
            <LogoutButton onClick={onLogout}>LOGOUT</LogoutButton>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid;
    border-width: 0 0 2px 0;
    border-color: ${(props) => props.theme.green};
    padding-bottom: 50px;
    margin-bottom: 20px;
    button:hover {
        cursor: pointer;
    }
`;

const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    background-color: ${(props) => props.theme.green};
`;

const ProfileNickname = styled.p`
    font-size: 20px;
    color: white;
    padding: 10px;
    font-family: 'NanumSquareNeo';
`;
const LogoutButton = styled.button`
    margin-top: 10px;
`;

export default NavUserInfo;
