import React, { useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';

const ChallengePage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const runPoseEstimation = async () => {
            const detectorConfig = {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
                enableSmoothing: true, // smoothing 사용 여부
                minPoseScore: 0.2 // 최소 pose score
            };
            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

            // 웹캠 연결
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }
                    })
                    .catch((error) => console.log('getUserMedia error:', error));
            }

            // canvas 요소의 너비와 높이를 비디오 요소의 실제 크기와 일치
            if (videoRef.current) {
                videoRef.current.addEventListener('loadedmetadata', () => {
                    if (canvasRef.current) {
                        canvasRef.current.width = videoRef.current.videoWidth;
                        canvasRef.current.height = videoRef.current.videoHeight;
                    }
                });
            }

            // canvas 요소와 2D context 얻기
            const canvas: any = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // pose 추정 실행
            const intervalId = setInterval(async () => {
                if (videoRef.current && ctx) {
                    const poses = await detector.estimatePoses(videoRef.current, { maxPoses: 1 });
                    // canvas 초기화
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // 비디오 프레임을 캔버스에 렌더링
                    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                    poses.forEach((pose) => {
                        pose.keypoints.forEach((keypoint) => {
                            const x = keypoint.x;
                            const y = keypoint.y;
                            console.log(x, 'x');
                            console.log(y, 'y');
                            // 각각의 keypoint를 빨간 점으로 표시
                            ctx.beginPath();
                            ctx.fillStyle = 'red';
                            ctx.arc(x, y, 5, 0, 2 * Math.PI);
                            ctx.fill();
                        });

                        // 머리부터 오른쪽 어깨까지 선 그리기
                        const nose = pose.keypoints.find((kpt) => kpt.name === 'nose');
                        const rightShoulder = pose.keypoints.find((kpt) => kpt.name === 'rightShoulder');
                        if (nose && rightShoulder) {
                            ctx.beginPath();
                            ctx.strokeStyle = 'blue';
                            ctx.lineWidth = 2;
                            ctx.moveTo(nose.x, nose.y);
                            ctx.lineTo(rightShoulder.x, rightShoulder.y);
                            ctx.stroke();
                        }
                    });
                }
            }, 100); // 100ms 마다 실행

            return () => clearInterval(intervalId); // 컴포넌트 unmount 시 interval 해제
        };
        runPoseEstimation();
    }, []);
    return (
        <>
            <video ref={videoRef} autoPlay></video>
            <canvas ref={canvasRef}></canvas>
        </>
    );
};

export default ChallengePage;
