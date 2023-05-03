import styled from 'styled-components';
import MusicList from './MusicList';
import LineGraph from './LineGraph';
import BestScoreInfo from './BestScoreInfo';

export default function Main() {
    return (
        <Container>
            <SectionTitle>My History</SectionTitle>
            <MainContent>
                <MusicList></MusicList>
                <LineGraph></LineGraph>
                <BestScoreInfo></BestScoreInfo>
            </MainContent>
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

const MainContent = styled.div`
    display: flex;
    height: 100%;
    padding: 1rem;
    div {
        border-radius: 20px;
    }
`;
