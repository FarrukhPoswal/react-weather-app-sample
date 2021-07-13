// Import React
import React from "react";

// Import PropTypes
import PropTypes from "prop-types";

// Import styled component
import styled from "styled-components/macro";

// WeatherAdress component
const WeatherAddress = ({ address }) => {
    return (
        <AddressDisplay>
            <p>Prévisions pour : {address.locality}</p>
            <p>
                Département : {address.localityInfo.administrative[3] !== undefined
                        ? address.localityInfo.administrative[3].name
                        : ""}
            </p>
        </AddressDisplay>
    );
};

// WeatherAddress component propTypes
WeatherAddress.propTypes = {
    address: PropTypes.object.isRequired
};

// Styled component
const AddressDisplay = styled.div`
    margin: 4rem 0;
    text-align: center;
    font-size: 2rem;
`;

// Export
export default WeatherAddress;
