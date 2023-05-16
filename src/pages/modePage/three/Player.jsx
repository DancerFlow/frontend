import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';
import { easing } from 'maath';

export default function Player({ destinationPoint, playerAnimation, setPlayerAnimation, setArea, area }) {
    const ref = useRef();
    const gltf = useGLTF('/models/girl2.glb');
    const { scene, animations } = useGLTF('/models/girl2.glb');
    const [animationTime, setAnimationTime] = useState(0);

    gltf.scene.castShadow = true;
    gltf.scene.receiveShadow = true;
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    let mixer = new THREE.AnimationMixer(gltf.scene.children[0]);

    const actions = [mixer.clipAction(gltf.animations[3]), mixer.clipAction(gltf.animations[4]), mixer.clipAction(gltf.animations[1])];

    useEffect(() => {
        actions[playerAnimation].reset().fadeIn(0.1).play();
        return () => {
            actions[playerAnimation].fadeOut(0.1);
        };
    }, [playerAnimation, destinationPoint, area]);

    useEffect(() => {
        if (!destinationPoint) return;
        //가까운곳 클릭시 드러눕기 방지하고 박수치기
        if (Math.abs(destinationPoint[0] - ref.current.position.x) < 1 && Math.abs(destinationPoint[2] - ref.current.position.z) < 1) {
            setPlayerAnimation(2);
            return;
        }
        //목적지 설정시 쳐다보기
        if (playerAnimation != 1) setPlayerAnimation(1);
        gltf.scene.children[0].lookAt(new THREE.Vector3(destinationPoint[0], -0.7, destinationPoint[2]));
    }, [destinationPoint]);

    useEffect(() => {
        area != -1 && setPlayerAnimation(0);
    }, [area]);

    useFrame((state, delta) => {
        mixer.update(delta);

        state.camera.lookAt(ref.current.position);
        if (!destinationPoint) return;

        if (playerAnimation === 1) {
            const angle = Math.atan2(destinationPoint[2] - ref.current.position.z, destinationPoint[0] - ref.current.position.x);
            ref.current.position.x += Math.cos(angle) * 0.09;
            ref.current.position.z += Math.sin(angle) * 0.09;

            state.camera.position.x = 1 + ref.current.position.x;
            state.camera.position.z = 5 + ref.current.position.z;

            if (
                Math.abs(destinationPoint[0] - ref.current.position.x) < 0.06 &&
                Math.abs(destinationPoint[2] - ref.current.position.z) < 0.06
            ) {
                setPlayerAnimation(0);
            }
            if (ref.current.position.x > 4) {
                if (ref.current.position.z > 4) {
                    setArea(2);
                } else if (ref.current.position.z < -4) {
                    setArea(0);
                } else {
                    setArea(-1);
                }
            } else if (ref.current.position.x < -4) {
                if (ref.current.position.z > 4) {
                    setArea(3);
                } else if (ref.current.position.z < -4) {
                    setArea(1);
                } else {
                    setArea(-1);
                }
            } else {
                setArea(-1);
            }
        }
    });
    return (
        <primitive
            ref={ref}
            object={scene}
            castShadow
            receiveShadow
            position={[0, -1.03, -16]}
            scale={0.6}
            onClick={(e) => {
                e.stopPropagation();
                setPlayerAnimation(2);
            }}
        ></primitive>
    );
}
