import React from 'react';
import styled, { keyframes } from 'styled-components';
import Marquee from 'react-fast-marquee';

interface Props {
    mode: string;
}

const ModeBackground = ({ mode }: Props) => {
    return (
        <BackgroundContainer className={mode}>
            <Marquee speed={120}>{mode}</Marquee>
        </BackgroundContainer>
    );
};

const BackgroundContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: visible;
    &.practice {
        background-color: white;
        div {
            color: black;
        }
    }
    &.challenge {
        background-color: black;
        div {
            color: white;
        }
    }
    div {
        font-size: 400px;
        z-index: 0;
        font-family: 'Pixel Power', sans-serif;
        font-weight: 400;
        overflow: visible;
    }
    .marquee-container {
        position: relative;
    }
`;

export default ModeBackground;
