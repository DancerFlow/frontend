import styled from 'styled-components';

export default function BestScoreInfo() {
    return (
        <Container>
            <h1>Best Score</h1>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 2rem;
`;
