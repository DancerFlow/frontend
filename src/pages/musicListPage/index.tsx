import styled from 'styled-components';
import Header from '../../components/musicList/header/Header';
import Filter from '../../components/musicList/filter/Filter';
import Content from '../../components/musicList/content/';
import { useEffect, useState } from 'react';
import { useGetMusicListQuery } from '../../api/useGetMusicListQuery';
import { Music } from '../../interface';
const MusicListPage = () => {
    const [musicList, setMusicList] = useState<Music[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleClick = (item: string): void => {
        setSelectedFilter(item);
    };
    const musicData = useGetMusicListQuery();
    useEffect(() => {
        setMusicList(musicData);
    }, []);
    return (
        <Wrapper>
            <Header></Header>
            <Filter handleClick={handleClick} selected={selectedFilter} />
            <Content musicList={musicList} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    background: #2a1e57;
`;

export default MusicListPage;
