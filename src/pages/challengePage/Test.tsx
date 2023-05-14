import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import fearness from '../../assets/fearless.mp4';
import Pose from './Pose';

const Test = () => {
    const [keypointsDetected, setKeypointsDetected] = useState(0);
    const [countDown, setCountDown] = useState(5);
    const [message, setMessage] = useState('전신이 나오도록 위치해주세요.');
    const [startCountdown, setStartCountdown] = useState(false);
    const videoRef = useRef(null);
    const keypointsPercent = Math.min((keypointsDetected / 17) * 100, 100);
    const navigate = useNavigate();

    useEffect(() => {
        if (keypointsDetected < 16 && !startCountdown) {
            setMessage('전신이 나오도록 위치해주세요.');
            setCountDown(5); // Reset the countdown
        } else if (keypointsDetected >= 16) {
            setStartCountdown(true); // Start the countdown
            setMessage(countDown > 0 ? countDown : 'Dance!');
            if (countDown > 0) {
                setTimeout(() => setCountDown(countDown - 1), 1000);
            }
            if (countDown === 0 && videoRef.current) {
                videoRef.current.loop = false; // 동영상이 한 번만 재생되도록 loop를 false로 설정
                videoRef.current.play();
            }
        }
    }, [keypointsDetected, countDown, startCountdown]);

    const handleVideoEnd = () => {
        if (startCountdown) {
            navigate('/result');
        }
    };
    return (
        <>
            <Top>
                <Icon color="red">Miss</Icon>
                <Icon color="blue">GOOD</Icon>
                <Icon color="pink">PERFECT</Icon>
            </Top>
            <Main>
                <DancingArea>
                    <AreaHeader></AreaHeader>
                    <VideoWrapper>
                        {/* <video
                            ref={videoRef}
                            src={fearness}
                            onEnded={handleVideoEnd}
                            style={{
                                pointerEvents: 'none',
                                maxWidth: '100%', // 비디오가 VideoWrapper의 너비를 넘지 않도록 합니다.
                                maxHeight: '100%', // 비디오가 VideoWrapper의 높이를 넘지 않도록 합니다.
                                objectFit: 'contain' // 비디오의 비율을 유지하면서 VideoWrapper에 맞게 조절합니다.
                            }}
                        /> */}
                    </VideoWrapper>
                    <AreaFooter></AreaFooter>
                </DancingArea>

                <VideoArea>
                    <AreaHeader>
                        <CountDown>{message}</CountDown>
                    </AreaHeader>
                    <Pose setKeypointsDetected={setKeypointsDetected} />
                    <AreaFooter>
                        <KeyPointCount>신뢰도0.4이상 keypoints:{keypointsDetected}개</KeyPointCount>
                        <KeyPointPercent>({keypointsPercent.toFixed(2)}%)</KeyPointPercent>
                    </AreaFooter>
                </VideoArea>
            </Main>
            <Bottom></Bottom>
        </>
    );
};

const Top = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Icon = styled.div`
    width: 200px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    height: 100px; // 아이콘의 크기를 조정하려면 이 값을 변경하세요.
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.color};
    color: white;
    border-radius: 10px;
`;

const Main = styled.div`
    display: flex;
    flex: 1;
`;

// 강조 효과를 위한 스타일 컴포넌트와 애니메이션
const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
`;

const CountDown = styled.div`
    /* position: absolute;
    top: 12;
    left: 50%; */
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: red;
    animation: ${pulse} 1s linear infinite;
`;

const DancingArea = styled.div`
    flex: 1;
`;

const VideoArea = styled.div`
    flex: 1;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
`;

const VideoWrapper = styled.div`
    height: 70%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AreaHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px; // 필요한 높이로 조정하세요.
`;

const AreaFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px; // 필요한 높이로 조정하세요.
`;

const KeyPointCount = styled.div`
    color: red;
    font-size: 30px;
`;
const KeyPointPercent = styled.div`
    color: green;
    font-size: 20px;
`;
// 게이지 차는 효과를 보이게 하기 위한 애니메이션
const progress = keyframes`
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
`;

const Bottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 150px; // 필요한 높이로 조정하세요.
    background: linear-gradient(270deg, yellow, lime, blue, magenta);
    background-size: 200% 200%;
    animation: ${progress} 10s ease-in-out infinite;
    border-radius: 20px;
`;

const Img = styled.img`
    width: 70px;
    height: 120px;
    object-fit: cover;
`;

export default Test;
