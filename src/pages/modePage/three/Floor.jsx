import React from 'react';
import { useTexture } from '@react-three/drei';
import grid from './material/grid.jpg';
import * as THREE from 'three';

export default function Floor({ setDestinatioPoint, width, height, center }) {
    const texture = useTexture(grid);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 1;
    texture.repeat.y = 1;

    const handleFloorClick = (e) => {
        e.stopPropagation();
        const { x, y, z } = e.point;
        setDestinatioPoint([x, y, z]);
    };

    return (
        <mesh
            rotation={[-0.5 * Math.PI, 0, 0]}
            position={[center[0], center[1], center[2]]}
            receiveShadow
            onClick={(e) => handleFloorClick(e)}
        >
            <planeGeometry args={[width, height, 1, 1]} />
            <shadowMaterial transparent opacity={0.2} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
}
