import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../../context/Context';
import LoginModal from '../../components/main/LoginModal';
import VideoContainer from '../../components/main/VideoContainer';
import { useNavigate } from 'react-router-dom';
import ThreeIntro from '../../components/main/ThreeIntro';

const MainPage = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const { state } = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isClicked && state.userState.login) {
            navigate('/mode');
            return;
        }
    }, [isClicked]);

    return (
        <div>
            <VideoContainer setIsClicked={setIsClicked} isClicked={isClicked}></VideoContainer>

            <LoginModal isModalView={isClicked} setIsModalView={setIsClicked} />
        </div>
    );
};

export default MainPage;
