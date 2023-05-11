import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ScorePoints from './ScorePoints';
import Pose from './Pose';
const ChallengePage = () => {
    return (
        <Container>
            <PoseWrapper>
                <h1>사용자 화면</h1>
                <Pose />
            </PoseWrapper>
            <PoseWrapper>
                <h1>실제 score points</h1>
                <ScorePoints />
            </PoseWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PoseWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 1000px;
`;

export default ChallengePage;
