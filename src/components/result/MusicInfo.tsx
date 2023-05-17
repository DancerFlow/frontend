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
                        <div>{musicDetail.music_singer?.name}</div>
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

    div {
        text-align: start;
        margin-left: 0.5rem;
    }
`;

const Img = styled.img`
    width: 6rem;
    height: auto;
`;

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;
