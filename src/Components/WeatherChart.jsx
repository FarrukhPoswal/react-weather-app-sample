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
    const chartDataTemp = {
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
    };

    const chartOptionsTemp = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18,
                    },
                    color: "rgba(255, 255, 255, 1)",
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Jour",
                    color: "rgba(255, 255, 255, 0.8)",
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "°C",
                    color: "rgba(255, 255, 255, 0.8)",
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
                },
            },
        },
    };

    const chartDataRain = {
        labels: datas.daily.map((data) =>
            new Date(data.dt * 1000).toLocaleDateString("fr-FR")
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
                    },
                    color: "rgba(255, 255, 255, 1)",
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Jour",
                    color: "rgba(255, 255, 255, 0.8)",
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "mm",
                    color: "rgba(255, 255, 255, 0.8)",
                },
                ticks: {
                    color: "rgba(255, 255, 255, 0.8)",
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
    margin: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media (min-width: 1400px) {
        flex-direction: row;
    }
`;

const DataChartWrapper = styled.div`
    width: 35rem;
    margin: 4rem;
    padding: 2rem;
    border: ${cardTheme.border};
    border-radius: ${cardTheme.borderRadius};
    box-shadow: ${cardTheme.boxShadow};
    background-color: ${cardTheme.backgroundColor};
    backdrop-filter: ${cardTheme.backdropFilter};
    @media (min-width: 900px) {
        width: 50rem;
    }
    @media (min-width: 1400px) {
        width: 60rem;
    }
`;

// Export
export default WeatherChart;
