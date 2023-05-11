import styled from 'styled-components';
import Filter from '../../components/musicList/filter/Filter';
import Content from '../../components/musicList/content/';
import { useState } from 'react';
import { useGetMusicListQuery } from '../../api/useGetMusicListQuery';

import { Music } from '../../interface';
import LaserAnimation from '../../hooks/LazerAnimation';
import { useGetMusicSearchQuery } from '../../api/useGetMusicSearchQuery';

export enum FilterType {
    Popular = 'popular',
    Latest = 'latest',
    Favorite = 'favorite'
}

const MusicListPage = () => {
    const [selectedFilter, setSelectedFilter] = useState(FilterType.Popular);
    const [searchMusic, setSearchMusic] = useState<Music>();

    const { isLoading: musicSearchLoading, data: musicSearchList } = useGetMusicSearchQuery(searchMusic);

    const {
        isLoading,
        error,
        data: musicList
    } = useGetMusicListQuery(selectedFilter, {
        onSuccess: (data: Music[]) => {},
        onError: (error: string) => {
            console.log(error);
        }
    });

    const handleClick = (item: FilterType): void => {
        setSelectedFilter(item);
        setSearchMusic(undefined);
    };

    const handleSearch = (keyword: string): void => {
        setSearchMusic(keyword);
        setSelectedFilter('');
    };

    return (
        <Wrapper>
            <LaserAnimation />
            <Filter onFilter={handleClick} selected={selectedFilter} onSearch={handleSearch} />
            {musicSearchLoading || isLoading ? (
                null
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <Content musicList={musicList} musicSearchList={musicSearchList} />
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
    width: 100%;
    background: #2a1e57;
    position: relative;
`;

export default MusicListPage;
