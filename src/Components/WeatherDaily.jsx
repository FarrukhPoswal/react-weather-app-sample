import React from "react";
import styled from "styled-components/macro";

const WeatherDaily = ({ datas }) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <DailyCardWrapper>
            {datas.daily.map((data) => (
                <DailyCardItem key={data.dt}>
                    <DailyCardItemTitle>
                        {new Date(data.dt * 1000).toLocaleDateString("fr-FR", options)}
                    </DailyCardItemTitle>
                    <img
                        src={`${process.env.REACT_APP_ICON_URL}/${data.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                    <p>Température Maximale : {Math.trunc(data.temp.max)}&deg;C</p>
                    <p>Température Minimale : {Math.trunc(data.temp.min)}&deg;C</p>
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
    width: 30rem;
    margin: 4rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.6rem;
    border: 1px solid black;
    border-radius: 5px;
`;

const DailyCardItemTitle = styled.h4`
    font-size: 2rem;
`;

export default WeatherDaily;
