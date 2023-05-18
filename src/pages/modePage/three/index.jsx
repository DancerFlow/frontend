import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import { Environment, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';

import Model from './Model';
import Floor from './Floor';
import Player from './Player';
import Logo from './Logo';
import Background from './Background';
import Practice from './Practice';
import Challenge from './Challenge';
import Construction from './Construction';
import Room from './Room';
import LoadingView from '../../../components/common/LoadingView';

extend({ UnrealBloomPass });

const Three = () => {
    const [destinationPoint, setDestinatioPoint] = useState([0, 0, -2]);
    const [playerAnimation, setPlayerAnimation] = useState(0);
    const [area, setArea] = useState(-1); // 0: practice, 1: challenge, 2: construction, 3: room
    const roomRef = useRef();

    return (
        <Canvas
            orthographic={true}
            shadows
            camera={{
                position: [1, 5, 1],
                fov: 50,
                zoom: 55,
                left: -(window.innerWidth / window.innerHeight),
                right: window.innerWidth / window.innerHeight,
                top: 1,
                bottom: -1,
                near: -1000,
                far: 1000
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 30, 10]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
                color="white"
            />
            <Background></Background>
            <Floor setDestinatioPoint={setDestinatioPoint}></Floor>
            {/* <DanceFloor
                setDestinatioPoint={setDestinatioPoint}
                destinationPoint={destinationPoint}
                playerAnimation={playerAnimation}
            ></DanceFloor> */}
            <Construction area={area}></Construction>
            <Practice area={area}></Practice>
            <Room area={area}></Room>
            <Challenge area={area}></Challenge>
            <Logo></Logo>
            <Player
                destinationPoint={destinationPoint}
                playerAnimation={playerAnimation}
                setPlayerAnimation={setPlayerAnimation}
                setArea={setArea}
                area={area}
            ></Player>
            {/* <Effects disableGamma>
                <unrealBloomPass exposure={1.6} threshold={10} strength={10} radius={0} />
            </Effects> */}
        </Canvas>
    );
};

export default Three;
