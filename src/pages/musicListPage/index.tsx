import styled from 'styled-components';
import Header from './components/Header';
import Filter from './components/Filter';
import Content from './components/Content';

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
