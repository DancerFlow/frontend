import { useState, useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
import testVideo from '../../../assets/fearless.mp4';

const Score = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
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
            const keypointsArray: any = []; // 추출한 keypoints를 담을 배열
            if (videoRef.current) {
                videoRef.current.src = testVideo;

                // 'timeupdate' 이벤트 리스너 추가
                videoRef.current.addEventListener('timeupdate', async () => {
                    if (videoRef.current) {
                        const currentTime = Math.round(videoRef.current.currentTime * 2) / 2; // 현재 시간을 0.5초 단위로 반올림

                        // 현재 시간이 마지막으로 keypoints를 추출한 시간보다 크다면
                        if (currentTime > lastTime) {
                            lastTime = currentTime; // 마지막으로 keypoints를 추출한 시간을 업데이트
                            const pose = await detector.estimatePoses(videoRef.current, { maxPoses: 1 });
                            // const validKeypoints = pose[0].keypoints.filter((keypoint) => keypoint.score > 0);
                            const validKeypoints = pose[0].keypoints;
                            keypointsArray.push({
                                time: currentTime,
                                keypoints: validKeypoints
                            }); // keypointsArray에 현재 시간과 추출한 keypoints를 추가
                        }
                    }
                });
                // 'ended' 이벤트 리스너 추가
                videoRef.current.addEventListener('ended', () => {
                    console.log(keypointsArray); // 비디오가 끝났을 때 keypointsArray를 콘솔에 출력
                });
            }
        };

        if (isPlaying) {
            runPoseEstimation();
        }
    }, [isPlaying]);

    const handlePlayButton = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <Container>
            <Video ref={videoRef}></Video>
            <button onClick={handlePlayButton}>정답추출</button>
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
