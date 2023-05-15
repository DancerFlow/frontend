import { useState, useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
import answer from './Score/score.json';
import { forwardRef } from 'react';
const Pose = forwardRef(({ setKeypointsDetected, currentTime }, ref) => {
    const scoreVideoRef = ref;
    const videoRef = useRef<HTMLVideoElement>(null);
    const detectorRef = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lastSavedSecond, setLastSavedSecond] = useState(-1);
    const [savedKeypoints, setSavedKeypoints] = useState([]);
    // console.log(scoreVideoRef, 'scoreVideoRef');
    // 연결할 keypoints
    const POSE_CONNECTIONS = [
        [3, 4],
        [6, 8],
        [8, 10],
        [6, 5],
        [5, 7],
        [7, 9],
        [6, 12],
        [5, 11],
        [12, 11],
        [12, 14],
        [11, 13],
        [14, 16],
        [13, 15]
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

            detectorRef.current = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

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

                // 머리 좌표(3,4)
                if (start === 3 && end === 4) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#FE23FF';
                    ctx.lineWidth = 7;
                    const centerX = canvas.width - (startKeypoint.x + endKeypoint.x) / 2; // x 좌표 반전
                    const centerY = (startKeypoint.y + endKeypoint.y) / 2;
                    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.strokeStyle = '#FE23FF';
                    ctx.lineWidth = 7;
                    ctx.moveTo(canvas.width - startKeypoint.x, startKeypoint.y); // x 좌표 반전
                    ctx.lineTo(canvas.width - endKeypoint.x, endKeypoint.y); // x 좌표 반전
                    ctx.stroke();
                }
            };
            // pose 추정 실행
            const intervalId = setInterval(async () => {
                if (videoRef.current && ctx) {
                    const poses = await detectorRef.current.estimatePoses(videoRef.current, { maxPoses: 1 });

                    poses.forEach((pose) => {
                        // keypoint들을 선으로 연결
                        const validKeypoints = pose.keypoints.filter((keypoint) => keypoint.score > 0.4); // score가 0.4 이상인 keypoints만 valid로 가정
                        setKeypointsDetected(validKeypoints.length);

                        // canvas 초기화
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // validKeypoints의 개수가 12개 이상일 경우에만 선을 그림
                        if (validKeypoints.length >= 12) {
                            // 비디오 프레임을 캔버스에 렌더링
                            // ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                            POSE_CONNECTIONS.forEach(([start, end]) => {
                                connect(ctx, pose.keypoints, start, end);
                            });
                        }
                    });
                }
            }, 100); // 100ms 마다 실행

            return () => clearInterval(intervalId); // 컴포넌트 unmount 시 interval 해제
        };
        runPoseEstimation();
    }, []);
    useEffect(() => {
        const currentSecond = Math.floor(currentTime);
        if (currentSecond !== lastSavedSecond) {
            const estimatePoses = async () => {
                try {
                    if (videoRef.current && detectorRef.current) {
                        const poses = await detectorRef.current.estimatePoses(videoRef.current, { maxPoses: 1 });
                        poses.forEach((pose) => {
                            const validKeypoints = pose.keypoints.filter((keypoint) => keypoint.score > 0);
                            // Add the time property to each keypoint
                            const timedKeypoints = validKeypoints.map((keypoint) => ({ ...keypoint, time: currentSecond }));
                            // 'time'과 'keypoints' 속성을 가진 객체로 저장
                            const poseData = {
                                time: currentSecond,
                                keypoints: timedKeypoints
                            };
                            setSavedKeypoints((prevKeypoints) => [...prevKeypoints, poseData]);
                            console.log(timedKeypoints, 'keypoints', `노래${currentSecond}초`); // keypoints 출력
                        });
                        setLastSavedSecond(currentSecond); // 이 위치로 변경
                    }
                } catch (error) {
                    console.error('Error in estimatePoses:', error);
                }
            };
            estimatePoses();
        }
        console.log(savedKeypoints);
    }, [currentTime]);

    return (
        <Container>
            <HiddenVideo ref={videoRef} autoPlay></HiddenVideo>
            <canvas ref={canvasRef}></canvas>
        </Container>
    );
});

const Container = styled.div`
    height: 70%;
    width: 100%;
`;

const HiddenVideo = styled.video`
    height: 80%;
    width: 100%;
    display: none;
`;
export default Pose;
