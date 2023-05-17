import styled from 'styled-components';
import LaserAnimation from '../../hooks/LazerAnimation';
import { useParams } from 'react-router-dom';
import Main from '../../components/result';
import { ReusultRouteParams } from '../../interface';
import { useLocation } from 'react-router-dom';

export default function ResultPage() {
    const location = useLocation();
    const data = location.state;

    console.log('navData', data);

    // const { musicId, scoreId } = useParams<ReusultRouteParams>();

    // const parsedScoreId = Number(scoreId);
    // const parsedMusicId = Number(musicId);

    return (
        <>
            <LaserAnimation />
            <Container>
                <Header>
                    <h1>Play Result</h1>
                </Header>
                <Body>
                    {/* <Main scoreId={parsedScoreId} musicId={parsedMusicId} /> */}
                    {/* <Main scoreId={parsedScoreId} musicId={parsedMusicId} /> */}
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #fff;
    padding: 1rem;
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
    display: flex;
`;

const Bottom = styled.footer`
    border-radius: 10px;
    display: flex;
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
