import styled from 'styled-components';
import { Music } from '../../interface';

export default function MusicInfo({ musicDetail }: { musicDetail: Music | undefined }) {
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

const Section = styled.div`
    display: flex;
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
    font-size: 1.2rem;
`;

const Singer = styled.div`
    font-size: 0.9rem;
    margin-top: 8px;
`;
