import React from "react";
import 'semantic-ui-css/semantic.min.css';

const WeatherList = ({ locations, handleLocations }) => {
    return (
        <ul>
            {locations.map((location) => (
                <li
                    key={location.id}
                    onClick={() =>
                        handleLocations(location.longitude, location.latitude)
                    }
                >
                    {location.name}
                </li>
            ))}
        </ul>
    );
};

export default WeatherList;
