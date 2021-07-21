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
                        {new Date(data.dt * 1000).toLocaleDateString(
                            "fr-FR",
                            OPTIONS.option_card
                        )}
                    </DailyCardItemTitle>
                    <img
                        src={`${API_ICON_WEATHER}/${data.weather[0].icon}@2x.png`}
                        alt="weather icon"
                        width="120px"
                    />
                    <DataWrapper>
                        Temp. Max :{" "}
                        <TempMax>{Math.trunc(data.temp.max)}&deg;C</TempMax>
                    </DataWrapper>
                    <DataWrapper>
                        Temp. Min :{" "}
                        <TempMin>{Math.trunc(data.temp.min)}&deg;C</TempMin>
                    </DataWrapper>
                    <DataWrapper>
                        Direction du vent :{" "}
                        <Data>{windDirection(data.wind_deg)}</Data>
                    </DataWrapper>
                    <DataWrapper>
                        Vitesse du vent : <Data>{Math.trunc(data.wind_speed)} km/h</Data>
                    </DataWrapper>
                    <DataWrapper>
                        Rafale : <Data>{Math.trunc(data.wind_gust)} km/h</Data>
                    </DataWrapper>
                    <DataWrapper>
                        Levé de soleil :{" "}
                        <Data>
                            {new Date(data.sunrise * 1000).toLocaleTimeString(
                                "fr-FR",
                                { hour: "2-digit", minute: "2-digit" }
                            )}
                        </Data>
                    </DataWrapper>
                    <DataWrapper>
                        Couché de soleil :{" "}
                        <Data>
                            {new Date(data.sunset * 1000).toLocaleTimeString(
                                "fr-FR",
                                { hour: "2-digit", minute: "2-digit" }
                            )}
                        </Data>
                    </DataWrapper>
                    <DataWrapper>
                        Levé de lune :{" "}
                        <Data>
                            {new Date(data.moonrise * 1000).toLocaleTimeString(
                                "fr-FR",
                                { hour: "2-digit", minute: "2-digit" }
                            )}
                        </Data>
                    </DataWrapper>
                    <DataWrapper>
                        Couché de lune :{" "}
                        <Data>
                            {new Date(data.moonset * 1000).toLocaleTimeString(
                                "fr-FR",
                                { hour: "2-digit", minute: "2-digit" }
                            )}
                        </Data>
                    </DataWrapper>
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
    padding-bottom: 4rem;
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
    width: 30rem;
    margin: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    border: ${cardTheme.border};
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
    @media (min-width: 768px) {
        width: 35rem;
    }
`;

const DailyCardItemTitle = styled.h4`
    font-size: 2rem;
    @media (min-width: 768px) {
        font-size: 2.5rem;
    }
`;

const DataWrapper = styled.p`
    margin: 0.5rem 0;
`;

const Data = styled.span`
    margin-left: 1rem;
    font-size: 2rem;
    @media (min-width: 576px) {
        font-size: 2.5rem;
    }
`;

const TempMax = styled.span`
    margin-left: 1rem;
    font-size: 3rem;
    color: Crimson;
`;

const TempMin = styled.span`
    margin-left: 1rem;
    font-size: 3rem;
    color: DodgerBlue;
`;

// Export
export default WeatherDaily;
