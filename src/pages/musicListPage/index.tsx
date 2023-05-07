import styled from 'styled-components';
import Header from '../../components/musicList/header/Header';
import Filter from '../../components/musicList/filter/Filter';
import Content from '../../components/musicList/content/';
import { useEffect, useState } from 'react';
import { useGetMusicLikesQuery, useGetMusicLatestQuery, useGetMusicIsLikeQuery } from '../../api/useGetMusicListQuery';
import { Music } from '../../interface';
const MusicListPage = () => {
    const [musicList, setMusicList] = useState<Music[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('popular');

    const handleClick = (item: string): void => {
        setSelectedFilter(item);
    };
    const musicLikes = useGetMusicLikesQuery();
    const musicLatest = useGetMusicLatestQuery();
    const musicIsLike = useGetMusicIsLikeQuery();

    useEffect(() => {
        if (selectedFilter === 'popular') {
            setMusicList(musicLikes);
        } else if (selectedFilter === 'latest') {
            setMusicList(musicLatest);
        } else if (selectedFilter === 'favorite') {
            setMusicList(musicIsLike);
        }
    }, [selectedFilter]);

    return (
        <Wrapper>
            {/* <Header></Header> */}
            <Filter handleClick={handleClick} selected={selectedFilter} />
            <Content musicList={musicList} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
<<<<<<< HEAD
    /* background: #2a1e57; */
    background: #000;
=======


    background: #2a1e57;
>>>>>>> upstream/dev
`;

export default MusicListPage;
