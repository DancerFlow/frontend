import styled from 'styled-components';
import Filter from '../../components/musicList/filter/Filter';
import Content from '../../components/musicList/content/';
import { useState } from 'react';
import { useGetMusicListQuery } from '../../api/useGetMusicListQuery';
import { useGetMusicSearchQuery } from '../../api/useGetMusicSearchQuery';
import { useGetUserLikesQuery } from '../../api/useGetUserLikesQuery';

import { Music } from '../../interface';
import { UserLikes } from '../../interface';
import LaserAnimation from '../../hooks/LazerAnimation';

export enum FilterType {
    Popular = 'popular',
    Latest = 'latest',
    Like = 'isLiked'
}

const MusicListPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>(FilterType.Popular);
    const [inputValue, setInputValue] = useState('');
    const [searchMusic, setSearchMusic] = useState<Music | undefined>();

    // 전체 리스트 (좋아요, 최신순)
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

    // 이름 검색 리스트
    const { isLoading: musicSearchLoading, data: musicSearchList } = useGetMusicSearchQuery(searchMusic);

    // 찜한 목록 리스트
    const { isLoading: musicLikeLoading, data: userLikesList } = useGetUserLikesQuery(1);

    const handleSort = (item: FilterType): void => {
        setSelectedFilter(item);
        setSearchMusic(undefined);
    };

    const handleSearch = (keyword: string): void => {
        setSearchMusic(keyword);
        setSelectedFilter('');
    };

    // 찜한 목록 리스트를 musicList 형태로 변환
    const musicListForm = (data: UserLikes[]) => {
        return data.map((userLike) => {
            return {
                ...userLike.music,
                id: userLike.music.id,
                music_genre: userLike.music.music_genre,
                music_singer: {
                    id: userLike.music.music_singer.id,
                    name: userLike.music.music_singer.name
                },
                album_image_url: userLike.music.album_image_url
            };
        });
    };

    const musicIds = (data) => {
        if (data === undefined) {
            return []; // 또는 원하는 예외 처리 방식을 추가합니다.
        }
        return data.map((item) => item.music_id);
    };

    // 선택된 필터에 따라서 적절한 데이터를 가져옴
    let dataToShow;
    switch (selectedFilter) {
        case FilterType.Popular:
        case FilterType.Latest:
            dataToShow = musicList;
            break;
        case FilterType.Like:
            dataToShow = musicListForm(userLikesList);
            break;

        case inputValue:
            dataToShow = musicSearchList;
            break;
        default:
            dataToShow = [];
            break;
    }

    return (
        <Wrapper>
            <LaserAnimation />
            <Filter
                onFilter={handleSort}
                selected={selectedFilter}
                onSearch={handleSearch}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
            {musicSearchLoading || isLoading ? null : error ? (
                <div>Error: {error}</div>
            ) : (
                <Content musicList={dataToShow} likeMusicIds={musicIds(userLikesList)} />
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
