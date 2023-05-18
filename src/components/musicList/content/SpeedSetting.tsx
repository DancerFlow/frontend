import React, { useState } from 'react';
import styled from 'styled-components';

interface SpeedSettingProps {
    onSpeedChange: (speed: number) => void;
    answer: boolean;
}

export const SpeedSetting: React.FC<SpeedSettingProps> = ({ onSpeedChange, answer }) => {
    const [selectedSpeed, setSelectedSpeed] = useState<number | null>(0.5);

    const handleClick = (speed: number) => {
        if (selectedSpeed !== speed) {
            setSelectedSpeed(speed);
            onSpeedChange(speed);
        }
    };
    return (
        <SpeedContainer>
            <h2>Level</h2>
            <SpeedOption onClick={() => handleClick(0.5)} selected={selectedSpeed === 0.5} disabled={!answer}>
                Easy (0.5x)
            </SpeedOption>
            <SpeedOption onClick={() => handleClick(1)} selected={selectedSpeed === 1} disabled={!answer}>
                Normal (1x)
            </SpeedOption>
            <SpeedOption onClick={() => handleClick(1.5)} selected={selectedSpeed === 1.5} disabled={!answer}>
                Hard (1.5x)
            </SpeedOption>
        </SpeedContainer>
    );
};

const SpeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
    height: 100%;
    h2 {
        color: ${(props) => props.theme.modal.fontColorTwo};
        font-size: 28px;
        margin: 8px;
        font-family: 'NanumSquareNeoExtraBold';
    }
`;

const SpeedOption = styled.button<{ selected?: boolean; disabled?: boolean }>`
    font-size: 16px;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${(props) => (props.disabled ? 'grey' : props.selected ? props.theme.pink : '#fff')};
    color: ${(props) => (props.selected ? props.theme.blue : 'black')};
    transition: all 0.3s;
    &:hover {
        color: ${(props) => (!props.disabled ? 'blue' : 'black')};
        cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
    }

    margin: 10px 0;
`;
