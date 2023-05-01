import styled from 'styled-components';
import Slider from 'react-slick';

import { useState } from 'react';
import fakeData from '../data.json';

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
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const ContentSlide = () => {
    return (
        <MusicListWrap>
            <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </MusicListWrap>
    );
};

const MusicListWrap = styled.div`
    width: 80%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;
const MusicWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Music = styled.div`
    width: 215px;
    height: 230px;
    background-color: white;
    border-radius: 10px;
    margin: 15px;
`;
export default ContentSlide;
