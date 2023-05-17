import styled from 'styled-components';
import { Music } from '../../interface';

export default function MusicInfo({ musicDetail }: { musicDetail: Music | undefined }) {
    console.log('RankInfoMusic', musicDetail);

    return (
        <Section>
            {musicDetail && (
                <>
                    <Img src={musicDetail.album_image_url}></Img>
                    <div>
                        <Title>{musicDetail.name}</Title>
                        <Singer>{musicDetail.music_singer?.name}</Singer>
                    </div>
                </>
            )}
        </Section>
    );
}

const Section = styled.section`
    display: flex;
    width: 400px;
    margin-top: 3rem;
    align-items: center;

    div {
        text-align: start;
        margin-left: 0.5rem;
    }
`;

const Img = styled.img`
    width: 7rem;
    height: auto;
    border-radius: 50%;
`;

const Title = styled.div`
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`;

const Singer = styled.div`
    font-size: 1rem;
    margin-bottom: 3rem;
`;
