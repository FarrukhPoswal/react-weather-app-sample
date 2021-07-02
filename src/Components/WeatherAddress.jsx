import React from 'react';
import styled from 'styled-components/macro'

const WeatherAddress = ({ address }) => {
    return (
        <AddressDisplay>
            <p>Prévisions pour : {address.locality}</p>
        </AddressDisplay>
    )
}

const AddressDisplay = styled.div`
    text-align: center;
    font-size: 1.2rem;
`;

export default WeatherAddress;