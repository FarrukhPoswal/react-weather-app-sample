// Import React
import React from "react";

// Import PropTypes
import PropTypes from "prop-types";

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

// WeatherList component propTypes
WeatherList.propTypes = {
    locations: PropTypes.array.isRequired,
    handleLocations: PropTypes.func.isRequired
};

// Styled component
const List = styled.div`
    width: 32rem;
    margin: 2rem auto;
    display: block;
    font-size: 1.8rem;
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
