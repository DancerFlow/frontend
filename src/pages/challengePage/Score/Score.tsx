import { useState, useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';

const Score = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    let lastTime = -1;

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
            const keypointsArray: any = [];

            if (videoRef.current) {
                videoRef.current.addEventListener('timeupdate', async () => {
                    if (videoRef.current) {
                        const currentTime = Math.round(videoRef.current.currentTime * 2) / 2;

                        if (currentTime > lastTime) {
                            lastTime = currentTime;
                            const pose = await detector.estimatePoses(videoRef.current, { maxPoses: 1 });
                            const validKeypoints = pose[0].keypoints;
                            keypointsArray.push({
                                time: currentTime,
                                keypoints: validKeypoints
                            });
                        }
                    }
                });

                videoRef.current.addEventListener('ended', () => {
                    console.log(keypointsArray);
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(keypointsArray));
                    const downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute('href', dataStr);
                    downloadAnchorNode.setAttribute('download', 'keypoints.json');
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            const fileURL = URL.createObjectURL(file);
            if (videoRef.current) {
                videoRef.current.src = fileURL;
            }
        }
    };

    return (
        <Container>
            <Video ref={videoRef}></Video>
            <button onClick={handlePlayButton}>정답추출</button>
            <input type="file" accept="video/*" onChange={handleFileChange} />
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
