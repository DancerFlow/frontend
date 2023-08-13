import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { Environment, Effects, useGLTF, Html } from '@react-three/drei';

import Model from './Model';
import Floor from './Floor';
import Player from './Player';
import Logo from './Logo';
import Practice from './Practice';
import Challenge from './Challenge';
import Construction from './Construction';
import Room from './Room';
import LoadingView from '../../../components/common/LoadingView';

const Three = () => {
    const [destinationPoint, setDestinatioPoint] = useState([0, 0, -2]);
    const [playerAnimation, setPlayerAnimation] = useState(0);
    const [area, setArea] = useState(-1); // 0: practice, 1: challenge, 2: construction, 3: room
    const [isLoading, setIsLoading] = useState(true);
    const roomRef = useRef();
    const floorWidth = 30;
    const floorHeight = 30;
    const floorCenter = [0, -1, 0];

    return (
        <Canvas
            orthographic={true}
            shadows
            camera={{
                position: [floorCenter[0], floorCenter[1] + 15, floorCenter[2]],
                fov: 50,
                zoom: 40,
                left: -floorWidth / 2,
                right: floorWidth / 2,
                top: floorHeight / 2,
                bottom: -floorHeight / 2,
                near: -1000,
                far: 1000
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 30, 10]}
                intensity={1}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
                color="white"
            />
            <Suspense
                fallback={
                    <Html center>
                        <LoadingView loadingScreen={true} />
                    </Html>
                }
            >
                <Floor setDestinatioPoint={setDestinatioPoint} width={floorWidth} height={floorHeight} center={floorCenter}></Floor>
                <Construction area={area}></Construction>
                <Practice area={area}></Practice>
                <Room area={area}></Room>
                <Challenge area={area}></Challenge>
                <Logo />
                <Player
                    destinationPoint={destinationPoint}
                    playerAnimation={playerAnimation}
                    setPlayerAnimation={setPlayerAnimation}
                    setArea={setArea}
                    area={area}
                ></Player>
            </Suspense>
        </Canvas>
    );
};

export default Three;
