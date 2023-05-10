import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LoginModal from '../../components/main/LoginModal';
import LoadingView from '../../components/common/LoadingView';

import bgVideo from '../../assets/dancerflow.mp4';

const MainPage = () => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
    useEffect(() => {
        setLoadingScreen(true);
        setTimeout(() => setLoadingScreen(false), 3000);
    }, []);

    //버튼 호버시 배경동영상 재생 컨트롤
    useEffect(() => {
        if (videoRef.current == null) return;
        if (isClicked) return;

        if (isHover) {
            videoRef.current.muted = true;
            videoRef.current.play();
            return;
        }
        videoRef.current.muted = true;
        const reversePlay = setInterval(() => {
            if (videoRef.current.currentTime < 0.01) {
                clearInterval(reversePlay);
                videoRef.current.pause();
            } else {
                videoRef.current.play();
                videoRef.current.currentTime -= 0.05;
            }
        }, 40);
    }, [isHover, isClicked]);

    const onTimeUpdate = () => {
        if (!isClicked && videoRef.current?.currentTime >= 0.2) {
            videoRef.current?.pause();
        }
    };

    const handleOnClick = () => {
        setIsClicked(true);
        videoRef.current?.play();
    };

    return (
        <div>
            {/* <LoadingView loadingScreen={loadingScreen}></LoadingView> */}
            <BackgroundContainer>
                <ConfirmSoundPlay onClick={(e) => e.currentTarget.classList.add('clear')}>
                    <span>신나는 브금이랑 함께 하실래요?</span>
                    <div
                        onClick={() => {
                            setIsSoundOn(true);
                        }}
                    >
                        넹!
                    </div>
                    <div
                        onClick={() => {
                            setIsSoundOn(false);
                        }}
                    >
                        아뇨
                    </div>
                </ConfirmSoundPlay>

                <VideoS
                    ref={videoRef}
                    onTimeUpdate={onTimeUpdate}
                    loop={true}
                    onMouseOver={() => setIsHover(true)}
                    onMouseOut={() => setIsHover(false)}
                    onClick={handleOnClick}
                >
                    <source src={bgVideo} type="video/mp4"></source>
                </VideoS>

                {/* <MenuContainer>
                    <ul>
                        <li>
                            <span>LOGIN</span>
                        </li>
                        <li>
                            <span>SIGN UP</span>
                        </li>
                        <li>
                            <span>join as guest</span>
                        </li>
                    </ul>
                </MenuContainer> */}

                {isClicked && <LoginModal setIsClicked={setIsClicked} setIsHover={setIsHover} />}
            </BackgroundContainer>
        </div>
    );
};

const ConfirmKeyframes = keyframes`
    0%{
        top: 90%;
        transform: translate(-50%, -50%) rotate(0deg);
    }
    70%{
        top: 70%;
        transform: translate(-50%, -50%) rotate(-3deg);
    }
    90%{
        top: 55%;
        transform: translate(-50%, -50%) rotate(-4deg);
    }
    100%{
        top: 50%;
        transform: translate(-50%, -50%) rotate(-5deg);
    }
`;

const ConfirmSoundPlay = styled.div`
    z-index: 99;
    display: flex;
    position: absolute;
    width: 680px;
    height: 120px;
    background-color: ${(props) => props.theme.green};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-5deg);
    animation: ${ConfirmKeyframes} 0.3s linear 0s 1;
    align-items: center;
    font-family: 'NanumSquareNeoBold';
    transition: 0.3s ease-out;
    span {
        margin-right: 80px;
        margin-left: 150px;
    }
    div {
        width: 60px;
        height: 60px;
        background-color: white;
        line-height: 60px;
        margin-left: 30px;
        border-radius: 40px;
        transition: transform 0.5s;
        cursor: pointer;
    }
    div:hover {
        opacity: 0.9;
        transform: scale(1.05);
    }
    &.clear {
        visibility: hidden;
        opacity: 0;
    }
`;

const BackgroundContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const VideoS = styled.video`
    width: 900px;
    margin: 50px;
`;

const MenuContainer = styled.div`
    width: 600px;
    height: 300px;
    color: ${(props) => props.theme.pink};
    text-align: end;
    span {
        margin-top: 20px;
        font-size: 72px;
        font-family: 'Franxurter Totally', sans-serif !important;
        font-weight: 800;
        letter-spacing: 5px;
    }
`;

export default MainPage;
