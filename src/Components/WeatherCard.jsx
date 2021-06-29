import React from "react";

const WeatherCard = ({ datas }) => {
    return (
        <div>
            <p>{datas.current.temp}</p>
        </div>
    );
};

export default WeatherCard;
