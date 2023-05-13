import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model from './Model';
import Floor from './Floor';
import Spot from './Spot';
import Player from './Player';
import Logo from './Logo';
import Background from './Background';
import Practice from './Practice';
import Challenge from './Challenge';
import Construction from './Construction';
import Room from './Room';

const Three = () => {
    const [destinationPoint, setDestinatioPoint] = useState([0, 0, -2]);
    const [playerAnimation, setPlayerAnimation] = useState(0);
    const [area, setArea] = useState(0); // 0: practice, 1: challenge, 2: construction, 3: room
    const roomRef = useRef();

    return (
        <Canvas
            orthographic={true}
            shadows
            camera={{
                position: [5, 5, 1],
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
        </Canvas>
    );
};

export default Three;
