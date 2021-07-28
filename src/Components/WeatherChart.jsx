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

// Import options for manipulating the date format
import OPTIONS from "../constants/dateFormat";

const WeatherChart = ({ datas }) => {
    const chartDataTemp = {
        labels: datas.daily.map((data) =>
            new Date(data.dt * 1000).toLocaleDateString("fr-FR", OPTIONS.option_chart)
        ),
        datasets: [
            {
                label: "Température de la semaine",
                data: datas.daily.map((data) => data.temp.max),
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.3)",
            },
        ],
    };

    const chartOptionsTemp = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18,
                        family: 'Poppins',
                    },
                    color: "rgba(255, 255, 255, 1)",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
                    font: {
                        family: 'Poppins',
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "°C",
                    color: "rgba(255, 255, 255, 0.8)",
                    font: {
                        family: 'Poppins',
                    },
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
                    precision: 0,
                    font: {
                        family: 'Poppins',
                    },
                },
            },
        },
    };

    const chartDataRain = {
        labels: datas.daily.map((data) =>
            new Date(data.dt * 1000).toLocaleDateString("fr-FR", OPTIONS.option_chart)
        ),
        datasets: [
            {
                label: "Précipitations de la semaine",
                data: datas.daily.map((data) => data.rain),
                backgroundColor: "rgba(44, 130, 201, 0.8)",
            },
        ],
    };

    const chartOptionsRain = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18,
                        family: 'Poppins',
                    },
                    color: "rgba(255, 255, 255, 1)",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
                    font: {
                        family: 'Poppins',
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "mm",
                    color: "rgba(255, 255, 255, 0.8)",
                    font: {
                        family: 'Poppins',
                    },
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
                    precision: 0,
                    font: {
                        family: 'Poppins',
                    },
                },
            },
        },
    };

    return (
        <ChartWrapper>
            <DataChartWrapper>
                <Line data={chartDataTemp} options={chartOptionsTemp} />
            </DataChartWrapper>
            <DataChartWrapper>
                <Bar data={chartDataRain} options={chartOptionsRain} />
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
    margin: 4rem 0 4rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 1200px) {
        flex-direction: row;
        justify-content: space-around;
    }
`;

const DataChartWrapper = styled.div`
    width: 35rem;
    margin: 3rem 0 3rem 0;
    padding: 2rem;
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
    @media (min-width: 768px) {
        width: 50rem;
        margin: 2rem;
        padding: 2rem;
    }
    @media (min-width: 1400px) {
        width: 60rem;
    }
`;

// Export
export default WeatherChart;
