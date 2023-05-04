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
                    <Section>
                        <Star src={star} alt="star" />
                    </Section>
                    <Section>
                        <h2>Perfect</h2>
                        <h2>Good</h2>
                        <h2>Bad</h2>
                    </Section>
                </Main>
            </Body>
            <Bottom>
                <Button>Back to music selection</Button>
                <Button>Retry</Button>
                <Button>Home</Button>
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
    height: 100%;
`;

const Main = styled.main`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    section {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Section = styled.section`
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
`;

const Button = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
