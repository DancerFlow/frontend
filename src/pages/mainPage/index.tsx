import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { GlobalContext } from '../../context/Context';
import LoginModal from '../../components/main/LoginModal';
import LoadingView from '../../components/common/LoadingView';
import VideoContainer from '../../components/main/VideoContainer';

const MainPage = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div>
            {/* <LoadingView loading={loadingScreen}></LoadingView> */}
            <VideoContainer setIsClicked={setIsClicked} isClicked={isClicked}></VideoContainer>
            {isClicked && <LoginModal setIsClicked={setIsClicked} />}
        </div>
    );
};

export default MainPage;
