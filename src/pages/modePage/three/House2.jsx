import React, { useEffect, useRef, useState } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

export default function House2() {
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

    const handleHouseClick = (e) => {
        setHovered((cur) => !cur);
    };

    return (
        <>
            <primitive
                ref={ref}
                object={gltf.scene}
                scale={0.015}
                rotation={[0, 0, 0]}
                castShadow
                receiveShadow
                position={[0, -0.5, 0]}
                onClick={(e) => handleHouseClick(e)}
            ></primitive>
        </>
    );
}
