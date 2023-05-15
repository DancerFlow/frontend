import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { UserForm } from '../../interface';
import { validateEmail } from '../../utils/validateEmail';

interface Props {
    onSubmit: (variables: UserForm) => void;
    setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    joinAsGuest: () => void;
}

const LoginForm = ({ setIsSignUp, onSubmit, joinAsGuest }: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [formValid, setFormValid] = useState<string>('');

    const onClickLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setFormValid('');

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!(email && password)) {
            setFormValid('이메일, 비밀번호를 입력해 주세요');
            return;
        }

        //validation check
        if (!validateEmail(email)) {
            setFormValid('이메일 형식이 올바르지 않습니다');
            return;
        }

        if (email.length === 0 || password.length === 0) {
            setFormValid('이메일, 비밀번호를 입력해 주세요');
            return;
        }
        onSubmit({ email, password });
    };

    return (
        <>
            <FieldContainer>
                <Fieldset>
                    <input placeholder="enter email" required ref={emailRef} id="email" type="email" name="email" />
                </Fieldset>

                <Fieldset>
                    <input required ref={passwordRef} id="password" type="password" name="password" placeholder="enter password" />
                </Fieldset>

                <LoginButton onClick={onClickLogin}>LOGIN</LoginButton>
                <p>{formValid}</p>
            </FieldContainer>
            <SelectContainer>
                <a onClick={() => setIsSignUp(true)}>sign up</a>
                <a onClick={joinAsGuest}>join as a guest</a>
            </SelectContainer>
        </>
    );
};

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Fieldset = styled.fieldset`
    text-transform: uppercase;
    border-style: none;
    width: 400px;
    margin: 0;
    padding: 0;
    border: none;
`;
const LoginButton = styled.button.attrs({ type: 'submit' })`
    height: 40px;
    width: 200px;
    border-radius: 0px;
    border-style: none;
    background-color: #27fd1c;

    padding: 8px 20px;
    letter-spacing: 0.8px;
    display: block;
    margin-top: 10px;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const SelectContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px;
    a {
        margin: 0px 10px;
        border: solid #27fd1c;
        border-width: 0 0 1px 0;
        cursor: pointer;
    }
`;

const ReturnButton = styled.div`
    color: #27fd1c;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    padding: 10px;
    font-family: 'NanumSquareNeoBold';
    cursor: pointer;
`;

export default LoginForm;
