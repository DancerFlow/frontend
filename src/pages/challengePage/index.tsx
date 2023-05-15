import styled from 'styled-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
const ChallengePage = () => {
    const navigate = useNavigate();
    const { musicId } = useParams();

    const handleMovePage = (page?: string) => {
        if (page) {
            navigate('/challenge/' + musicId + '/' + page);
        } else {
            navigate('/challenge/' + musicId);
        }
    };

    return (
        <Container>
            <Home onClick={() => handleMovePage()}>Home</Home>
            <Game onClick={() => handleMovePage('game')}>game</Game>
            <Score onClick={() => handleMovePage('score')}>정답추출</Score>
            <Outlet />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: relative;
`;

const Home = styled.div`
    width: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    height: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    background-color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 100px;
    left: 0;
`;

const Game = styled.div`
    width: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    height: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 200px;
    left: 0;
    z-index: 100;
`;

const Score = styled.div`
    width: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    height: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 300px;
    left: 0;
    z-index: 100;
`;
export default ChallengePage;
