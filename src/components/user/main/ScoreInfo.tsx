import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

export default function ScoreInfo({ gamehistoryDates }: ScoreInfoProps) {
    const formatDate = (value: string) => {
        const date = new Date(value);
        const year = date.getFullYear().toString().slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        return `${year}/${month}/${day}`;
    };

    return (
        <Container>
            <GraphContainer>
                <ResponsiveContainer width="90%" height="80%">
                    <LineChart data={gamehistoryDates}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="music_score_created_at" />
                        <YAxis />
                        <Tooltip
                            labelFormatter={(label) => `Date: ${formatDate(label)}`}
                            contentStyle={{ color: '#ff69b4' }}
                            formatter={(value, name) => (name === 'music_score_created_at' ? formatDate(value) : value)}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="music_score" name="Score" stroke="#ff69b4" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </GraphContainer>
            <BestScoreContainer>
                <h1>Best Score</h1>
            </BestScoreContainer>
        </Container>
    );
}

interface ScoreInfoProps {
    gamehistoryDates: {
        music_score: number;
        music_score_created_at: Date;
    }[];
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
    padding: 1rem 2rem;
`;
