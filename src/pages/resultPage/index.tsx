import styled from 'styled-components';
import LaserAnimation from '../../hooks/LazerAnimation';
import Main from '../../components/result';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface ResultData {
    guestData?: any;
    scoreId?: any;
    musicId: number;
}

export default function ResultPage() {
    const location = useLocation();
    const resultdata: ResultData | undefined = location?.state;
    console.log('resultdata', resultdata);
    if (!resultdata) {
        // resultdata가 없을 때
        return (
            <>
                <LaserAnimation />
                <Container>데이터를 찾을 수 없습니다.</Container>
            </>
        );
    }
    return (
        <>
            <LaserAnimation />
            <Container>
                <ContainerBox>
                    <Header>
                        <h1>Play Result</h1>
                    </Header>
                    <Main resultdata={resultdata} />
                    <Bottom>
                        <Button>
                            <Link to="/musiclist/challenge">Back to music</Link>
                        </Button>
                        <Button>
                            <Link to={`/challenge/${resultdata?.musicId}`}>Retry</Link>
                        </Button>
                        <Button>
                            <Link to="/">Home</Link>
                        </Button>
                    </Bottom>
                </ContainerBox>
            </Container>
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    color: #fff;
    padding: 1rem;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const ContainerBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const Header = styled.header`
    h1 {
        font-size: 3rem;
    }
    color: ${(props) => props.theme.pink};
    font-family: italic;
    margin-top: 1rem;
`;

const Bottom = styled.footer`
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    margin-right: 6rem;
`;

const Button = styled.button`
    display: flex;
    background-color: rgba(255, 255, 255, 0.1);
    color: ${(props) => props.theme.pink};
    background-color: ${(props) => props.theme.blue};
    border: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    &:hover {
        background-color: ${(props) => props.theme.green};
    }

    padding: 1rem;
    margin: 1rem 1rem 2rem 1rem;
    transform: skew(-20deg);

    a {
        text-decoration: none;
        color: ${(props) => props.theme.pink};
    }
`;
