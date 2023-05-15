import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import ReactHowler from 'react-howler';
import styled, { keyframes } from 'styled-components';

import bgm from '../assets/rukunetsu.mp3';
import bgmOnOff from '../assets/bgmOnOff.json';

const BgmPlayer = () => {
    const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
    const lottieRef = useRef<any>(null);

    useEffect(() => {
        isSoundOn ? lottieRef.current.playSegments([37, 67], true) : lottieRef.current.playSegments([5, 33], true);
    }, [isSoundOn]);

    const handleSound = () => {
        setIsSoundOn((cur) => !cur);
    };

    return (
        <>
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
            <ReactHowler src={[bgm]} playing={isSoundOn} volume={0.2} loop={true} />
            <BgmController onClick={handleSound}>
                <Lottie lottieRef={lottieRef} animationData={bgmOnOff} loop={false} autoPlay={false}></Lottie>
            </BgmController>
        </>
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

const BgmController = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background-color: #27fd1c;
    cursor: pointer;
    z-index: 100;
`;

export default BgmPlayer;
