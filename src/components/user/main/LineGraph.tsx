import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

export default function LineGraph() {
    return (
        <Container>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#ff69b4" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
}

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    padding-right: 1.2rem;
`;

const historyData = [
    { name: 'Jan', value: 150 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 }
    // { name: 'Apr', value: 400 },
    // { name: 'May', value: 250 },
    // { name: 'Jun', value: 500 },
    // { name: 'Jul', value: 350 },
    // { name: 'Aug', value: 450 },
    // { name: 'Sep', value: 300 },
    // { name: 'Oct', value: 550 },
    // { name: 'Nov', value: 400 },
    // { name: 'Dec', value: 600 }
];
