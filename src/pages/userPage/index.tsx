import styled from 'styled-components';
import Header from '../../components/user/header';
import Sidebar from '../../components/user/sidebar';
import Main from '../../components/user/main';
import Bottom from '../../components/user/bottom';

const UserPage = () => {
    return (
        <Container>
            <Header></Header>
            <Sidebar></Sidebar>
            <Main></Main>
            <Bottom></Bottom>
        </Container>
    );
};

export default UserPage;

const Container = styled.body`
    box-sizing: border-box;
    height: 100vh;
    background-color: #000;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
        'header header '
        'sidebar main  '
        'sidebar bottom ';
    padding: 1rem;
    grid-auto-rows: minmax(100px, auto);
    grid-auto-columns: minmax(100px, auto);
    color: #fff;
    & > * {
        padding: 10px;
        border-radius: 20px;
    }
`;
