// Import React
import React, { useState, useEffect } from "react";

// Import Components
import WeatherList from "./Components/WeatherList";
import WeatherInputSearch from "./Components/WeatherInputSearch";
import WeatherAddress from "./Components/WeatherAddress";
import WeatherCurrent from "./Components/WeatherCurrent";
import WeatherChart from "./Components/WeatherChart";
import WeatherDaily from "./Components/WeatherDaily";

// Import Constants
import WEATHER_STATIONS from "./constants/weatherStations";
import * as API_URL from "./constants/apiUrl";
import * as API_UTILS from "./constants/apiUtils";

// App component
const App = () => {
    // Initialize the state
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [postalCode, setPostalCode] = useState("");
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
            setPostalCode("");
            setLongitude(currentLocation[0]);
            setLatitude(currentLocation[1]);
        }
    };

    // Search the location in input field by city
    const handleInputValueSearch = (event) => {
        if (event !== "") {
            setLocationSearch(event)
        } else {
            handleLocations();
        }
    };

    // Search the location in input field by postal code
    const handleInputValuePostalCode = (event) => {
        if (event !== "") {
            setPostalCode(event);
        } else {
            handleLocations();
        }
    };

            
    // API Call to get datas from openweathermap.org
    useEffect(() => {
        const apiCallHandler = async () => {
            const fetchData = await fetch(
                `${API_URL.API_URL_WEATHERDATA}/${API_UTILS.API_METHOD}?lat=${latitude}&lon=${longitude}&${API_UTILS.API_OPTIONS}&units=${API_UTILS.UNITS}&appid=${API_URL.API_KEY_OPENWEATHER}`);
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
            console.log(addressJson);
        }

        const fetchCityGeoByPostalCode = async () => {
            const fetchAddress = await fetch(`${API_URL.API_URL_LOCALISATIONSEARCH}/?q=${locationSearch}&postcode=${postalCode}`);
            const addressJson = await fetchAddress.json();
            setCityGeo(addressJson);
            // console.log(addressJson);
        }

        if (locationSearch !== "" && postalCode === "") {
            fetchCityGeo();
        }

        if (postalCode !== "" && locationSearch !== "") {
            fetchCityGeoByPostalCode();
        }
    }, [locationSearch, postalCode]);

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
                handleInputPostalSearch={handleInputValuePostalCode}
                locationSearch={locationSearch}
                postalCode={postalCode}
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

            {typeof datas.current !== "undefined" ? (
                <WeatherChart datas={datas} />
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

// Export
export default App;
