import React from "react";

const WeatherList = ({ locations, handleLocations }) => {
    return (
        <div class="ui dropdown">
            <input type="hidden" name="gender" />
            <i class="dropdown icon"></i>
            <div class="default text">Gender</div>
            <div class="menu">
                <div class="item" data-value="male">Male</div>
                <div class="item" data-value="female">Female</div>
            </div>
        </div>
    );
};

export default WeatherList;
