// Import React
import React from "react";

// Import PropTypes
import PropTypes from "prop-types";

// Import styled component
import styled from "styled-components/macro";

// WeatherInputSearch component
const WeatherInputSearch = ({ handleInputValueSearch, handleInputPostalSearch, locationSearch, postalCode }) => {
    return (
        <InputSearchWrapper>
            <LabelInputSearch>Rechercher une localité</LabelInputSearch>
            <InputWrapper>
                <LabelItemInputSearch>
                   1. Entrez la localité recherchée
                </LabelItemInputSearch>
                <InputSearch
                    type="text"
                    placeholder="Paris"
                    value={locationSearch}
                    onChange={(event) =>
                        handleInputValueSearch(event.target.value)
                    }
                />
                <LabelItemInputSearch>
                    2. Si votre localité recherchée n'est pas celle désirée, entrez le code postal de votre localité
                </LabelItemInputSearch>
                <InputSearch
                    type="text"
                    placeholder="Code postal"
                    value={postalCode}
                    onChange={(event) =>
                        handleInputPostalSearch(event.target.value)
                    }
                />
            </InputWrapper>
        </InputSearchWrapper>
    );
};

// WeatherInputSearch component propTypes
WeatherInputSearch.propTypes = {
    handleInputValueSearch: PropTypes.func.isRequired,
    handleInputPostalSearch: PropTypes.func.isRequired,
    locationSearch: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired
};

// Styled component
const InputSearchWrapper = styled.div`
    width: 25rem;
    margin: 2rem auto;
    display: block;
    font-size: 2rem;
    @media (min-width: 576px) {
        width: 40rem;
        font-size: 2.2rem;
    }
`;

const LabelInputSearch = styled.h2`
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
`;

const LabelItemInputSearch = styled.label`
    font-size: 1.8rem;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
