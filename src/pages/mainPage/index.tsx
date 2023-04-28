import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:500px;
    height:500px;
    background-color: ${(props) => props.theme.bgColor};
`;

const MainPage = () => {
    return <Container>메인됩니까요?</Container>;
};

export default MainPage;
