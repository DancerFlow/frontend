import React from 'react';
import styled from 'styled-components';
import Three from './three';

const ModePage = () => {
    return (
        <CanvasContainer>
            <Three />
        </CanvasContainer>
    );
};

const CanvasContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
`;

export default ModePage;
