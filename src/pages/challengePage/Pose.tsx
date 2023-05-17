import { useState, useEffect, useRef, useContext } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
import { forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostGuestPlayDataMutation, usePostUserPlayDataMutation } from '../../api/usePostPlayDataMutation';
import { GlobalContext } from '../../context/Context';
import sheet_9th from '../practicePage/keypoints_9th.json';
import { test } from '../../hooks/scoring';

const COLOR_LIST = ['#00FF00', '#0000FF', '#FF00FF', '#1f9ce0', '#FF0000'];

// * Pose 컴포넌트와 관련된 코드. 상태와 이펙트 등을 포함
const Pose = forwardRef(({ setKeypointsDetected, currentTime }, ref) => {
    const context = useContext(GlobalContext); // globalcontext가 저장된 컨텍스트의 이름에 따라 수정해야 합니다.
    const isLoggedIn = context.state.userState.login;
    const [testResult, setTestResult] = useState(0);
    const { musicId } = useParams();
    const scoreVideoRef = ref;
    const videoRef = useRef<HTMLVideoElement>(null);
    const detectorRef = useRef(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [lastSavedSecond, setLastSavedSecond] = useState(-1);
    const [savedKeypoints, setSavedKeypoints] = useState([]);
    const [score, setScore] = useState({ feedback: '', color: '' });
    const navigate = useNavigate();
    const musicIdNumber = Number(musicId);

    const isGuest = !isLoggedIn;
    const postPlayDataMutation = isGuest
        ? usePostGuestPlayDataMutation(musicIdNumber, savedKeypoints, {
              onSuccess: (data) => {
                  console.log('scoreId: ', data);
                  navigate('/result', { state: { guestData: data, musicId: musicIdNumber } });
              },
              onError: (error) => {
                  console.log('scoreId: ', error);
                  navigate('/result', { state: { error: error } });
              }
          })
        : usePostUserPlayDataMutation(musicIdNumber, savedKeypoints, {
              onSuccess: (data) => {
                  console.log('scoreId: ', data);
                  navigate('/result', { state: { scoreId: data, musicId: musicIdNumber } });
              },
              onError: (error) => {
                  console.log('error: ', error);
                  navigate('/result', { state: { error: error } });
              }
          });

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

    //* 점수에 따른 피드백 문자열을 반환하는 함수
    const getFeedback = (score) => {
        if (score >= 90) {
            return { feedback: 'Perfect!', color: COLOR_LIST[0] };
        } else if (score >= 85) {
            return { feedback: 'Great!', color: COLOR_LIST[1] };
        } else if (score >= 80) {
            return { feedback: 'Good!', color: COLOR_LIST[2] };
        } else if (score >= 60) {
            return { feedback: 'Normal', color: COLOR_LIST[3] };
        } else {
            return { feedback: 'Miss', color: COLOR_LIST[4] };
        }
    };

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

                if (
                    (start === 6 && end === 5) ||
                    (start === 6 && end === 12) ||
                    (start === 5 && end === 11) ||
                    (startKeypoint.score >= 0.4 && endKeypoint.score >= 0.3)
                ) {
                    // 머리 좌표(3,4)
                    if (start === 3 && end === 4) {
                        ctx.beginPath();
                        ctx.strokeStyle = score.color;
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
                        ctx.strokeStyle = score.color;
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
                        ctx.strokeStyle = score.color;
                        ctx.lineWidth = 7;
                        ctx.moveTo(canvas.width - startKeypoint.x, startKeypoint.y); // x 좌표 반전
                        ctx.lineTo(canvas.width - endKeypoint.x, endKeypoint.y); // x 좌표 반전
                        ctx.stroke();
                    }
                }
            };
            // pose 추정 실행
            const intervalId = setInterval(async () => {
                if (videoRef.current && ctx) {
                    const poses = await detectorRef.current.estimatePoses(videoRef.current, { maxPoses: 1 });

                    poses.forEach((pose) => {
                        tf.tidy(() => {
                            // Wrap your code with tf.tidy()
                            const validKeypoints = pose.keypoints.filter((keypoint) => keypoint.score >= 0.4);
                            setKeypointsDetected(validKeypoints.length);

                            // canvas 초기화
                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            // const newTestResult = test(sheet_9th, Math.round(currentTime), pose.keypoints);
                            // setTestResult(newTestResult);
                            if (validKeypoints.length >= 5) {
                                // const { feedback, color } = getFeedback(newTestResult);
                                // setScore(feedback);
                                POSE_CONNECTIONS.forEach(([start, end]) => {
                                    connect(ctx, pose.keypoints, start, end);
                                });
                            }
                            // 점수에 따른 피드백 출력
                        });
                    });
                }
            }, 100); // 50밀리초 간격으로 setInterval 함수 실행

            return () => {
                clearInterval(intervalId); // Clear the interval
                if (videoRef.current && videoRef.current.srcObject) {
                    let stream = videoRef.current.srcObject;
                    let tracks = stream.getTracks();

                    tracks.forEach(function (track) {
                        track.stop();
                    });

                    videoRef.current.srcObject = null;
                }
            };
        };
        runPoseEstimation();
    }, [score.color]);

    // * 유저 keypoints를 저장하는 함수
    useEffect(() => {
        const currentSecond = Math.round(currentTime);

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
                            const newTestResult = test(sheet_9th, currentSecond, validKeypoints);
                            setTestResult(newTestResult);
                            setSavedKeypoints((prevKeypoints) => [...prevKeypoints, poseData]);
                        });
                        setLastSavedSecond(currentSecond); // 이 위치로 변경
                    }
                } catch (error) {
                    console.error('Error in estimatePoses:', error);
                }
            };
            estimatePoses();
        }
        const { feedback, color } = getFeedback(testResult);
        setScore({ feedback, color });
    }, [currentTime]);

    // * video가 끝나면 mutation을 호출하는 이펙트
    useEffect(() => {
        const video = scoreVideoRef.current;

        const handleVideoEnded = () => {
            // 비디오 재생이 끝나면 mutation을 호출하는 코드를 여기에 작성하세요.
            console.log('video ended');
            postPlayDataMutation.mutate();
        };

        if (video) {
            video.addEventListener('ended', handleVideoEnded);
        }

        return () => {
            // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
            if (video) {
                video.removeEventListener('ended', handleVideoEnded);
            }
        };
    }, [scoreVideoRef.current]);
    return (
        <Container>
            <Score color={score.color}>{score.feedback}</Score>
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

const Score = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${(props) => props.color};
`;
const HiddenVideo = styled.video`
    display: none;
`;
export default Pose;
