import styled from 'styled-components';
import Filter from '../../components/musicList/Filter';
import Content from '../../components/musicList/content/';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useGetMusicListQuery } from '../../api/useGetMusicListQuery';

import { Music } from '../../interface';
import LaserAnimation from '../../hooks/LazerAnimation';
export enum FilterType {
    Popular = 'popular',
    Latest = 'latest',
    Favorite = 'favorite'
}
const MusicListPage = () => {
    const { isLoading, error, data } = useGetMusicListQuery({
        onSuccess: (data: Music[]) => {
            setMusicList(data);
        },
        onError: (error: string) => {
            console.log(error);
        }
    });
    const [musicList, setMusicList] = useState<Music[]>([]);
    const [selectedFilter, setSelectedFilter] = useState(FilterType.Popular);

    const handleClick = (item: FilterType): void => {
        setSelectedFilter(item);
    };

    return (
        <Wrapper>
            <LaserAnimation />
            <Filter handleClick={handleClick} selected={selectedFilter} />
            <Content musicList={musicList} />
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
