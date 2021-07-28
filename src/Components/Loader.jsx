// Import React
import React from "react";

// Import styled component
import styled from "styled-components/macro";

// Import Loader GIF
import LoaderApp from '../assets/loader.gif';

const Loader = () => {
    return (
        <div>
            <LoaderWrapper>
                <LoaderImg src={LoaderApp} alt="loader app" />
            </LoaderWrapper>
        </div>
    );
};

const LoaderWrapper = styled.div`
    min-height: 100vh;
    min-width: 100vw; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

const LoaderImg = styled.img`
    width: 10rem;
`;

export default Loader;
