import styled from 'styled-components';
import Filter from '../../components/musicList/Filter';
import Content from '../../components/musicList/content/';
import { useEffect, useState } from 'react';
import { useGetMusicLikesQuery, useGetMusicLatestQuery, useGetMusicIsLikeQuery } from '../../api/useGetMusicListQuery';
import { Music } from '../../interface';

export enum FilterType {
    Popular = 'popular',
    Latest = 'latest',
    Favorite = 'favorite'
}
const MusicListPage = () => {
    const [musicList, setMusicList] = useState<Music[]>([]);
    const [selectedFilter, setSelectedFilter] = useState(FilterType.Popular);

    const handleClick = (item: FilterType): void => {
        setSelectedFilter(item);
    };
    const musicLikes = useGetMusicLikesQuery();
    const musicLatest = useGetMusicLatestQuery();
    const musicIsLike = useGetMusicIsLikeQuery();

    useEffect(() => {
        if (selectedFilter === FilterType.Popular) {
            setMusicList(musicLikes);
        } else if (selectedFilter === FilterType.Latest) {
            setMusicList(musicLatest);
        } else if (selectedFilter === FilterType.Favorite) {
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
    background: #2a1e57;
`;

export default MusicListPage;
