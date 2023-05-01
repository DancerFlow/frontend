import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Header = () => {
    return (
        <Wrapper>
            <ImageWrapper>
                <ImageContainer>
                    <Image src="/img/slideImg1.png" alt="Image 1" />
                </ImageContainer>
                <ImageContainer>
                    <Image src="/img/slideImg2.png" alt="Image 2" />
                </ImageContainer>
                <ImageContainer>
                    <Image src="/img/slideImg3.png" alt="Image 3" />
                </ImageContainer>
            </ImageWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 30%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
`;

const Image = styled.img`
    width: 100%;
    height: 80%;
`;

const ImageContainer = styled.div`
    width: 33%;
    margin-right: 20px;
`;

export default Header;
