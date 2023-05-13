import React, { useEffect, useRef, useState } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { easing } from 'maath';

export default function Room({ area }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    const gltf = useGLTF('/models/house2.glb');
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const navigate = useNavigate();

    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, area === 3 ? 1 : 0.2, 0.1, 0.01);
        easing.damp(state.camera.position, 'y', area === 3 ? 2 : 5, 0.5, 0.02);
    });

    const handleHouseClick = (e) => {
        e.stopPropagation();
        setHovered((cur) => !cur);
    };

    return (
        <group ref={ref} scale={1} position={[-9, 1.1, 9]}>
            <primitive
                object={gltf.scene}
                scale={0.013}
                rotation={[0, 0 * Math.PI, 0]}
                castShadow
                receiveShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={(e) => handleHouseClick(e)}
            ></primitive>
        </group>
    );
}
