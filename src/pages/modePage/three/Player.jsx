import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

export default function Player({ playerPosition, destinationPoint, playerAnimation, setPlayerAnimation }) {
    const ref = useRef();
    // Fetch model and a separate texture
    const gltf = useGLTF('/models/ilbuni.glb');
    // Skinned meshes cannot be re-used in threejs without cloning them
    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    });

    let mixer = new THREE.AnimationMixer(gltf.scene.children[0]);

    const actions = [mixer.clipAction(gltf.animations[0]), mixer.clipAction(gltf.animations[1])];

    useEffect(() => {
        actions[playerAnimation].stop();
        actions[playerAnimation].play();
    }, [playerAnimation, destinationPoint]);

    useEffect(() => {
        if (!destinationPoint) return;
        gltf.scene.children[0].lookAt(new THREE.Vector3(destinationPoint[0], -0.4, destinationPoint[2]));
    }, [destinationPoint]);

    useFrame((state, delta) => {
        mixer.update(delta);
        if (!destinationPoint) return;

        if (playerAnimation === 1) {
            const angle = Math.atan2(destinationPoint[2] - ref.current.position.z, destinationPoint[0] - ref.current.position.x);
            ref.current.position.x += Math.cos(angle) * 0.06;
            ref.current.position.z += Math.sin(angle) * 0.06;
            state.camera.position.x = 1 + ref.current.position.x;
            state.camera.position.z = 5 + ref.current.position.z;
            console.log(
                Math.abs(destinationPoint[0] - ref.current.position.x) < 0.03 &&
                    Math.abs(destinationPoint[2] - ref.current.position.z) < 0.03
            );
            if (
                Math.abs(destinationPoint[0] - ref.current.position.x) < 0.03 &&
                Math.abs(destinationPoint[2] - ref.current.position.z) < 0.03
            ) {
                setPlayerAnimation(0);
            }
        }
    });

    return (
        <primitive
            ref={ref}
            object={gltf.scene}
            castShadow
            receiveShadow
            position={playerPosition}
            onClick={(e) => {
                console.log(e);
                e.stopPropagation();
                setPlayerAnimation(playerAnimation == 1 ? 0 : 1);
            }}
        ></primitive>
    );
}
