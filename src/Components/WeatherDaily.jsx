import React from 'react';

const WeatherDaily = ({ datas }) => {
    return (
        <div>
            {datas.daily.map(data => (
                <li>{data.temp.day}</li>
            ))}
        </div>
    )
}

export default WeatherDaily;