import styled from 'styled-components';
import Header from './components/Header';

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    background: #2a1e57;
`;

const FilterWrap = styled.div`
    height: 5%;
    width: 100%;
    background-color: orange;
`;

const ContentWrap = styled.div`
    height: 55%;
    background-color: yellow;
`;

const MusicListPage = () => {
    return (
        <Wrapper>
            <Header></Header>
            <FilterWrap />
            <ContentWrap />
        </Wrapper>
    );
};

export default MusicListPage;
