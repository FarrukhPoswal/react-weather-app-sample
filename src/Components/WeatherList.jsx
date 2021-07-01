import React from "react";
import styled from "styled-components/macro";

const WeatherList = ({ locations, handleLocations }) => {
    return (
        <WeatherListSelect onChange={(event) => handleLocations(event.target.value)}>
            {locations.map((location) => (
                <option
                    key={location.id}
                    value={[location.longitude, location.latitude]}
                >
                    {location.name}
                </option>
            ))}
        </WeatherListSelect>
    );
};

const WeatherListSelect = styled.select`
    width: 25vw;
    padding: 1rem;
    margin: 1rem auto;
    display: block;
`;

export default WeatherList;
