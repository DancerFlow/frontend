import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Profile, Tier } from '../../interface';

export default function Header() {
    return (
        <Container>
            <Avatar src={data.user_profile_image_url}></Avatar>
            <UserInfo>
                <Title>Hello, {data.user_nickname}</Title>
                <div>
                    <p>Edit Profile</p> <FontAwesomeIcon icon={faPen} style={{ display: 'inline' }} />
                </div>
            </UserInfo>
        </Container>
    );
}

const data: Profile = {
    user_nickname: 'anna',
    user_email: 'anna@gmail.com',
    user_profile_image_url:
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHB1cHB5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    user_tier: Tier.Platinum,
    user_xp: 555
};

const Container = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    /* margin: 1rem 1rem 1rem 0; */
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
