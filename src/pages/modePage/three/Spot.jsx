import { useFrame } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

export default function Spot({ position }) {
    useFrame((state) => {});

    return (
        <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={position} receiveShadow>
            <planeBufferGeometry args={[2, 2, 1, 1]} />
            <shadowMaterial transparent opacity={0.2} />
            <meshStandardMaterial color="pink" transparent opacity={0.8} />
        </mesh>
    );
}
