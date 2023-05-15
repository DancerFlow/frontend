import styled from 'styled-components';
import Score from './Score';

const ScoreExtraction = () => {
    return (
        <>
            <Main>
                <VideoArea>
                    <Score />
                </VideoArea>
            </Main>
        </>
    );
};

const Main = styled.div`
    display: flex;
    flex: 1;
`;

const VideoArea = styled.div`
    flex: 1;
`;

export default ScoreExtraction;
