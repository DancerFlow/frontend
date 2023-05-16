import styled from 'styled-components';
import RankInfo from './RankInfo';
import Lottie from 'lottie-react';
import animationData from '../../assets/star.json';
import ProgressBar from '../../components/common/ProgressBar';
import LaserAnimation from '../../hooks/LazerAnimation';

export default function ResultPage() {
    return (
        <>
            <LaserAnimation />
            <Container>
                <Header>
                    <h1>Play Result</h1>
                </Header>
                <Body>
                    <Main>
                        <RankInfo></RankInfo>
                        <ResultInfo>
                            <Lottie animationData={animationData} loop={true} />
                            <Score>233 points</Score>
                            <MyRank>My Ranking: 19th</MyRank>
                        </ResultInfo>
                        <ScoreDetail>
                            <Combo>
                                <p>Perfect</p> <p>5</p>
                            </Combo>
                            <Combo>
                                <p>Good</p> <p>21</p>
                            </Combo>
                            <Combo>
                                <p>Bad</p> <p>7</p>
                            </Combo>
                            <XpContainer>
                                <p>Xp: </p>
                                <ProgressBar progress={60} height={50}></ProgressBar>
                                <p>+5</p>
                            </XpContainer>
                        </ScoreDetail>
                    </Main>
                </Body>
                <Bottom>
                    <Button>Back to music selection</Button>
                    <Button>Retry</Button>
                    <Button>Back to Home</Button>
                </Bottom>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 4fr 1fr;
    height: 100vh;

    color: #fff;
    padding: 1rem;
    gap: 1rem;
    box-sizing: border-box;
    padding: 3rem 5rem;
    position: absolute;
`;

const Header = styled.header`
    /* background-color: rgba(255, 255, 255, 0.1); */
    h1 {
        font-size: 3rem;
    }
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Body = styled.div`
    display: grid;
    grid-template-rows: 1fr;
`;

const Main = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    section {
        /* background-color: rgba(255, 255, 255, 0.1); */
        border-radius: 10px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }
    overflow-y: auto;
`;

const ResultInfo = styled.section`
    align-items: center;
`;

const Score = styled.div`
    font-size: 3rem;
    margin-top: 1rem;
`;

const MyRank = styled.div`
    font-size: 2.5rem;
    margin-top: 2rem;
`;
const ScoreDetail = styled.section`
    align-items: center;
    font-size: 2rem;
    & > :first-child {
        margin-top: 3rem;
    }
`;

const Combo = styled.div`
    display: flex;
    margin-bottom: 3rem;

    p {
        margin-right: 1rem;
    }
`;

const XpContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    & > * {
        margin-right: 1rem;
    }
`;

const Bottom = styled.footer`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    border-radius: 10px;
`;

const Button = styled.button`
    display: flex;
    background-color: rgba(255, 255, 255, 0.1);
    color: ${(props) => props.theme.pink};
    border-radius: 10px;
    border: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    &:hover {
        background-color: ${(props) => props.theme.green};
    }
`;
