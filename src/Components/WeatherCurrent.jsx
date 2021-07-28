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

// Import Utils Function
import getSaintOfTheDay from "../utils/getEphemeris";

// WeatherCurrent component
const WeatherCurrent = ({ datas }) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentTime = currentDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <CurrentWrapper>
            <CurrentCard>
                <CurrentDate>Actuellement à {currentTime}</CurrentDate>
                <CurrentWeatherWrapper>
                    <img
                        src={`${API_ICON_WEATHER}/${datas.current.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                    <CurrentTemp>
                        {Math.round(datas.current.temp)}&deg;C
                    </CurrentTemp>
                </CurrentWeatherWrapper>
                <SaintOfTheDay>
                    Nous fêtons {getSaintOfTheDay(currentMonth, currentDay)}
                </SaintOfTheDay>
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
    margin: 5rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const CurrentCard = styled.div`
    padding: 3rem;
    margin: 4rem;
    width: 40rem;
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
    @media (min-width: 768px) {
        margin: 1rem;
    }
`;

const CurrentDate = styled.p`
    font-size: 2rem;
`;

const CurrentWeatherWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CurrentTemp = styled.p`
    margin-right: 2rem;
    font-size: 4.5rem;
`;

const SaintOfTheDay = styled.p`
    font-size: 1.8rem;
`;

// Export
export default WeatherCurrent;
