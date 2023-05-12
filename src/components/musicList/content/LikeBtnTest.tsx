import Lottie from 'lottie-react';
import React, { useState, useEffect, useRef } from 'react';
import animationData from '../../../assets/likeBtn.json';
import styled from 'styled-components';

const LikeBtnTest = ({ isOpened }) => {
    const [isClicked, setIsClicked] = useState(false);
    const lottieRef = useRef(null);
    useEffect(() => {
        isClicked ? lottieRef.current.playSegments([20, 50], true) : lottieRef.current.playSegments([2, 3], true);
    }, [isClicked]);

    useEffect(() => {
        if (!isOpened) {
            return () => {
                if (lottieRef.current) {
                    lottieRef.current.destroy();
                }
            };
        }
    }, [isOpened]);

    const handleLike = () => {
        setIsClicked((cur) => !cur);
    };
    return (
        <LikeController onClick={handleLike}>
            <Lottie lottieRef={lottieRef} animationData={animationData} loop={false} autoPlay={false}></Lottie>
        </LikeController>
    );
};

const LikeController = styled.div`
    background-color: white;
`;

export default LikeBtnTest;
