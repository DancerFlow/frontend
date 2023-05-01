import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import fakeData from '../data.json';

import { useState } from 'react';

interface ISettings {
    className: string;
    centerMode: boolean;
    infinite: boolean;
    centerPadding: string;
    slidesToShow: number;
    speed: number;
    rows: number;
    slidesPerRow: number;
}

const ContentSlide = () => {
    const settings: ISettings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 500,
        rows: 2,
        slidesPerRow: 1
    };
    return (
        <>
            <MusicListWrap>
                <SliderWrap>
                    <Slider {...settings}>
                        {fakeData.map((data) => {
                            return (
                                <MusicWrap>
                                    <Music img={data.img}>{data.title}</Music>
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

const Music = styled.div<{img:string}>`
    width: 250px;
    height: 250px;
    background-color: white;
    border-radius: 10px;
    margin: 15px;
    background-image: url(${(props) => props.img});
    background-size: cover;
    background-position: center center;
`;

export default ContentSlide;
