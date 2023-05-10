import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import ReactHowler from 'react-howler';
import styled from 'styled-components';

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
            <ReactHowler src={[bgm]} playing={isSoundOn} volume={0.2} loop={true} />
            <BgmController onClick={handleSound}>
                <Lottie lottieRef={lottieRef} animationData={bgmOnOff} loop={false} autoPlay={false}></Lottie>
            </BgmController>
        </>
    );
};

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
