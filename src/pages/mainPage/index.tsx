import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginModal from '../../components/main/LoginModal';
import LoadingView from '../../components/common/LoadingView';
import VideoContainer from '../../components/main/VideoContainer';

const MainPage = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    return (
        <div>
            {/* <LoadingView loading={loadingScreen}></LoadingView> */}
            <VideoContainer setIsClicked={setIsClicked} isClicked={isClicked}></VideoContainer>
            {isClicked && <LoginModal setIsClicked={setIsClicked} />}
        </div>
    );
};

export default MainPage;
