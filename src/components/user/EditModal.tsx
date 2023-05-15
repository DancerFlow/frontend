import styled from 'styled-components';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../../interface';
import { usePatchtUserPasswordMutation } from '../../api/usePatchtUserPasswordMutation';
import axios from 'axios';
import { useMutation } from 'react-query';

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function EditModal({ profile, onCloseModal }: { profile: Profile; onCloseModal: () => void }) {
    // const avatarRef = useRef<HTMLInputElement>(null);
    const [formValid, setFormValid] = useState<string>('');
    const [avatarImage, setAvatarImage] = useState<string>('');
    const [nickname, setNickname] = useState('');
    const [formValues, setFormValues] = useState({
        current_password: '',
        new_password: '',
        passwordconfirm: ''
    });

    console.log('modal rerendered');

    const mutation = useMutation(async ({ current_password, new_password }) => {
        const response = await axios.patch(`${baseUrl}user/password`, { current_password, new_password }, { withCredentials: true });
        return response.data;
    });

    const handleBlur = () => {
        if (formValues.new_password !== formValues.passwordconfirm) {
            setFormValid('비밀번호가 일치하지 않습니다.');
        } else {
            setFormValid('');
        }
    };

    const handleSubmit = () => {
        if (formValues.new_password !== formValues.passwordconfirm) {
            return;
        }

        console.log('form', formValues);
        mutation.mutate(formValues);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setAvatarImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!profile) {
        return <FormS>'loading profile...'</FormS>;
    }

    return (
        <>
            <ModalBackground onClick={onCloseModal} />
            <FormS>
                <FormContainer>
                    <FieldContainer>
                        <label htmlFor="avatar">
                            <AvatarContainer>
                                <AvatarImage src={profile?.profile_image_url} alt="Profile Image" />
                                <CameraIcon>
                                    <FontAwesomeIcon icon={faCamera} />
                                    <input
                                        type="file"
                                        id="avatar"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        style={{ display: 'none' }}
                                    />
                                </CameraIcon>
                            </AvatarContainer>
                        </label>

                        <Fieldset>
                            <label htmlFor="nickname">Nickname</label>
                            <input
                                // required
                                id="nickname"
                                type="text"
                                name="nickname"
                                placeholder="enter nickname"
                                defaultValue={profile?.nickname}
                            />
                        </Fieldset>
                        <Line />
                        {/* <ChangePassword>Change Password</ChangePassword> */}
                        <Fieldset>
                            <label htmlFor="password">current password</label>
                            <input
                                // required
                                type="password"
                                name="current_password"
                                placeholder="Enter current password"
                                value={formValues.current_password}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                        </Fieldset>

                        <Fieldset>
                            <label htmlFor="new_password">new password</label>
                            <input
                                type="password"
                                name="new_password"
                                placeholder="Enter new password"
                                value={formValues.new_password}
                                onChange={handleInputChange}
                            />
                        </Fieldset>

                        <Fieldset>
                            <label htmlFor="passwordconfirm">confirm new password</label>
                            <input
                                id="passwordconfirm"
                                type="password"
                                name="passwordconfirm"
                                placeholder="Confirm new password"
                                value={formValues.passwordconfirm}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                            />
                        </Fieldset>
                        <p style={{ color: 'red' }}>{formValid}</p>
                        <EditButton onClick={handleSubmit} disabled={formValues.new_password !== formValues.passwordconfirm}>
                            Edit
                        </EditButton>
                        {mutation.isError ? <div>An error occurred: {mutation?.error?.message}</div> : null}
                        {mutation.isSuccess ? <div>Todo added!</div> : null}
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

    label {
        font-size: 10px;
    }
`;

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
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

const EditButton = styled.button.attrs({ type: 'submit' })`
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

const Line = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
`;

const AvatarContainer = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

const CameraIcon = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: 1.7rem;
`;

const ChangePassword = styled.div`
    text-align: start;
`;
