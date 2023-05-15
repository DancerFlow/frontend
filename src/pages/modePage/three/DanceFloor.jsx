import React, { useEffect, useRef, useState } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { easing } from 'maath';
import * as THREE from 'three';

export default function DanceFloor({ setDestinatioPoint, destinationPoint, playerAnimation }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    const gltf = useGLTF('/models/floor.glb');
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const navigate = useNavigate();
    const handleFloorClick = (e) => {
        e.stopPropagation();
        const { x, y, z } = e.point;
        setDestinatioPoint([x, y, z]);
        console.log(e.point);
    };

    const { actions, names } = useAnimations(gltf.animations);

    // let mixer = new THREE.AnimationMixer(gltf.scene.children[0]);

    // const actions = [];
    // for (let i = 0; i < gltf.animations.length; i++) {
    //     actions.push(mixer.clipAction(gltf.animations[i]));
    // }
    // console.log(actions);

    return (
        <group ref={ref} scale={5} position={[0, -1, 0]}>
            <primitive
                object={gltf.scene}
                scale={1}
                rotation={[0, 0 * Math.PI, 0]}
                castShadow
                receiveShadow
                onClick={(e) => handleFloorClick(e)}
            ></primitive>
        </group>
    );
}
