import React from "react";
import styled from "styled-components/macro";

const WeatherCurrent = ({ datas }) => {
    return (
        <CurrentCard>
            <img
                src={`${process.env.REACT_APP_ICON_URL}/${datas.current.weather[0].icon}@2x.png`}
                alt="weather icon"
            />
            <p>Température actuelle : {Math.trunc(datas.current.temp)}°C</p>
        </CurrentCard>
    );
};

const CurrentCard = styled.div`
    padding: 3rem;
    margin: 1rem auto;
    width: 25vw;
`;

export default WeatherCurrent;
