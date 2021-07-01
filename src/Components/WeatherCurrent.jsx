import React from "react";
import styled from 'styled-components/macro';

const WeatherCurrent = ({ datas }) => {
    return (
        <CurrentCard>
            <p>{datas.current.temp}</p>
        </CurrentCard>
    );
};

const CurrentCard = styled.div`
    padding: 3rem;
    margin: 1rem auto;
    width: 25vw;
`;

export default WeatherCurrent;
