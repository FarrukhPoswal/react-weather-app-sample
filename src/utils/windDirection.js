// Array of wind directions

const windDirections = [
    { name: 'N', range: [0, 22.5] },
    { name: 'NE', range: [22.5, 67.5] },
    { name: 'E', range: [67.5, 112.5] },
    { name: 'SE', range: [112.5, 157.5] },
    { name: 'S', range: [157.5, 202.5] },
    { name: 'SW', range: [202.5, 247.5] },
    { name: 'W', range: [247.5, 292.5] },
    { name: 'NW', range: [292.5, 337.5] },
    { name: 'N', range: [337.5, 360] }
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