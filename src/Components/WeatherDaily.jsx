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

// Import icon weather
import tempHot from '../img/weather_icon/temp-hot.svg';
import tempCold from "../img/weather_icon/temp-cold.svg";
import windRose from "../img/weather_icon/wind-rose.svg";
import wind from "../img/weather_icon/wind.svg";
import windGust from "../img/weather_icon/storm.svg";
import drop from "../img/weather_icon/drop.svg";
import sunrise from "../img/weather_icon/sunrise.svg";
import sunset from "../img/weather_icon/sunset.svg";
import moonrise from "../img/weather_icon/moonrise.svg";
import moonset from "../img/weather_icon/moonset.svg";
import pressure from "../img/weather_icon/pressure.svg";
import humidity from "../img/weather_icon/humidity.svg";

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
                    <DataContainer>
                        <DataWrapper>
                            <IconWeather src={tempHot} alt="temperature hot icon" />
                            <TempMax>{Math.round(data.temp.max)}&deg;C</TempMax>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={tempCold} alt="temperature cold icon" />
                            <TempMin>{Math.round(data.temp.min)}&deg;C</TempMin>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={windRose} alt="wind rose icon" />
                            <Data>{windDirection(data.wind_deg)}</Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={wind} alt="wind icon" />
                            <Data>{Math.round(data.wind_speed)} km/h</Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={windGust} alt="wind gust icon" />
                            <Data>{Math.round(data.wind_gust)} km/h</Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={drop} alt="rain drop icon" />
                            <Data>{data.rain ? data.rain.toFixed(1) : "0"} mm</Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={pressure} alt="gauge icon" />
                            <Data>{data.pressure} hPa</Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={humidity} alt="humidty icon" />
                            <Data>{data.humidity} %</Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={sunrise} alt="sunrise icon" />
                            <Data>
                                {new Date(data.sunrise * 1000).toLocaleTimeString(
                                    "fr-FR",
                                    { hour: "2-digit", minute: "2-digit" }
                                )}
                            </Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={sunset} alt="sunset icon" />
                            <Data>
                                {new Date(data.sunset * 1000).toLocaleTimeString(
                                    "fr-FR",
                                    { hour: "2-digit", minute: "2-digit" }
                                )}
                            </Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={moonrise} alt="moonrise icon" />
                            <Data>
                                {new Date(data.moonrise * 1000).toLocaleTimeString(
                                    "fr-FR",
                                    { hour: "2-digit", minute: "2-digit" }
                                )}
                            </Data>
                        </DataWrapper>
                        <DataWrapper>
                            <IconWeather src={moonset} alt="moonset icon" />
                            <Data>
                                {new Date(data.moonset * 1000).toLocaleTimeString(
                                    "fr-FR",
                                    { hour: "2-digit", minute: "2-digit" }
                                )}
                            </Data>
                        </DataWrapper>
                    </DataContainer>
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
    width: 32rem;
    margin: 2rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
    @media (min-width: 768px) {
        width: 35.5rem;
    }
`;

const DailyCardItemTitle = styled.h4`
    font-size: 2rem;
    @media (min-width: 768px) {
        font-size: 2.5rem;
    }
`;

const IconWeather = styled.img`
    width: 20%;
`;

const DataContainer = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr; 
    gap: 2rem 0; 
    grid-template-areas: 
    ". ."
    ". ."
    ". ."
    ". ."
    ". ."
    ". ."; 
`;

const DataWrapper = styled.p`
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
`;

const Data = styled.span`
    margin-left: 1.5rem;
    font-size: 2rem;
    @media (min-width: 576px) {
        font-size: 2.2rem;
    }
`;

const TempMax = styled.span`
    margin-left: 1.5rem;
    font-size: 3rem;
    color: Crimson;
`;

const TempMin = styled.span`
    margin-left: 1.5rem;
    font-size: 3rem;
    color: DodgerBlue;
`;

// Export
export default WeatherDaily;
