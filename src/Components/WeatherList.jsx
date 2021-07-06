import React from "react";
import styled from "styled-components/macro";

const WeatherList = ({ locations, handleLocations}) => {
    return (
        <List>
            <ListLabel>Veuillez sélectionner votre destination</ListLabel>
            <ListSelect
                onChange={(event) => handleLocations(event.target.value)}
            >
                <option value="">Votre localisation actuelle</option>
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
    width: 30rem;
    margin: 2rem auto;
    display: block;
    font-size: 1.6rem;
`;

const ListSelect = styled.select`
    width: 100%;
    margin: 2rem 0;
    padding: 1rem;
`;

const ListLabel = styled.label`
    display: flex;
    justify-content: center;
`;

export default WeatherList;
