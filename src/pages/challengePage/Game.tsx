import { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Pose from './Pose';
import video_9th from '../../assets/lovemelikethis.mp4';
import countdownVideo from '../../assets/countdown.mp4';
import video_10th from '../../assets/춤예시.mp4';
import { useGetGameDataQuery } from '../../api/useGetGameDataQuery';
import Marquee from 'react-fast-marquee';

const Game = () => {
    const [keypointsDetected, setKeypointsDetected] = useState(0);
    const [startCountdown, setStartCountdown] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [volume, setVolume] = useState(0.2); // 초기 볼륨을 100%로 설정
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0); // 비디오의 총 길이를 저장할 상태

    const videoRef = useRef<HTMLVideoElement>(null);
    const countDownVideoRef = useRef<HTMLVideoElement>(null);
    const keypointsPercent = Math.min((keypointsDetected / 17) * 100, 100);
    const minKeypointsCount = 10; // 최소 검출되어야하는 keypoints의 수

    const { data: gameData } = useGetGameDataQuery(9);

    // * videoRef의 실행되는 이펙트
    useEffect(() => {
        if (!countDownVideoRef.current) return;
        if (!videoRef.current) return;
        if (gameStart) return;

        if (keypointsDetected < minKeypointsCount) {
            countDownVideoRef.current.currentTime = 0;
            countDownVideoRef.current.pause();
            setStartCountdown(false);
        } else if (keypointsDetected >= minKeypointsCount) {
            setStartCountdown(true); // Start the countdown
            countDownVideoRef.current.play();
        }
    }, [keypointsDetected, startCountdown]);

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

    const handleCountdownTimeUpdate = (e) => {
        if (!countDownVideoRef.current) return;
        if (!videoRef.current) return;
        if (countDownVideoRef.current.ended && videoRef.current.currentTime === 0) {
            console.log('gamestart');
            videoRef.current.play();
            setGameStart(true);
        }
    };

    // Bottom의 width를 계산하는 함수
    const getBottomWidth = () => {
        if (!duration) {
            return '0%';
        }
        const percentage = (currentTime / duration) * 100;
        return `${percentage}%`;
    };

    return (
        <>
            <Main>
                <VideoArea>
                    <VideoWrapper>
                        {gameData && (
                            <div>
                                {!gameStart && (
                                    <video
                                        className="countdown-video"
                                        src={countdownVideo}
                                        onTimeUpdate={handleCountdownTimeUpdate}
                                        loop={false}
                                        ref={countDownVideoRef}
                                    />
                                )}
                                <video
                                    className="answer-video"
                                    ref={videoRef}
                                    src={video_9th}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onTimeUpdate={handleTimeUpdate}
                                    loop={false}
                                    style={{}}
                                />
                            </div>
                        )}
                    </VideoWrapper>
                    {/* <AreaFooter>
                        볼륨:
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01" // 볼륨 조절의 정밀도를 1%로 설정
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </AreaFooter> */}
                </VideoArea>
                <AreaHeader>
                    {!gameStart && (
                        <>
                            <GameManual>
                                <p>! Game Manual !</p>
                                <div>
                                    <div>1 </div>
                                    <span>
                                        웹캠이 정상적으로 연결되었는지
                                        <br /> 확인해주세요
                                    </span>
                                    <div>2 </div>
                                    <span>
                                        웹캠 화면에 한명만 있어야 정확한
                                        <br /> 인식이 가능합니다
                                    </span>
                                    <div>3 </div>
                                    <span>
                                        머리부터 발끝까지 전부 나올 수 있을
                                        <br /> 만큼 거리를 벌려주세요
                                    </span>
                                </div>
                            </GameManual>
                            <KeyPointPercent>({keypointsPercent.toFixed(1)}%)</KeyPointPercent>
                        </>
                    )}
                    {!startCountdown && <Marquee autoFill={true}>{`전신이 나오도록 위치해주세요!`}&nbsp; &nbsp; &nbsp; &nbsp;</Marquee>}
                </AreaHeader>
                <DancingArea>
                    <Pose setKeypointsDetected={setKeypointsDetected} currentTime={currentTime} ref={videoRef} />
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

const DancingArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 3;
`;
const VideoArea = styled.div`
    background-color: black;
`;
const VideoWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .answer-video {
        width: 100%;
        height: 100%;
        object-fit: contain; // 비디오의 비율을 유지하면서 VideoWrapper에 맞게 조절합니다.
    }

    .countdown-video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
        height: 100vh;
        object-fit: fill;
        z-index: 1;
    }
`;
const AreaHeader = styled.div`
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100vw;
    height: 100vh; // 필요한 높이로 조정하세요.
    .marquee-container {
        position: absolute;
        bottom: 50px;
        background-color: ${(props) => props.theme.blue};
        padding: 24px 0;
        transform: skew(-6deg);
        font-size: 1.6rem;
        color: #fefd1e;
    }
`;

const KeyPointCount = styled.div`
    color: red;
    font-size: 30px;
`;
const KeyPointPercent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${(props) => props.theme.green};
    font-size: 60px;
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

const ConfirmKeyframes = keyframes`
    0%{
        top: 90%;
        transform: translate(-50%, -50%);
    }

    100%{
        top: 20%;
        transform: translate(-50%, -50%);
    }
`;

const GameManual = styled.div`
    z-index: 99;
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 1030px;
    height: 180px;
    padding: 0 20px 0 20px;
    background-color: ${(props) => props.theme.green};
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${ConfirmKeyframes} 0.5s ease-out 0s 1;
    align-items: center;
    font-family: 'NanumSquareNeoBold';
    transition: 0.3s ease-out;
    p {
        font-size: 30px;
        padding: 30px 0px;
        font-family: 'NanumSquareNeoHeavy';
    }
    div {
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
            width: 270px;
            margin-right: 10px;
            line-height: 1.4;
        }
        div {
            width: 40px;
            height: 40px;
            background-color: white;
            line-height: 40px;
            margin-left: 30px;
            border-radius: 40px;
            transition: transform 0.5s;
            justify-content: center;
            cursor: pointer;
        }
    }
`;

export default Game;
