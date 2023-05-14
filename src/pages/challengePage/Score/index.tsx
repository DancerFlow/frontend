import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Score from './Score';

const ScoreExtraction = () => {
    const [keypointsDetected, setKeypointsDetected] = useState(0);

    return (
        <>
            <Main>
                <VideoArea>
                    <Score setKeypointsDetected={setKeypointsDetected} />
                </VideoArea>
            </Main>
        </>
    );
};

const Top = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Icon = styled.div`
    width: 200px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    height: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.color};
    color: white;
    border-radius: 10px;
`;

const Main = styled.div`
    display: flex;
    flex: 1;
`;

const VideoArea = styled.div`
    flex: 1;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
`;

export default ScoreExtraction;
