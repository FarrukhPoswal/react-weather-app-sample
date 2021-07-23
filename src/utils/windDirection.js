// Array of wind directions
const windDirections = [
    { name: 'Nord', range: [0, 22.5] },
    { name: 'N/Est', range: [22.5, 67.5] },
    { name: 'Est', range: [67.5, 112.5] },
    { name: 'S/Est', range: [112.5, 157.5] },
    { name: 'Sud', range: [157.5, 202.5] },
    { name: 'S/Ouest', range: [202.5, 247.5] },
    { name: 'Ouest', range: [247.5, 292.5] },
    { name: 'N/Ouest', range: [292.5, 337.5] },
    { name: 'Nord', range: [337.5, 360] }
];

// Determine the direction of the wind
const windDirection = (degrees) => {
    const windDirectionName = [];

    windDirections.forEach((windDirection) => {
        if (windDirection.range[0] <= degrees && windDirection.range[1] >= degrees) {
            windDirectionName.push(windDirection.name);
        }
    });

    return windDirectionName;
}

// Export
export default windDirection;