import styled from 'styled-components';
import Header from '../../components/musicList/header/Header';
import Filter from '../../components/musicList/filter/Filter';
import Content from '../../components/musicList/content/';
import { useState } from 'react';
import { useGetMusicListQuery } from '../../api/useGetMusicListQuery';

const MusicListPage = () => {
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleClick = (item: string): void => {
        setSelectedFilter(item);
    };
    const { isLoading, error, data } = useGetMusicListQuery();
    console.log(isLoading, error, data); //false, null, 데이터 (api 요청 성공)
    return (
        <Wrapper>
            <Header></Header>
            <Filter handleClick={handleClick} selected={selectedFilter} />
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
