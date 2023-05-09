import styled from 'styled-components';

export default function BestScoreInfo() {
    return (
        <Container>
            <h1>Best Score</h1>
        </Container>
    );
}

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem 2rem;
`;
