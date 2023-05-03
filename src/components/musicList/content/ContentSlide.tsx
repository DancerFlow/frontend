import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import { Music } from '../../../interface';

interface ISettings {
    dots: boolean;
    className: string;
    centerMode: boolean;
    infinite: boolean;
    centerPadding: string;
    slidesToShow: number;
    speed: number;
    rows: number;
    slidesPerRow: number;
    appendDots: (dots: any) => JSX.Element;
    dotsClass: string;
}

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
            type: 'tween'
        }
    }
};

interface ModalFrameProps {
    handleModal: () => void;
    musicList: Music[];
}

const ContentSlide = ({ handleModal, musicList }: ModalFrameProps) => {
    const settings: ISettings = {
        dots: true,
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 500,
        rows: musicList.length > 4 ? 2 : 1,
        slidesPerRow: 1,
        appendDots: (dots: any) => (
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

    return (
        <>
            <MusicListWrap>
                <SliderWrap>
                    <Slider {...settings}>
                        {musicList.map((data) => {
                            return (
                                <MusicWrap>
                                    <Music
                                        onClick={handleModal}
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
                </SliderWrap>
            </MusicListWrap>
        </>
    );
};

const MusicListWrap = styled.div`
    width: 51%;
    height: 100%;
    margin-top: 20px;
`;

const SliderWrap = styled.div`
    height: 100%;
`;
const MusicWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

const MusicInfo = styled(motion.div)`
    padding: 20px;
    background-color: ${(props) => props.theme.pink};
    opacity: 0.3;
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 15%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    h1 {
        text-align: center;
        font-size: 20px;
        color: ${(props) => props.theme.yellow};
        font-weight: 900;
        z-index: 99;
        margin-bottom: 5px;
        @media screen and (max-width: 1500px) {
            font-size: 15px;
        }
    }

    h4 {
        text-align: center;
        font-size: 15px;
        color: ${(props) => props.theme.blue};
        font-weight: 700;
        @media screen and (max-width: 1500px) {
            font-size: 10px;
        }
    }
`;

export default ContentSlide;
