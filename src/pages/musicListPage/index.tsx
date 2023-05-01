import styled from 'styled-components';
import Header from './components/Header';
import Filter from './components/Filter';

const ContentWrap = styled.div`
    height: 55%;
    background-color: yellow;
`;

const MusicListPage = () => {
    return (
        <Wrapper>
            <Header></Header>
            <Filter />
            <ContentWrap />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    background: #2a1e57;
`;

export default MusicListPage;
