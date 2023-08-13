import styled from 'styled-components';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { Music } from '../../../interface';
import { useKeyEscClose } from '../../../hooks/useKeyEscClose';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const musicVariants = {
    normal: {
        scale: 1,
        transition: {
            delay: 2,
            type: 'tween'
        }
    },
    hover: {
        scale: 1.1,
        transition: {
            type: 'tween'
        }
    }
};

const musicInfoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0,
            type: 'tween'
        }
    }
};
interface ModalFrameProps {
    onMusicClick: (musicId: number) => void;
    musicList: Music[];
    onModalClose: (e: any) => void;
}

const PrevArrow = (props: CustomArrowProps) => (
    <CustomArrow className="prev" onClick={props.onClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
    </CustomArrow>
);

const NextArrow = (props: CustomArrowProps) => (
    <CustomArrow className="next" onClick={props.onClick}>
        <FontAwesomeIcon icon={faChevronRight} />
    </CustomArrow>
);
const ContentSlide = ({ onMusicClick, musicList, onModalClose }: ModalFrameProps) => {
    const [isDragged, setIsDragged] = useState(false);
    const settings: Settings = {
        dots: true,
        className: 'center',
        centerMode: false,
        infinite: musicList.length > 5 ? true : false,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 800,
        rows: musicList.length > 7 ? 3 : 2,
        slidesToScroll: 3,
        slidesPerRow: 1,
        touchThreshold: 200,
        beforeChange: () => {
            setIsDragged(true);
        },
        afterChange: () => {
            setIsDragged(false);
        },
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: (dots: string) => (
            <div
                style={{
                    width: '100%',
                    height: '4vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ul> {dots} </ul>
            </div>
        ),
        dotsClass: 'dots_custom'
    };

    useKeyEscClose((e: any) => {
        onModalClose(e);
    });

    return (
        <MusicListWrap>
            <StyledSlider {...settings}>
                {musicList &&
                    musicList.length > 0 &&
                    musicList.map((data: Music) => {
                        return (
                            <MusicCard
                                key={`${data.id}-${data.name}`}
                                onClick={(e) => {
                                    if (!isDragged) {
                                        e.preventDefault();
                                        onMusicClick(data.id);
                                    }
                                }}
                                img={data.album_image_url}
                                whileHover="hover"
                                initial="normal"
                                variants={musicVariants}
                            >
                                <MusicInfo variants={musicInfoVariants}>
                                    <div></div>
                                    <h1>{data.name}</h1>
                                    <h4>{data.music_singer.name}</h4>
                                </MusicInfo>
                            </MusicCard>
                        );
                    })}
            </StyledSlider>
        </MusicListWrap>
    );
};

const MusicListWrap = styled.div`
    width: 60%;
    height: 100%;
    position: relative;
    /* margin-top: 20px; */
`;

const StyledSlider = styled(Slider)`
    // 슬라이더의 스타일을 정의합니다.
    /* background-color: #ffffff10;
    box-shadow: 0 0 14px rgb(0, 0, 0);
    border-radius: 0px; */
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: sepia(40%);
    box-shadow: 1px 3px 7px 4px rgba(0, 0, 0, 0.3);
    padding: 5px;
`;

const CustomArrow = styled.div`
    font-size: 50px;
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
    cursor: pointer;
    &.prev {
        left: -40px;
    }

    &.next {
        right: -40px;
    }

    &:hover {
        color: ${(props) => props.theme.pink};
        filter: drop-shadow(0px 0px 20px ${(props) => props.theme.pink});
        border-radius: 50%;
    }
`;

const MusicCard = styled(motion.div)<{ img: string }>`
    width: 150px;
    height: 25vh;
    max-width: 250px;
    max-height: 250px;
    background-color: white;
    border-radius: 00px;
    margin: 10px;
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-position: center center;
    position: relative;

    cursor: pointer;
    &:hover {
        box-shadow: 0 0 14px rgb(0, 0, 0);
    }

    @media screen and (max-width: 1500px) {
        max-width: 190px;
    }
`;

const MusicInfo = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #3d3d3d9f;

    cursor: pointer;

    h1 {
        text-align: center;
        font-size: 15px;
        color: white;
        font-weight: 700;
        z-index: 99;
        margin-bottom: 5px;
        font-family: 'NanumSquareNeoExtraBold';
        @media screen and (max-width: 1500px) {
            font-size: 15px;
        }
    }

    h4 {
        text-align: center;
        font-size: 13px;
        color: ${(props) => props.theme.pink};
        font-family: 'NanumSquareNeoExtraBold';

        @media screen and (max-width: 1500px) {
            font-size: 10px;
        }
    }
`;

export default ContentSlide;
