import styled from 'styled-components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/Context';
const ChallengePage = () => {
    const navigate = useNavigate();
    const { musicId } = useParams();
    const { state, bgmControl } = useContext(GlobalContext);

    useEffect(() => {
        sessionStorage.setItem('bgmstate', state.bgmState.bgm.toString());
        bgmControl({ bgm: false });
    }, []);

    const handleMovePage = (page?: string) => {
        if (page === 'game') {
            navigate(`/challenge/${musicId}`);
        } else if (page === 'score') {
            navigate(`/challenge/score/${musicId}`);
        } else {
            navigate('/challenge');
        }
    };

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
