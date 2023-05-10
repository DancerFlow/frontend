import Lottie from 'lottie-react';
import React, { useState, useEffect, useRef } from 'react';
import animationData from '../../../assets/likeBtn.json';
import styled from 'styled-components';
const LikeBtn = () => {
    const [isClicked, setIsClicked] = useState(false);
    const lottieRef = useRef(null);
    useEffect(() => {
        isClicked ? lottieRef.current.playSegments([2, 50], true) : lottieRef.current.playSegments([2, 3], true);

        return () => {
            lottieRef.current.destroy();
        };
    }, [isClicked]);

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
    background-color: red;
`;

export default LikeBtn;
