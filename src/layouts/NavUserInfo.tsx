import React, { useState } from 'react';
import { useGetUserProfileQuery } from '../api/useGetUserProfileQuery';
import styled from 'styled-components';

import tempImg from '/items/24.png';
import { Profile } from '../interface';
import LoginModal from '../components/main/LoginModal';

interface Props {
    onLogout: () => void;
    isLogin: boolean;
}

const NavUserInfo = ({ onLogout, isLogin }: Props) => {
    const { data: profile } = useGetUserProfileQuery();
    const [modalView, setModalView] = useState<boolean>(false);
    return (
        <ProfileContainer>
            <ProfileImage src={isLogin ? profile?.profile_image_url : tempImg} alt="profile" />
            <ProfileNickname>"{isLogin ? profile?.nickname : 'guest'}"</ProfileNickname>
            {isLogin ? (
                <LogoutButton onClick={onLogout}>LOGOUT</LogoutButton>
            ) : (
                <LoginButton onClick={() => setModalView(true)}>LOGIN</LoginButton>
            )}
            <LoginModal setIsModalView={setModalView} isModalView={modalView} />
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
    background-color: grey;
    border-radius:20px;
    
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

const LoginButton = styled.button`
    margin-top: 10px;
`;

export default NavUserInfo;
