import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { Music } from '../../../interface';
import { useKeyEscClose } from '../../common/useKeyEscClose';
import { useState } from 'react';
const musciVariants = {
    normal: {
        scale: 1
    },
    hover: {
        scale: 1.1,
        transistion: {
            delay: 2,
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
    onClickMusic: (e: any) => void;
    musicList: Music[];
    onKeyModalClose: (e: any) => void;
}

const ContentSlide = ({ onClickMusic, musicList, onKeyModalClose }: ModalFrameProps) => {
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

        appendDots: (dots: string) => (
            <div
                style={{
                    width: '100%',

                    position: 'absolute',
                    bottom: '-15px',
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
        onKeyModalClose(e);
    });

    return (
        <MusicListWrap>
            <Slider {...settings}>
                {musicList.map((data: Music, idx) => {
                    return (
                        <MusicWrap>
                            <Music
                                key={idx}
                                onClick={(e) => {
                                    if (!isDragged) {
                                        e.preventDefault();
                                        onClickMusic(e, data);
                                    }
                                }}
                                img={data.music_image_url}
                                whileHover="hover"
                                initial="normal"
                                variants={musciVariants}
                            >
                                <MusicInfo variants={musicInfoVariants}>
                                    <h1>{data.music_name}</h1>
                                    <h4>{data.music_singer}</h4>
                                </MusicInfo>
                            </Music>
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

const MusicWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 100%;
`;

const Music = styled(motion.div)<{ img: string }>`
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
