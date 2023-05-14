import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { useGetGameHistoryDetailQuery } from '../../../api/useGetGameHistoryDetailQuery';

export default function ScoreInfo({ musicId }: { musicId: number }) {
    const { data: gamehistorydetail, isLoading, isError } = useGetGameHistoryDetailQuery(musicId);

    const formatDate = (value: string) => {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString('en-US', { timeZone: 'UTC' });
        return formattedDate;
    };

    if (isLoading) {
        return <Container>is loading...</Container>;
    }

    if (isError) {
        return <Container>error loading data...</Container>;
    }

    return (
        <Container>
            <GraphContainer>
                <ResponsiveContainer width="90%" height="80%">
                    <LineChart data={gamehistorydetail?.music_score_list}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="music_score_created_at" label={{ value: 'Date', position: 'insideBottom' }} tick={false} />
                        <YAxis />
                        <Tooltip
                            labelFormatter={(label) => `Date: ${formatDate(label)}`}
                            contentStyle={{ color: '#ff69b4' }}
                            formatter={(value, name) => (name === 'music_score_created_at' ? formatDate(String(value)) : value)}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="music_score" name="Score" stroke="#ff69b4" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </GraphContainer>
            <BestScoreContainer>
                <h1>Best Score</h1>
                <ScoreDetail>
                    <MyScoreRank>
                        <div>
                            My Best Score: {gamehistorydetail?.music_best_score_detail?.score}/{gamehistorydetail?.music_total_score}
                        </div>
                        <div>
                            <p>My Rank: {gamehistorydetail?.music_best_score_detail?.rank}</p>
                        </div>
                    </MyScoreRank>
                    <Scoring>Perfect: {gamehistorydetail?.music_best_score_detail?.perfect}</Scoring>
                    <Scoring>Good: {gamehistorydetail?.music_best_score_detail?.good}</Scoring>
                    <Scoring>Miss: {gamehistorydetail?.music_best_score_detail?.miss}</Scoring>
                </ScoreDetail>
            </BestScoreContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex: 1.8;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    border: solid 2px ${(props) => props.theme.pink};
`;

const GraphContainer = styled.div`
    display: flex;
    flex: 1.3;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    padding-right: 1.2rem;
`;

const BestScoreContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 1rem 2rem;
    padding: 1rem 0;

    h1 {
        margin-bottom: 1rem;
    }
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.pink};
    /* background-color: ${(props) => props.theme.green}; */
`;

const ScoreDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MyScoreRank = styled.div`
    margin: 1rem;
    text-align: start;

    div {
        padding-bottom: 0.5rem;
    }
`;

const Scoring = styled.div`
    margin: 0 0 1rem 1rem;
`;
