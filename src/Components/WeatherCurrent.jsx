// Import React
import React from "react";

// Import PropTypes
import PropTypes from "prop-types";

// Import styled component
import styled from "styled-components/macro";

// Import theme
import cardTheme from '../theming/cardTheme';

// Import icons library of openweathermap.org
import API_ICON_WEATHER from "../constants/iconWeather";

// WeatherCurrent component
const WeatherCurrent = ({ datas }) => {
    const currentTime = new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <CurrentWrapper>
            <CurrentCard>
                <p>Actullement à {currentTime}</p>
                <img
                    src={`${API_ICON_WEATHER}/${datas.current.weather[0].icon}@2x.png`}
                    alt="weather icon"
                />
                <p>
                    Température actuelle : {Math.trunc(datas.current.temp)}
                    &deg;C
                </p>
            </CurrentCard>
        </CurrentWrapper>
    );
};

// WeatherCurrent component propTypes
WeatherCurrent.propTypes = {
    datas: PropTypes.object.isRequired
};

// Styled component
const CurrentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const CurrentCard = styled.div`
    padding: 3rem;
    margin: 1rem;
    width: 20rem;
    font-size: 1.6rem;
    border: ${cardTheme.border};
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
`;

// Export
export default WeatherCurrent;
