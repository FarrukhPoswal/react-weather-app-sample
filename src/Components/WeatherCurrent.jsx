import React from "react";

const WeatherCurrent = ({ datas }) => {
    return (
        <div>
            <p>{datas.current.temp}</p>
        </div>
    );
};

export default WeatherCurrent;
