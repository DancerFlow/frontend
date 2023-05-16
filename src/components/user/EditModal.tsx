import styled from 'styled-components';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Profile, Status } from '../../interface';
// import { usePatchtUserPasswordMutation } from '../../api/usePatchtUserPasswordMutation';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useDeleteLogoutMutation } from '../../api/useDeleteLogoutMutation';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function EditModal({ profile, onCloseModal }: { profile: Profile; onCloseModal: () => void }) {
    const [avatarImage, setAvatarImage] = useState<string | undefined>(profile?.profile_image_url);
    const [changeNicknameEnabled, setChangeNicknameEnabled] = useState(false);
    const [changePasswordEnabled, setChangePasswordEnabled] = useState(false);

    const navigate = useNavigate();
    const { mutate: logoutMutate } = useDeleteLogoutMutation();

    //수정할 제출 폼
    const [formValues, setFormValues] = useState({
        nickname: profile?.nickname,
        current_password: '',
        new_password: ''
    });
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [nicknameValid, setNicknameValid] = useState<string>('');
    const [formValid, setFormValid] = useState<string>('');
    const [file, setFile] = useState<File | undefined>(undefined);

    console.log('modal rerendered');

    const mutationAvatar = useMutation(
        async (file: File | undefined) => {
            if (!file) {
                return;
            }
            const formData = new FormData();
            console.log('file', file);
            formData.append('file', file);

            const response = await axios.post(`${baseUrl}/user/profile/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            return response.data;
        },
        {
            onSuccess: (data) => {
                // alert(data);
                console.log('file upload api', data);
            },
            onError: (error: AxiosError<Status>) => {
                alert(error.response?.data.message);
                console.log('file error  upload api', error);
            }
        }
    );

    const mutationDuplicateNickname = useMutation(
        async (nickname: string) => {
            const response = await axios.post(`${baseUrl}/auth/join/duplicate/nickname`, { nickname }, { withCredentials: true });
            return response.data;
        },
        {
            onSuccess: (data) => {
                if (data) {
                    setNicknameValid('nickname is taken. please use other nickname');
                } else {
                    setNicknameValid('nickname is available');
                }
            },
            onError: (error: AxiosError<Status>) => {
                alert(error.response?.data.message);
            }
        }
    );

    const mutationProfile = useMutation(
        async (formValues: object | undefined) => {
            const response = await axios.patch(`${baseUrl}/user/profile`, formValues, { withCredentials: true });
            console.log('profile response', response.data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                alert(data);
            },
            onError: (error: AxiosError<Status>) => {
                alert(error.response?.data.message);
                console.log('profile error', error);
            }
        }
    );

    const mutationDeleteAccount = useMutation(
        async () => {
            const response = await axios.delete(`${baseUrl}/auth/leave`, { withCredentials: true });
            console.log('account delete', response.data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                alert(data.message);
            },
            onError: (error: AxiosError<Status>) => {
                alert(error.response?.data.message);
                console.log('delete error', error);
            }
        }
    );

    const handleBlurPassword = () => {
        if (passwordConfirmRef.current && formValues.new_password !== passwordConfirmRef.current.value) {
            setFormValid('비밀번호가 일치하지 않습니다.');
        } else {
            setFormValid('');
        }
    };

    const handleSubmit = () => {
        mutationAvatar.mutate(file);

        if (!changeNicknameEnabled) {
            const emptyNicknameFormValues = {
                ...formValues,
                nickname: '' // 닉네임 필드는 빈칸으로 제출함
            };
            mutationProfile.mutate(emptyNicknameFormValues);
        } else {
            mutationProfile.mutate(formValues);
        }
    };

    const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleToggleNickname = () => {
        setChangeNicknameEnabled(!changeNicknameEnabled);
        setNicknameValid('');
    };

    const handleTogglePassword = () => {
        setChangePasswordEnabled(!changePasswordEnabled);
        setFormValues((prev) => ({ ...prev, current_password: '', new_password: '' }));
        setFormValid('');

        if (passwordConfirmRef.current) {
            passwordConfirmRef.current.value = '';
        }
    };

    const handleDuplicateCheck = () => {
        mutationDuplicateNickname.mutate(formValues?.nickname);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                alert('File size can not exceed size of 2MB.');
                return;
            }

            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setAvatarImage(imageUrl);
            };
            reader.readAsDataURL(selectedFile);
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
                                <AvatarImage src={avatarImage} alt="Profile Image" />
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
                            <RowContainer>
                                <ToggleSwitchContainer>
                                    <ToggleButton onClick={handleToggleNickname} isActive={changeNicknameEnabled}>
                                        <ToggleCircle isActive={changeNicknameEnabled} />
                                    </ToggleButton>
                                </ToggleSwitchContainer>
                                <p>Change Nickname</p>
                            </RowContainer>
                            <label htmlFor="nickname">Nickname</label>
                            <RowContainer>
                                <input
                                    id="nickname"
                                    type="text"
                                    name="nickname"
                                    placeholder="enter nickname"
                                    value={formValues.nickname}
                                    onChange={handleInputFormChange}
                                    disabled={!changeNicknameEnabled}
                                />
                                <DuplicateCheckButton onClick={handleDuplicateCheck} disabled={!changeNicknameEnabled}>
                                    중복확인
                                </DuplicateCheckButton>
                            </RowContainer>
                            {nicknameValid && <NicknameValidMessage>{nicknameValid}</NicknameValidMessage>}
                        </Fieldset>
                        <Line />

                        <Fieldset>
                            <RowContainer>
                                <ToggleSwitchContainer>
                                    <ToggleButton onClick={handleTogglePassword} isActive={changePasswordEnabled}>
                                        <ToggleCircle isActive={changePasswordEnabled} />
                                    </ToggleButton>
                                </ToggleSwitchContainer>
                                <p>Change Password</p>
                            </RowContainer>
                        </Fieldset>

                        <Fieldset>
                            <label htmlFor="password">current password</label>
                            <input
                                // required
                                type="password"
                                name="current_password"
                                placeholder="Enter current password"
                                value={formValues.current_password}
                                onChange={handleInputFormChange}
                                onBlur={handleBlurPassword}
                                disabled={!changePasswordEnabled}
                            />
                        </Fieldset>

                        <Fieldset>
                            <label htmlFor="new_password">new password</label>
                            <input
                                type="password"
                                name="new_password"
                                placeholder="Enter new password"
                                value={formValues.new_password}
                                onChange={handleInputFormChange}
                                disabled={!changePasswordEnabled}
                                onBlur={handleBlurPassword}
                            />
                        </Fieldset>

                        <Fieldset>
                            <label htmlFor="passwordconfirm">confirm new password</label>
                            <input
                                id="passwordconfirm"
                                type="password"
                                name="passwordconfirm"
                                placeholder="Confirm new password"
                                // value={formValues.passwordconfirm}
                                // onChange={handleInputFormChange}
                                ref={passwordConfirmRef}
                                onBlur={handleBlurPassword}
                                disabled={!changePasswordEnabled}
                            />
                        </Fieldset>
                        <p style={{ color: 'red' }}>{formValid}</p>
                        <EditButton
                            onClick={handleSubmit}
                            disabled={changePasswordEnabled && formValues.new_password !== passwordConfirmRef?.current?.value}
                        >
                            Update
                        </EditButton>
                    </FieldContainer>
                    <DeleteAccount
                        onClick={() => {
                            if (window.confirm('Do you really want to delete your account?')) {
                                mutationDeleteAccount.mutate();
                                logoutMutate();
                                navigate('/');
                            }
                        }}
                    >
                        회원탈퇴
                    </DeleteAccount>
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
    /* align-items: flex-start; */
    /* justify-content: center; */
    display: flex;
    /* flex-direction: column; */
`;

const FormContainer = styled.div`
    display: flex;
    padding: 30px 20px;
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
        margin-bottom: 10px;
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

const DuplicateCheckButton = styled.button`
    border-style: none;
    margin-left: 1rem;
    height: 40px;
    cursor: pointer;
    width: 100px;
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

    &:disabled {
        background-color: #00000042;
        cursor: not-allowed;
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
    margin-bottom: 1rem;
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
const ToggleSwitchContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 48px;
    height: 35px;
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
    display: inline-block;
    border-style: none;
    width: 62px;
    height: 30px;
    border-radius: 15px;
    background-color: ${(props) => (props.isActive ? '#27fd1c' : '#ccc')};
    cursor: pointer;
`;

const ToggleCircle = styled.span<{ isActive: boolean }>`
    display: inline-block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background-color: white;
    transform: translateX(${(props) => (props.isActive ? '30px' : '4px')});
    transition: transform 0.3s ease;
`;

const RowContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
        margin-left: 1.2rem;
    }
    margin-bottom: 0.5rem;
`;

const NicknameValidMessage = styled.div`
    font-size: 9px;
`;

const DeleteAccount = styled.div`
    text-align: left;
    align-self: flex-start;
    margin-top: 1rem;
    margin-left: 3rem;
    font-size: 0.8rem;
    cursor: pointer;
`;
