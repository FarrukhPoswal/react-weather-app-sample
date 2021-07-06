import React from "react";
import styled from "styled-components/macro";

const WeatherCurrent = ({ datas }) => {
    const currentTime = new Date().toLocaleTimeString(
        "fr-FR",
        { hour: "2-digit", minute: "2-digit" }
    );

    return (
        <CurrentCard>
            <p>Actullement à {currentTime}</p>
            <img
                src={`${process.env.REACT_APP_ICON_URL}/${datas.current.weather[0].icon}@2x.png`}
                alt="weather icon"
            />
            <p>Température actuelle : {Math.trunc(datas.current.temp)}&deg;C</p>
        </CurrentCard>
    );
};

const CurrentCard = styled.div`
    padding: 3rem;
    margin: 1rem auto;
    width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;
    border: 1px solid black;
    border-radius: 5px;
`;

export default WeatherCurrent;
