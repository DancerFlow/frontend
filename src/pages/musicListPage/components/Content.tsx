import styled from 'styled-components';

const Content = () => {
    return (
        <Wrapper>
            <MusicListWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
                <MusicWrap>
                    <Music />
                </MusicWrap>
            </MusicListWrap>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MusicListWrap = styled.div`
    width: 65%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;
const MusicWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Music = styled.div`
    width: 215px;
    height: 230px;
    background-color: white;
    border-radius: 10px;
    margin: 15px;
`;

const MusicImg = styled.div``;

const MusicInfo = styled.div``;

export default Content;
