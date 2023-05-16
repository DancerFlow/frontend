import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import Three from './three';

const ModePage = () => {
    return (
        <CanvasContainer>
            <Three></Three>
        </CanvasContainer>
    );
};

const CanvasContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
`;

export default ModePage;
