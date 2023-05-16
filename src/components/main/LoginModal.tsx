import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { GlobalContext } from '../../context/Context';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { usePostSignUpMutation } from '../../api/usePostSignUpMutation';
import { usePostLoginMutation } from '../../api/usePostLoginMutation';
import { AxiosError } from 'axios';

interface Props {
    isModalView: boolean;
    setIsModalView: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ isModalView, setIsModalView }: Props) => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const { verifyUser, state } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleModalClick = () => {
        setIsModalView(false);
        setIsSignUp(false);
    };

    const joinAsGuest = () => {
        setIsModalView(false);
        navigate('/mode');
    };

    const { mutate: signUpMutate } = usePostSignUpMutation({
        onSuccess: () => {
            window.alert('회원가입에 성공하였습니다.');
            setIsSignUp(false);
        },
        onError: (error: string) => {
            window.alert(`오류가 발생했습니다: ${error}`);
        }
    });

    const { mutate: LoginMutate } = usePostLoginMutation({
        onSuccess: () => {
            verifyUser();
            setIsModalView(false);
            navigate('/mode');
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 500) window.alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            else {
                window.alert(`오류가 발생했습니다: ${error}`);
            }
        }
    });

    return (
        <>
            {isModalView && (
                <div>
                    <ModalBackground onClick={() => handleModalClick()}> </ModalBackground>
                    <FormS>
                        <FormContainer>
                            {isSignUp ? (
                                <SignUpForm setIsSignUp={setIsSignUp} onSubmit={signUpMutate} />
                            ) : (
                                <LoginForm setIsSignUp={setIsSignUp} onSubmit={LoginMutate} joinAsGuest={joinAsGuest} />
                            )}
                        </FormContainer>
                    </FormS>
                </div>
            )}
        </>
    );
};

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    background-color: #00000042;
`;
const FormS = styled.div`
    position: fixed;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
    display: flex;
`;
const FormContainer = styled.div`
    display: flex;
    padding: 50px 20px 50px 20px;
    border-radius: 4px;
    width: 500px;
    box-shadow: 2px 2px 5px rgb(0, 0, 0, 0.2);
    flex-direction: column;
    background-color: white;
    align-items: center;

    input {
        width: 100%;
        height: 40px;
        border-radius: 0px;
        border-style: solid;
        border-width: 1px;
        padding: 5px 0px;
        text-indent: 6px;
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 0.9rem;
        letter-spacing: 2px;
    }
    input:focus {
        outline: 2px solid #27fd1c;
    }
`;

export default LoginModal;
