// Import React
import React, { useState, useEffect } from "react";

// Import Components
import WeatherList from "./Components/WeatherList";
import WeatherInputSearch from "./Components/WeatherInputSearch";
import WeatherAddress from "./Components/WeatherAddress";
import WeatherCurrent from "./Components/WeatherCurrent";
import WeatherDaily from "./Components/WeatherDaily";

// Import Constants
import WEATHER_STATIONS from "./constants/weatherStations";
import * as API_URL from "./constants/apiUrl";

// Import CSS
import "./App.css";

const App = () => {
    // Utils for getting the weather data
    const units = "metric";
    const apiMethod = "onecall";
    const apiOptions = "exclude=hourly,minutely";

    // Initialize the state
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [currentLocation, setCurrentLocation] = useState([
        longitude,
        latitude,
    ]);
    const [address, setAddress] = useState([]);
    const [datas, setDatas] = useState([]);
    const [cityGeo, setCityGeo] = useState([]);

    // Display or initialize the right location
    const handleLocations = (event) => {
        if (event !== "" && event !== undefined) {
            setLongitude(event.slice(0, -8));
            setLatitude(event.slice(7));
        } else {
            setLocationSearch("");
            setLongitude(currentLocation[0]);
            setLatitude(currentLocation[1]);
        }
    };

    // Search the location in input field
    const handleInputValueSearch = (event) => {
        if (event !== "") {
            setLocationSearch(event)
        } else {
            handleLocations();
        }
    };

    // API Call to get datas from openweathermap.org
    useEffect(() => {
        const apiCallHandler = async () => {
            const fetchData = await fetch(
                `${API_URL.API_URL_WEATHERDATA}/${apiMethod}?lat=${latitude}&lon=${longitude}&${apiOptions}&units=${units}&appid=${API_URL.API_KEY_OPENWEATHER}`);
            const dataJson = await fetchData.json();
            setDatas(dataJson);
            // console.log(dataJson);
        };

        if (longitude !== "" && latitude !== "") {
            apiCallHandler();
        }
    }, [latitude, longitude]);

    // API Call to display the location by longitude and latitude
    useEffect(() => {
        const reverseGeocodeCallHandler = async () => {
            const fetchAddress = await fetch(
                `${API_URL.API_URL_REVERSEGEO}?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`);
            const addressJson = await fetchAddress.json();
            setAddress(addressJson);
            // console.log(addressJson);
        };

        if (longitude !== "" && latitude !== "") {
            reverseGeocodeCallHandler();
        }
    }, [longitude, latitude])

    // Set the current location
    useEffect(() => {
        const getLocation = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        };

        const handleCurrentLocation = async () => {
            try {
                const position = await getLocation();
                setCurrentLocation([
                    position.coords.longitude,
                    position.coords.latitude,
                ]);
            } catch (error) {
                window.alert(
                    `Impossible de localiser votre position: ${error}`
                );
            }
        };

        if (latitude === "" && longitude === "") {
            handleCurrentLocation();
            setLongitude(currentLocation[0]);
            setLatitude(currentLocation[1]);
        }
    }, [currentLocation, latitude, longitude])

    // API call to find and search the right location in the input field
    useEffect(() => {
        const fetchCityGeo = async () => {
            const fetchAddress = await fetch(`${API_URL.API_URL_LOCALISATIONSEARCH}/?q=${locationSearch}`);
            const addressJson = await fetchAddress.json();
            setCityGeo(addressJson);
            // console.log(addressJson);
        }

        if (locationSearch !== "") {
            fetchCityGeo();
        }
    }, [locationSearch]);

    // Set the latitude and longitude of the current location or the input field
    useEffect(() => {
        const setLocationSearch = async () => {
            if (cityGeo.features.length > 0) {
                setLongitude(cityGeo.features[0].geometry.coordinates[0]);
                setLatitude(cityGeo.features[0].geometry.coordinates[1]);
            } else {
                setLongitude(currentLocation[0]);
                setLatitude(currentLocation[1]);
            }
        }

        if (cityGeo.length !== 0) {
            setLocationSearch();
        }
    }, [cityGeo, currentLocation]);

    return (
        <div className="App">
            <WeatherList
                locations={WEATHER_STATIONS}
                handleLocations={handleLocations}
            />

            <WeatherInputSearch
                handleInputValueSearch={handleInputValueSearch}
                // handleLocationSearch={handleLocationSearch}
                locationSearch={locationSearch}
            />

            {typeof address.localityInfo !== "undefined" ? (
                <WeatherAddress address={address} />
            ) : (
                <div></div>
            )}

            {typeof datas.current !== "undefined" ? (
                <WeatherCurrent datas={datas} />
            ) : (
                <div></div>
            )}

            {typeof datas.daily !== "undefined" ? (
                <WeatherDaily datas={datas} />
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default App;
