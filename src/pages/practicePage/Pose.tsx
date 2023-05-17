import { useState, useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import sheet from './keypoints.json';
import { test } from './scoring';

// * Pose 컴포넌트와 관련된 코드. 상태와 이펙트 등을 포함
const Pose = forwardRef(({ setKeypointsDetected, playTest, setPlayTest }, ref) => {
    const scoreVideoRef = ref;
    const videoRef = useRef<HTMLVideoElement>(null);
    const detectorRef = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const navigate = useNavigate();

    // * 연결할 keypoints를 저장하는 배열
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

    // * canvas에 연결할 keypoints를 그리는 함수
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
                    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
                    ctx.stroke();

                    // 눈 그리기
                    const eyeLength = 10; // 눈의 길이 설정
                    const eyeDistance = 15; // 눈 사이의 거리 설정
                    const eyeHeight = -5; // 눈의 높이 설정

                    // 왼쪽 눈 그리기
                    ctx.beginPath();
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 3;
                    ctx.moveTo(centerX - eyeDistance, centerY); // 왼쪽 눈의 중앙
                    ctx.lineTo(centerX - eyeDistance - eyeLength / 2, centerY + eyeHeight); // 왼쪽 눈의 왼쪽 끝
                    ctx.lineTo(centerX - eyeDistance + eyeLength / 2, centerY + eyeHeight); // 왼쪽 눈의 오른쪽 끝
                    ctx.closePath(); // 선의 시작점과 끝점을 연결
                    ctx.stroke();

                    // 오른쪽 눈 그리기
                    ctx.beginPath();
                    ctx.moveTo(centerX + eyeDistance, centerY); // 오른쪽 눈의 중앙
                    ctx.lineTo(centerX + eyeDistance - eyeLength / 2, centerY + eyeHeight); // 오른쪽 눈의 왼쪽 끝
                    ctx.lineTo(centerX + eyeDistance + eyeLength / 2, centerY + eyeHeight); // 오른쪽 눈의 오른쪽 끝
                    ctx.closePath(); // 선의 시작점과 끝점을 연결
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

                        //^ score가 0.4 이상인 keypoints만 valid로 가정
                        const validKeypoints = pose.keypoints.filter((keypoint) => keypoint.score >= 0.4);
                        setKeypointsDetected(validKeypoints.length);

                        // canvas 초기화
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        //^ validKeypoints의 개수가 12개 이상일 경우에만 선을 그림
                        if (validKeypoints.length >= 12) {
                            POSE_CONNECTIONS.forEach(([start, end]) => {
                                connect(ctx, pose.keypoints, start, end);
                            });
                        }
                        console.log(Math.round(scoreVideoRef.current.currentTime));
                        console.log(test(sheet, Math.round(scoreVideoRef.current.currentTime), pose.keypoints));
                        const testResult = test(sheet, Math.round(scoreVideoRef.current.currentTime), pose.keypoints);

                        //^ 65점 이상이면 테스트 통과
                        if (testResult > 65 && !playTest) {
                            setPlayTest(true);
                        }
                    });
                }
            }, 100); // 100ms 마다 실행

            return () => clearInterval(intervalId); // 컴포넌트 unmount 시 interval 해제
        };
        runPoseEstimation();
    }, []);

    return (
        <Container>
            <HiddenVideo ref={videoRef} autoPlay></HiddenVideo>
            <canvas ref={canvasRef}></canvas>
        </Container>
    );
});

const Container = styled.div`
    height: 70vh;
    width: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
`;

const HiddenVideo = styled.video`
    height: 80%;
    width: 100%;
    display: none;
`;
export default Pose;
