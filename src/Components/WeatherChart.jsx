// Import React
import React from 'react'

// Import PropTypes
import PropTypes from "prop-types";

// Import Line from ChartJS
import { Line, Bar } from "react-chartjs-2";

// Import styled component
import styled from "styled-components/macro";

// Import theme
import cardTheme from '../theming/cardTheme';

const WeatherChart = ({ datas }) => {
    return (
        <ChartWrapper>
            <DataChartWrapper>
                <Line
                    data={{
                        labels: datas.daily.map((data) =>
                            new Date(data.dt * 1000).toLocaleDateString("fr-FR")
                        ),
                        datasets: [
                            {
                                label: "Température de la semaine",
                                data: datas.daily.map((data) => data.temp.max),
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                borderColor: "rgba(255, 255, 255, 0.3)",
                            },
                        ],
                    }}
                    options={{ maintainAspectRatio: false }}
                />
            </DataChartWrapper>
            <DataChartWrapper>
                <Bar
                    data={{
                        labels: datas.daily.map((data) =>
                            new Date(data.dt * 1000).toLocaleDateString("fr-FR")
                        ),
                        datasets: [
                            {
                                label: "Précipitations de la semaine",
                                data: datas.daily.map((data) => data.rain),
                                backgroundColor: "rgba(44, 130, 201, 1)",
                            },
                        ],
                    }}
                    options={{ maintainAspectRatio: false }}
                />
            </DataChartWrapper>
        </ChartWrapper>
    );
};

// WeatherCurrent component propTypes
WeatherChart.propTypes = {
    datas: PropTypes.object.isRequired
};

// Styled component
const ChartWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media (min-width: 1300px) {
        flex-direction: row;
    }
`;

const DataChartWrapper = styled.div`
    padding: 3rem;
    margin: 1rem;
    width: 40rem;
    border: ${cardTheme.border};
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
    @media (min-width: 1300px) {
        width: 30rem;
    }
`;

// Export
export default WeatherChart;
