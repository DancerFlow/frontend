import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
const ChallengePage = () => {
    const navigate = useNavigate();
    const { musicId } = useParams();

    const handleMoveTest = () => {
        navigate('/challenge/' + musicId + '/test');
    };
    const handleMoveHome = () => {
        navigate('/challenge/' + musicId);
    };
    return (
        <Container>
            <Test onClick={handleMoveTest}>TEST 페이지</Test>
            <Home onClick={handleMoveHome}>Home</Home>
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

const Test = styled.div`
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
export default ChallengePage;
