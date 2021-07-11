// Import React
import React from "react";

// Import styled component
import styled from "styled-components/macro";

// WeatherInputSearch component
const WeatherInputSearch = ({ handleInputValueSearch, locationSearch }) => {
    return (
        <InputSearchWrapper>
            <LabelInputSearch>Rechercher une localité</LabelInputSearch>
            <InputWrapper>
                <InputSearch
                    type="text"
                    placeholder="Paris"
                    value={locationSearch}
                    onChange={(event) =>
                        handleInputValueSearch(event.target.value)
                    }
                />
            </InputWrapper>
        </InputSearchWrapper>
    );
};

// Styled component
const InputSearchWrapper = styled.div`
    width: 30rem;
    margin: 2rem auto;
    display: block;
    font-size: 1.6rem;
`;

const LabelInputSearch = styled.label`
    display: flex;
    justify-content: center;
`;

const InputWrapper = styled.div`
    display: flex;
`;

const InputSearch = styled.input`
    width: 100%;
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 5px;
`;

// Export 
export default WeatherInputSearch;
