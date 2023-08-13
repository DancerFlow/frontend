import styled from 'styled-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/Context';
const ChallengePage = () => {
    const { state, bgmControl } = useContext(GlobalContext);

    useEffect(() => {
        sessionStorage.setItem('bgmstate', state.bgmState.bgm.toString());
        bgmControl({ bgm: false });
    }, []);

    return (
        <Container>
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

export default ChallengePage;
