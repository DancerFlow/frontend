import styled from 'styled-components';
import { Music } from '../../interface';
import star from '../../assets/star.png';
import RankInfo from './RankInfo';

export default function ResultPage() {
    return (
        <Container>
            <Header>
                <h1>Play Result</h1>
            </Header>
            <Body>
                <Main>
                    <RankInfo></RankInfo>
                    <ScoreInfo>
                        <Star src={star} alt="star" />
                        <Score>233점</Score>
                    </ScoreInfo>
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
                    </ScoreDetail>
                </Main>
            </Body>
            <Bottom>
                <Button>Back to music selection</Button>
                <Button>Retry</Button>
                <Button>Back to Home</Button>
            </Bottom>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 1fr 4fr 1fr;
    height: 100vh;
    background-color: #000;
    color: #fff;
    padding: 1rem;
    gap: 1rem;
    box-sizing: border-box;
`;

const Header = styled.header`
    background-color: rgba(255, 255, 255, 0.1);
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
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }
    overflow-y: auto;
`;

const ScoreInfo = styled.section`
    align-items: center;
`;

const Score = styled.div`
    font-size: 3rem;
    margin-top: 1rem;
`;

const ScoreDetail = styled.section`
    align-items: center;
    font-size: 2rem;
    div {
        margin-bottom: 1rem;
    }
`;

const Combo = styled.div`
    display: flex;
    p {
        margin-right: 1rem;
    }
`;

const Img = styled.img`
    width: 6rem;
    height: auto;
`;

const Star = styled.img`
    width: 8rem;
    height: auto;
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
