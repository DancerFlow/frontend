import React, { useEffect, useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled, { keyframes } from 'styled-components';
import P5Screen from './P5Screen';

interface Props {
    loadingScreen: boolean;
}

const LoadingView = ({ loadingScreen }: Props) => {
    const [textIndex, setTextIndex] = useState<number>(0);
    const textArray: Array<string> = [
        'IN',
        'OUT',
        'AIR',
        'MUD',
        'CONTRA',
        'OVER',
        'UNDER',
        'TENSOR',
        'WORK',
        'LIFE',
        'HYDRA',
        'MICRO',
        'CINE',
        'BIO'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((cur) => (cur === textArray.length - 1 ? 0 : cur + 1));
        }, 80);
        return () => clearInterval(interval);
    }, []);

    return (
        <CSSTransition in={loadingScreen} timeout={2000} mountOnEnter unmountOnExit classNames="loadingScreen">
            <LoadingContainer>
                <p>
                    {loadingScreen ? textArray[textIndex] : 'DANCER'}
                    <strong>FLOW</strong>
                </p>
            </LoadingContainer>
        </CSSTransition>
    );
};

const appearLoading = keyframes`
    0% {
    opacity: 0;
    transform: translateY(-100%);
  }

  50% {
    opacity: 1;
    transform: translateY(20%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const disappearLoading = keyframes`
      0% {
    opacity: 1;
    transform: translateY(0);
  }

  50% {
    opacity: 0.8;
    transform: translateY(60%);
  }

  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const LoadingContainer = styled.div`
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: #0223ff;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 50vh;
    transition: opacity 1s linear;

    &.loadingScreen-enter-active {
        animation: ${appearLoading} 1s ease-out forwards;
    }
    &.loadingScreen-exit-active {
        animation: ${disappearLoading} 1s 0.7s ease-out forwards;
    }

    p {
        font-family: 'NanumSquareNeoExtraBold';
        letter-spacing: -10px;
        font-size: 140px;
        width: 1000px;
        text-align: right;
        color: #27fd1c;
        transform: skew(-6deg);
        margin-left: 140px;
        margin-top: 60px;
        strong {
            font-size: 137px;
            -webkit-text-stroke: 3px #27fd1c;
            color: transparent;
        }
    }
`;

export default LoadingView;
