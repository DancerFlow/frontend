import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface SpeedSettingProps {
    onSpeedChange: (speed: number) => void;
    answer: boolean;
    selectedSpeed: number;
}

export const SpeedSetting: React.FC<SpeedSettingProps> = ({ onSpeedChange, answer, selectedSpeed }) => {
    const handleClick = (speed: number) => {
        if (selectedSpeed !== speed) {
            onSpeedChange(speed);
        }
    };
    return (
        <SpeedContainer>
            <div className="speed-header">
                <h2>PRACTICE SPEED</h2>
            </div>
            <div className="speed-options">
                <SpeedOption onClick={() => handleClick(0.5)} selected={selectedSpeed === 0.5} disabled={!answer}>
                    Easy (0.5x)
                </SpeedOption>
                <SpeedOption onClick={() => handleClick(1)} selected={selectedSpeed === 1} disabled={!answer}>
                    Normal (1x)
                </SpeedOption>
                <SpeedOption onClick={() => handleClick(1.5)} selected={selectedSpeed === 1.5} disabled={!answer}>
                    Hard (1.5x)
                </SpeedOption>
            </div>
        </SpeedContainer>
    );
};

// 애니메이션 정의
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  70% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
`;

const SpeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    height: 100%;

    .speed-header {
        width: 100%;
        display: flex;
        padding: 30px;
        justify-content: center;
        align-items: center;
        h2 {
            color: #dddede;
            font-size: 28px;
            margin: 8px;
            font-family: 'NanumSquareNeoExtraBold';
        }
    }

    .speed-options {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
`;

const SpeedOption = styled.button<{ selected?: boolean; disabled?: boolean }>`
    font-size: 16px;
    padding: 25px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    ${(props) =>
        props.selected &&
        css`
            animation: ${pulseAnimation} 0.5s infinite;
        `}
    background-color: ${(props) => (props.disabled ? 'grey' : props.selected ? props.theme.pink : '#fff')};
    color: ${(props) => (props.selected ? props.theme.blue : 'black')};
    transition: all 0.3s;
    font-weight: 700;
    &:hover {
        color: ${(props) => (!props.disabled ? 'blue' : 'black')};
        cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
    }

    margin: 10px 0;
`;
