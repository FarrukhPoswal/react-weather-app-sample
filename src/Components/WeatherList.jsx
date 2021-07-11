// Import React
import React from "react";

// Import styled component
import styled from "styled-components/macro";

// WeatherList component
const WeatherList = ({ locations, handleLocations}) => {
    return (
        <List>
            <ListLabel>Veuillez sélectionner votre localisation</ListLabel>
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

// Styled component
const List = styled.div`
    width: 30rem;
    margin: 2rem auto;
    display: block;
    font-size: 1.6rem;
`;

const ListLabel = styled.label`
    display: flex;
    justify-content: center;
`;

const ListSelect = styled.select`
    width: 100%;
    margin: 2rem 0;
    padding: 1rem;
`;

// Export
export default WeatherList;
