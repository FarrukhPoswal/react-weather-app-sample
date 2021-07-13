// Import React
import React from "react";

// Import PropTypes
import PropTypes from "prop-types";

// Import styled component
import styled from "styled-components/macro";

// Import icons library of openweathermap.org
import API_ICON_WEATHER from "../constants/iconWeather";

// WeatherCurrent component
const WeatherCurrent = ({ datas }) => {
    const currentTime = new Date().toLocaleTimeString(
        "fr-FR",
        { hour: "2-digit", minute: "2-digit" }
    );

    return (
        <CurrentCard>
            <p>Actullement à {currentTime}</p>
            <img
                src={`${API_ICON_WEATHER}/${datas.current.weather[0].icon}@2x.png`}
                alt="weather icon"
            />
            <p>Température actuelle : {Math.trunc(datas.current.temp)}&deg;C</p>
        </CurrentCard>
    );
};

// WeatherCurrent component propTypes
WeatherCurrent.propTypes = {
    datas: PropTypes.object.isRequired
}; 

// Styled component
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

// Export
export default WeatherCurrent;
