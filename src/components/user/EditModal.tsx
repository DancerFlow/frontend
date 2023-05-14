import styled from 'styled-components';
import { useRef, useState } from 'react';

export default function EditModal() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null);
    const [formValid, setFormValid] = useState<string>('');

    return (
        <>
            <ModalBackground />
            <FormS>
                <FormContainer>
                    {' '}
                    <FieldContainer>
                        <Fieldset>
                            <input placeholder="enter email" required ref={emailRef} id="email" type="email" name="email" />
                        </Fieldset>

                        <Fieldset>
                            <input required ref={nicknameRef} id="nickname" type="text" name="nickname" placeholder="enter nickname" />
                        </Fieldset>

                        <Fieldset>
                            <input required ref={passwordRef} id="password" type="password" name="password" placeholder="enter password" />
                        </Fieldset>

                        <Fieldset>
                            <input
                                required
                                ref={passwordConfirmRef}
                                id="passwordConfirm"
                                type="password"
                                name="password"
                                placeholder="confirm password"
                            />
                        </Fieldset>

                        <LoginButton>Edit</LoginButton>
                        <p>{formValid}</p>
                    </FieldContainer>
                </FormContainer>
            </FormS>
        </>
    );
}

const ModalBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    background-color: #00000042;
`;
const FormS = styled.div`
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
    display: flex;
`;

const FormContainer = styled.div`
    /* display: flex;
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
    } */
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        padding-top: 20px;
        font-family: 'NanumSquareNeo';
        font-size: 14px;
        color: #27c71e;
    }
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
