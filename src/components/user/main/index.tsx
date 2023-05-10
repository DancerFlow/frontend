import styled from 'styled-components';
import GameHistory from './GameHistory';

export default function Main() {
    return (
        <Container>
            <SectionTitle>Play History</SectionTitle>
            <GameHistory></GameHistory>
        </Container>
    );
}

const Container = styled.main`
    grid-area: main;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.h2`
    margin: 1rem 0 0 1rem;
    font-size: 1rem;
    text-align: start;
`;
