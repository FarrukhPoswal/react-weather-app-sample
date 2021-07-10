import React from "react";
import styled from "styled-components/macro";

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

const AddressDisplay = styled.div`
    margin: 4rem 0;
    text-align: center;
    font-size: 2rem;
`;

export default WeatherAddress;
