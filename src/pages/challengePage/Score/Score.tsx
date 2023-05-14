import { useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
import testVideo from '../../../assets/fearless.mp4';

const Score = ({ setKeypointsDetected }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let lastTime = -1; // 마지막으로 keypoints를 추출한 시간

    useEffect(() => {
        const runPoseEstimation = async () => {
            await tf.setBackend('webgl');
            await tf.ready();
            const detectorConfig = {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
                enableSmoothing: true,
                minPoseScore: 0.2
            };
            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
            const keypointsArray = []; // 추출한 keypoints를 담을 배열
            if (videoRef.current) {
                videoRef.current.src = testVideo;
                videoRef.current.addEventListener('loadedmetadata', () => {
                    if (canvasRef.current) {
                        canvasRef.current.width = videoRef.current.videoWidth;
                        canvasRef.current.height = videoRef.current.videoHeight;
                    }
                });
                // 'timeupdate' 이벤트 리스너 추가
                videoRef.current.addEventListener('timeupdate', async () => {
                    const currentTime = Math.round(videoRef.current.currentTime); // 현재 시간을 정수로 반올림
                    // 현재 시간이 마지막으로 keypoints를 추출한 시간보다 크다면
                    if (currentTime > lastTime) {
                        lastTime = currentTime; // 마지막으로 keypoints를 추출한 시간을 업데이트
                        const pose = await detector.estimatePoses(videoRef.current, { maxPoses: 1 });
                        const validKeypoints = pose[0].keypoints.filter((keypoint) => keypoint.score > 0.4);
                        setKeypointsDetected(validKeypoints.length);
                        keypointsArray.push({
                            time: currentTime,
                            keypoints: validKeypoints
                        }); // keypointsArray에 현재 시간과 추출한 keypoints를 추가
                    }
                });
                // 'ended' 이벤트 리스너 추가
                videoRef.current.addEventListener('ended', () => {
                    console.log(keypointsArray); // 비디오가 끝났을 때 keypointsArray를 콘솔에 출력
                });
            }
        };
        runPoseEstimation();
    }, []);

    return (
        <Container>
            <Video ref={videoRef} autoPlay></Video>
            {/* <canvas ref={canvasRef}></canvas> */}
        </Container>
    );
};

const Container = styled.div`
    height: 50%;
    width: 100%;
`;

const Video = styled.video`
    height: 80%;
    width: 100%;
`;

export default Score;
