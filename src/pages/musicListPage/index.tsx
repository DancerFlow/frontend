import styled from 'styled-components';
import Filter from '../../components/musicList/Filter';
import Content from '../../components/musicList/content/';
import { useState } from 'react';
import { useGetMusicListQuery } from '../../api/useGetMusicListQuery';

import { Music } from '../../interface';
import LaserAnimation from '../../hooks/LazerAnimation';
export enum FilterType {
    Popular = 'popular',
    Latest = 'latest',
    Favorite = 'favorite'
}
const MusicListPage = () => {
    const [selectedFilter, setSelectedFilter] = useState(FilterType.Popular);

    const { isLoading, error, data } = useGetMusicListQuery(selectedFilter, {
        onSuccess: (data: Music[]) => {
            console.log(data);
        },
        onError: (error: string) => {
            console.log(error);
        }
    });

    const handleClick = (item: FilterType): void => {
        setSelectedFilter(item);
    };

    console.log(selectedFilter);
    return (
        <Wrapper>
            <LaserAnimation />
            <Filter handleClick={handleClick} selected={selectedFilter} />
            {isLoading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : <Content musicList={data} />}
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
