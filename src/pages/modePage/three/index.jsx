import React, { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import Model from './Model';
import Floor from './Floor';
import Spot from './Spot';
import House from './House';
import Player from './Player';

const Three = () => {
    const [playerPosition, setPlayerPosition] = useState([0, -0.5, 0]);
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
                zoom: 80,
                left: -(window.innerWidth / window.innerHeight),
                right: window.innerWidth / window.innerHeight,
                top: 1,
                bottom: -1,
                near: -1000,
                far: 1000
            }}
        >
            <ambientLight />
            <directionalLight position={[1, 1, 1]} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            <group position={[0, -1, 0]}>
                <Suspense fallback={null}>
                    <Model pose={4} position={[0, 0, 0]} />
                </Suspense>
            </group>

            <Floor setDestinatioPoint={setDestinatioPoint}></Floor>
            <Spot></Spot>
            <House></House>
            <Player
                playerPosition={playerPosition}
                destinationPoint={destinationPoint}
                playerAnimation={playerAnimation}
                setPlayerAnimation={setPlayerAnimation}
            ></Player>
        </Canvas>
    );
};

export default Three;
