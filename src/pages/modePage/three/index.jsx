import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from './Model';
import Floor from './Floor';
import Spot from './Spot';
import House from './House';
import Player from './Player';
import Logo from './Logo';
import Background from './Background';
import Practice from './Practice';
import Challenge from './Challenge';
import House2 from './house2';

const Three = () => {
    const [playerPosition, setPlayerPosition] = useState([0, -1.05, 0]);
    const [destinationPoint, setDestinatioPoint] = useState();
    const [playerAnimation, setPlayerAnimation] = useState(0);
    const [angle, setAngle] = useState(0);

    return (
        <Canvas
            orthographic={true}
            shadows
            camera={{
                position: [1, 5, 5],
                fov: 50,
                zoom: 70,
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
                intensity={2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
                color="white"
            />

            {/* <group position={[0, -1, 0]}>
                <Suspense fallback={null}>
                    <Model pose={4} position={[0, 0, 0]} />
                </Suspense>
            </group> */}
            <Background></Background>
            <Floor setDestinatioPoint={setDestinatioPoint}></Floor>
            <Spot></Spot>
            <House></House>
            <House2></House2>
            <Practice></Practice>
            <Challenge></Challenge>
            <Logo></Logo>

            <Player
                destinationPoint={destinationPoint}
                setPlayerPosition={setPlayerPosition}
                playerAnimation={playerAnimation}
                setPlayerAnimation={setPlayerAnimation}
            ></Player>
        </Canvas>
    );
};

export default Three;
