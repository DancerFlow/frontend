import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Pose from './Pose';
import fearless from '../../assets/fearless.mp4';
import 춤예시 from '../../assets/춤예시.mp4';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetGameDataQuery } from '../../api/useGetGameDataQuery';

const Game = () => {
    const [keypointsDetected, setKeypointsDetected] = useState(0);
    const [countDown, setCountDown] = useState(5);
    const [message, setMessage] = useState('전신이 나오도록 위치해주세요.');
    const [startCountdown, setStartCountdown] = useState(false);
    const [volume, setVolume] = useState(0.5); // 초기 볼륨을 100%로 설정
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0); // 비디오의 총 길이를 저장할 상태
    const [playTest, setPlayTest] = useState(false); // 테스트용

    const [answer, setAnswer] = useState(0); // 정답을 저장할 상태
    const videoRef = useRef(null);
    const keypointsPercent = Math.min((keypointsDetected / 17) * 100, 100);
    const minKeypointsCount = 10; // 최소 검출되어야하는 keypoints의 수

    const navigate = useNavigate();
    const { musicId } = useParams();

    const { data: gameData } = useGetGameDataQuery(9);

    // * 비디오가 정지되었을 때 실행되는 이펙트
    const playVideoInChunks = () => {
        if (playTest && videoRef.current) {
            videoRef.current.play(); // 비디오 재생 시작

            // 1초 후에 비디오 일시정지
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.pause(); // 비디오 일시정지
                    setPlayTest(false);
                    console.log(videoRef.current.currentTime, '동영상이 멈췄을때 재생시간'); // 동영상이 멈췄을 때의 재생시간
                    setAnswer(Math.round(videoRef.current.currentTime)); // 정답을 저장
                }
            }, 1000);
        }
    };

    useEffect(() => {
        let timerId;

        timerId = setInterval(playVideoInChunks, 500); // 0.5초마다 playVideoInChunks 함수를 실행합니다.

        return () => {
            if (timerId) {
                clearInterval(timerId); // 컴포넌트가 언마운트되거나 의존성이 바뀔 때 타이머를 제거
            }
        };
    }, [playTest]); // 이 useEffect는 "조건"이 바뀔 때마다 다시 실행됩니다.

    // * videoRef의 currentTime이 바뀔 때마다 실행되는 이펙트
    useEffect(() => {
        let timerId; // 타이머 ID를 저장할 변수

        if (keypointsDetected < minKeypointsCount && !startCountdown) {
            setMessage('전신이 나오도록 위치해주세요.');
            setCountDown(3); // Reset the countdown
        } else if (keypointsDetected >= minKeypointsCount) {
            setStartCountdown(true); // Start the countdown
            setMessage(countDown > 0 ? countDown : 'Dance!');
            if (countDown > 0) {
                timerId = setTimeout(() => setCountDown(countDown - 1), 1000); // 타이머 ID를 저장
            }
            if (countDown === 0 && videoRef.current) {
                videoRef.current.loop = false; // 동영상이 한 번만 재생되도록 loop를 false로 설정
                videoRef.current.play();
            }
        }

        return () => {
            if (timerId) {
                clearTimeout(timerId); // 컴포넌트가 언마운트되거나 의존성이 바뀔 때 타이머를 제거
            }
        };
    }, [keypointsDetected, countDown, startCountdown]);

    // * volume이 바뀔 때마다 실행되는 이펙트
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
        }
    }, [volume]);

    const handleVolumeChange = (e) => {
        setVolume(e.target.value); // 슬라이더의 값이 바뀔 때마다 볼륨 상태를 갱신
    };

    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime); // 비디오의 현재 재생 시간을 갱신
    };

    const handleLoadedMetadata = (e) => {
        setDuration(e.target.duration); // 비디오의 총 길이를 갱신
    };

    // Bottom의 width를 계산하는 함수
    const getBottomWidth = () => {
        if (!duration) {
            return '0%';
        }
        const percentage = (currentTime / duration) * 100;
        return `${percentage}%`;
    };
    console.log(answer, '정답');
    return (
        <>
            <Main>
                <VideoArea>
                    <AreaHeader></AreaHeader>
                    <VideoWrapper>
                        {gameData && (
                            <video
                                className="answer-video"
                                ref={videoRef}
                                src={fearless}
                                onLoadedMetadata={handleLoadedMetadata}
                                onTimeUpdate={handleTimeUpdate}
                                style={{
                                    maxWidth: '100%', // 비디오가 VideoWrapper의 너비를 넘지 않도록 합니다.
                                    maxHeight: '100%', // 비디오가 VideoWrapper의 높이를 넘지 않도록 합니다.
                                    objectFit: 'contain' // 비디오의 비율을 유지하면서 VideoWrapper에 맞게 조절합니다.
                                }}
                            />
                        )}
                    </VideoWrapper>
                    <AreaFooter>
                        볼륨:
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01" // 볼륨 조절의 정밀도를 1%로 설정
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </AreaFooter>
                </VideoArea>

                <DancingArea>
                    <AreaHeader>
                        <CountDown>{`${message}`}</CountDown>
                    </AreaHeader>
                    <Pose setKeypointsDetected={setKeypointsDetected} currentTime={currentTime} ref={videoRef} />
                    <AreaFooter>
                        <KeyPointCount>신뢰도0.4이상 keypoints:{keypointsDetected}개</KeyPointCount>
                        <KeyPointPercent>({keypointsPercent.toFixed(2)}%)</KeyPointPercent>
                        <button
                            onClick={() => {
                                setPlayTest(!playTest);
                            }}
                        >
                            테스트
                        </button>
                    </AreaFooter>
                </DancingArea>
            </Main>
            <Bottom style={{ width: getBottomWidth(), transition: 'width 0.5s ease' }}></Bottom>
        </>
    );
};

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
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: red;
    animation: ${pulse} 1s linear infinite;
`;

const VideoArea = styled.div`
    flex: 1;
    margin-left: 10px;
`;

const DancingArea = styled.div`
    flex: 1;
`;
const VideoWrapper = styled.div`
    height: 70vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
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
    height: 50px; // 필요한 높이로 조정하세요.
    background: linear-gradient(270deg, yellow, lime, blue, magenta);
    background-size: 200% 200%;
    animation: ${progress} 10s ease-in-out infinite;
    border-radius: 20px;
    transition: transform 0.5s ease; // width 대신 transform 속성에 전환 효과 적용

    transform: ${({ width }) => `translateX(-${100 - width}%)`}; // translateX를 사용하여 수평 위치 조절
`;

export default Game;
