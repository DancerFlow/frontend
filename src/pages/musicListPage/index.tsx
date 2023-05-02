import styled from 'styled-components';
import Header from './header/Header';
import Filter from './filter/Filter';
import Content from './content/Content';

const MusicListPage = () => {
    return (
        <Wrapper>
            <Header></Header>
            <Filter />
            <Content />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    background: #2a1e57;
`;

export default MusicListPage;
