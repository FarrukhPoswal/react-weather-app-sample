import React from "react";
import styled from "styled-components/macro";

const WeatherList = ({ locations, handleLocations }) => {
    return (
        <List>
            <ListLabel>Veuillez sélectionner votre destination</ListLabel>
            <ListSelect
                onChange={(event) => handleLocations(event.target.value)}
            >
                {locations.map((location) => (
                    <option
                        key={location.id}
                        value={[location.longitude, location.latitude]}
                    >
                        {location.name}
                    </option>
                ))}
            </ListSelect>
        </List>
    );
};

const List = styled.div`
    width: 25vw;
    margin: 1rem auto;
    display: block;
`;

const ListSelect = styled.select`
    width: 100%;
    margin: 1rem 0;
    padding: 1rem;
`;

const ListLabel = styled.label`
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
`;

export default WeatherList;
