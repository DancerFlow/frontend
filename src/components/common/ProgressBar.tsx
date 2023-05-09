import styled, { keyframes } from 'styled-components';

interface ProgressBarProps {
    progress: number;
    height: number;
}

export default function ProgressBar({ progress, height }: ProgressBarProps) {
    return (
        <>
            <Container height={height}>
                <Fill progress={progress}></Fill>
            </Container>
        </>
    );
}

const Container = styled.div<{ height: number }>`
    height: ${(props) => props.height}px;
    width: 100%;
    background-color: rgba(254, 35, 255, 0.5);
    border: 1px solid #fff;
    border-radius: 5rem;
    overflow: hidden;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    margin: 2px 0;
`;

const fillAnimation = (progress: number) => keyframes`
    from {
        width: 0%;
    }

    to {
        width: ${progress}%;
    }
`;

const Fill = styled.div<{ progress: number }>`
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color: ${(props) => props.theme.pink};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-right: none;
    border-radius: 5rem;
    text-align: start;
    padding-left: 1rem;
    animation: ${(props) => fillAnimation(props.progress)} 600ms ease-in-out;
`;
