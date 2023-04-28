import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchExample } from '../../api';
const Container = styled.div`
    width: 500px;
    height: 500px;
    background-color: ${(props) => props.theme.bgColor};
`;

interface IExample {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const MainPage = () => {
    const { isLoading, data } = useQuery<IExample[]>(['key ', 'example'], fetchExample);
    console.log(data?.slice(0, 100));

    return <Container>메인됩니까요?</Container>;
};

export default MainPage;
