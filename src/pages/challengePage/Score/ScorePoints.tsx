import { useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
const ScorePoints = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // SCORE_POINTS (채점용)
    const POSE_CONNECTIONS = [
        [0, 6],
        [0, 5],
        [6, 8],
        [8, 10],
        [5, 7],
        [7, 9],
        [12, 14],
        [14, 16],
        [11, 13],
        [13, 15],
        [10, 16],
        [9, 15]
    ];

    useEffect(() => {
        const runPoseEstimation = async () => {
            await tf.setBackend('webgl'); // 백엔드 설정
            await tf.ready(); // TensorFlow.js 백엔드 초기화
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

            const connect = (ctx, keypoints, start, end) => {
                const startKeypoint = keypoints.find((kpt, idx) => idx === start);
                const endKeypoint = keypoints.find((kpt, idx) => idx === end);

                if (startKeypoint && endKeypoint) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 2;
                    ctx.moveTo(startKeypoint.x, startKeypoint.y);
                    ctx.lineTo(endKeypoint.x, endKeypoint.y);
                    ctx.stroke();
                }
            };
            // pose 추정 실행
            const intervalId = setInterval(async () => {
                if (videoRef.current && ctx) {
                    const poses = await detector.estimatePoses(videoRef.current, { maxPoses: 1 });

                    // canvas 초기화
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // 비디오 프레임을 캔버스에 렌더링
                    // ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
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

                        // keypoint들을 선으로 연결
                        POSE_CONNECTIONS.forEach(([start, end]) => {
                            connect(ctx, pose.keypoints, start, end);
                        });
                    });
                }
            }, 100); // 100ms 마다 실행

            return () => clearInterval(intervalId); // 컴포넌트 unmount 시 interval 해제
        };
        runPoseEstimation();
    }, []);
    return (
        <>
            <HiddenVideo ref={videoRef} autoPlay></HiddenVideo>
            <canvas ref={canvasRef}></canvas>
        </>
    );
};
const HiddenVideo = styled.video`
    display: none;
`;
export default ScorePoints;
