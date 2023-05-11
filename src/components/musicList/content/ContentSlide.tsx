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
        opacity: 0.8,
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
const ContentSlide = ({ onMusicClick, musicList, onModalClose, musicSearchList }: ModalFrameProps) => {
    const [isDragged, setIsDragged] = useState(false);
    const settings: Settings = {
        dots: true,
        className: 'center',
        centerMode: false,
        infinite: musicList.length > 5 ? true : false,
        centerPadding: '60px',
        slidesToShow: 5,
        speed: 800,
        rows: musicList.length > 4 ? 3 : 1,
        slidesToScroll: 5,
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
            <Slider {...settings}>
                {(musicSearchList && musicSearchList.length > 0 ? musicSearchList : musicList).map((data: Music, idx) => {
                    return (
                        <MusicWrap key={`${data.id}-${data.name}`}>
                            <MusicCard
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
                                    <h1>{data.name}</h1>
                                    <h4>{data.music_singer.name}</h4>
                                </MusicInfo>
                            </MusicCard>
                        </MusicWrap>
                    );
                })}
            </Slider>
        </MusicListWrap>
    );
};

const MusicListWrap = styled.div`
    width: 71%;
    height: 100%;

    /* margin-top: 20px; */
`;

const CustomArrow = styled.div`
    font-size: 50px;
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 11100;
    transform: translateY(-50%);

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

const MusicWrap = styled.div`
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
const MusicCard = styled(motion.div)<{ img: string }>`
    width: calc(100% - 40px);
    height: 25vh;
    max-width: 250px;
    max-height: 250px;
    background-color: white;
    border-radius: 10px;
    margin: 15px;
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-position: center center;
    position: relative;

    cursor: pointer;
    &:hover {
        box-shadow: ${(props) => props.theme.pink} 0px 5px 15px;
    }
`;

const MusicInfo = styled(motion.div)`
    padding: 20px;
    background-color: ${(props) => props.theme.pink};
    opacity: 0;
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 15%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    cursor: pointer;

    h1 {
        text-align: center;
        font-size: 15px;
        color: ${(props) => props.theme.yellow};
        font-weight: 700;
        z-index: 99;
        margin-bottom: 5px;
        @media screen and (max-width: 1500px) {
            font-size: 15px;
        }
    }

    h4 {
        text-align: center;
        font-size: 13px;
        color: ${(props) => props.theme.blue};
        font-weight: 700;
        @media screen and (max-width: 1500px) {
            font-size: 10px;
        }
    }
`;

export default ContentSlide;
