import styled from 'styled-components';
import ContentSlide from './ContentSlide';

const Content = () => {
    return (
        <Wrapper>
            <ContentSlide />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Content;
