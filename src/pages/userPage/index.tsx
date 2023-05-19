import styled from 'styled-components';
import Profile from '../../components/user/Profile';
import Main from '../../components/user/main';
import Bottom from '../../components/user/Bottom';
const UserPage = () => {
    return (
        <Container>
            <Profile />
            <Main />
            <Bottom />
        </Container>
    );
};

export default UserPage;

const Container = styled.body`
    box-sizing: border-box;
    background-color: #000;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
        'header header '
        'sidebar main  '
        'sidebar bottom ';
    padding: 1rem;
    grid-template-rows: 1fr 4fr 2fr;
    /* grid-auto-rows: minmax(80px, auto);
    grid-auto-columns: minmax(60px, auto); */
    color: #fff;
    & > * {
        padding: 10px;
        border-radius: 20px;
    }
`;
