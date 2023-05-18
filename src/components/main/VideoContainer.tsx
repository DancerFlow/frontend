import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import bgVideo from '../../assets/dancerflow.mp4';
import { useContext } from 'react';
import { GlobalContext } from '../../context/Context';

interface Props {
    isClicked: boolean;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoContainer = ({ isClicked, setIsClicked }: Props) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { bgmControl } = useContext(GlobalContext);

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
            if (videoRef.current == null) return;
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
        if (videoRef.current == null) return;
        if (!isClicked && videoRef.current?.currentTime >= 0.2) {
            videoRef.current?.pause();
        }
    };

    const handleOnClick = () => {
        setIsClicked(true);
        videoRef.current?.play();
    };

    return (
        <BackgroundContainer>
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
        </BackgroundContainer>
    );
};

const BackgroundContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
`;

// const BackgroundContainer = styled.div`
//     width: 334px;
//     height: 216px;
//     background-color: black;
//     overflow: hidden;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     z-index: 2;
// `;

const VideoS = styled.video`
    width: 900px;

    margin: 50px;
`;
export default VideoContainer;
