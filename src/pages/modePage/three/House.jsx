import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';

export default function House() {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    const gltf = useGLTF('/models/house.glb');
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const navigate = useNavigate();

    const handleHouseClick = (e) => {
        e.stopPropagation();
        setHovered((cur) => !cur);
    };

    useFrame((state) => {
        if (hovered) {
            ref.current.position.y = MathUtils.lerp(ref.current.position.y, -3.68, 0.07);
            state.camera.position.y = MathUtils.lerp(state.camera.position.y, 2, 0.07);
        } else {
            ref.current.position.y = MathUtils.lerp(ref.current.position.y, -8, 0.07);
            state.camera.position.y = MathUtils.lerp(state.camera.position.y, 5, 0.07);
        }
    });

    return (
        <primitive
            ref={ref}
            object={gltf.scene}
            scale={0.5}
            rotation={[0, Math.PI, 0]}
            castShadow
            receiveShadow
            position={[40.4, -3.68, 10]}
            onClick={(e) => handleHouseClick(e)}
        ></primitive>
    );
}
