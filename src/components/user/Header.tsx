import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Profile, Tier } from '../../interface';

export default function Header({ profile }: { profile: Profile }) {
    return (
        <Container>
            <Avatar src={profile.user_profile_image_url}></Avatar>
            <UserInfo>
                <Title>Hello, {profile.user_nickname}</Title>
                <div>
                    <EditProfile>Edit Profile</EditProfile> <FontAwesomeIcon icon={faPen} style={{ display: 'inline' }} />
                </div>
            </UserInfo>
        </Container>
    );
}

const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    div {
        display: flex;
        align-items: center;
        p {
            margin-right: 5px;
        }
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 2px;
`;

const Avatar = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-left: 4rem;
`;

const EditProfile = styled.p`
    padding-top: 0.5rem;
`;
