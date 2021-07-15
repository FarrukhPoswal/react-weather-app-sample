// Import React
import React from "react";

// Import PropTypes
import PropTypes from "prop-types";

// Import styled components
import styled from "styled-components/macro";

// Import theme
import cardTheme from '../theming/cardTheme';

// Import icons library of openweathermap.org
import API_ICON_WEATHER from "../constants/iconWeather";

// Import options for manipulating the date format
import OPTIONS from "../constants/dateFormat";

// Import Utils Function
import windDirection from "../utils/windDirection";

// WeatherDaily component
const WeatherDaily = ({ datas }) => {
    return (
        <DailyCardWrapper>
            {datas.daily.map((data) => (
                <DailyCardItem key={data.dt} cardTheme={cardTheme}>
                    <DailyCardItemTitle>
                        {new Date(data.dt * 1000).toLocaleDateString("fr-FR", OPTIONS)}
                    </DailyCardItemTitle>
                    <img
                        src={`${API_ICON_WEATHER}/${data.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                    <p>Température Maximale : {Math.trunc(data.temp.max)}&deg;C</p>
                    <p>Température Minimale : {Math.trunc(data.temp.min)}&deg;C</p>
                    <p>Direction du vent : {windDirection(data.wind_deg)}</p>
                    <p>Vitesse moyenne du vent : {data.wind_speed} km/h</p>
                    <p>Vitesse en rafale du vent : {data.wind_gust} km/h</p>
                    <p>
                        Levé de soleil :{" "}
                        {new Date(data.sunrise * 1000).toLocaleTimeString(
                            "fr-FR",
                            { hour: "2-digit", minute: "2-digit" }
                        )}
                    </p>
                    <p>
                        Couché de soleil :{" "}
                        {new Date(data.sunset * 1000).toLocaleTimeString(
                            "fr-FR",
                            { hour: "2-digit", minute: "2-digit" }
                        )}
                    </p>
                    <p>
                        Levé de lune :{" "}
                        {new Date(data.moonrise * 1000).toLocaleTimeString(
                            "fr-FR",
                            { hour: "2-digit", minute: "2-digit" }
                        )}
                    </p>
                    <p>
                        Couché de lune :{" "}
                        {new Date(data.moonset * 1000).toLocaleTimeString(
                            "fr-FR",
                            { hour: "2-digit", minute: "2-digit" }
                        )}
                    </p>
                </DailyCardItem>
            ))}
        </DailyCardWrapper>
    );
};

// WeatherDaily component propTypes
WeatherDaily.propTypes = {
    datas: PropTypes.object.isRequired,
};

// Styled component
const DailyCardWrapper = styled.div`
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        "."
        "."
        "."
        "."
        "."
        "."
        "."
        ".";
    justify-items: center;

    @media (min-width: 798px) {
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            ". ."
            ". ."
            ". ."
            ". ."; 
    }

    @media (min-width: 1600px) {
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            ". . . ."
            ". . . ."; 
    }
`;

const DailyCardItem = styled.div`
    width: 34rem;
    margin: 2rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;
    border: ${cardTheme.border};
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
`;

const DailyCardItemTitle = styled.h4`
    font-size: 2rem;
`;

// Export
export default WeatherDaily;
