import styled from 'styled-components';
import Game from './Game';

const practicePage = () => {
    return (
        <Container>
            <Game />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
`;

export default practicePage;
