// Import React
import React, { useState, useEffect } from "react";

// Import Components
import Loader from "./Components/Loader";
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

// Import CSS
import "./style/app.css";

// App component
const App = () => {
    // Initialize the state
    const [loading, setLoading] = useState(true);
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
    const handleLocations = (value) => {
        if (value !== "" && value !== undefined) {
            const coords = value.replace(",", "").split(" ");
            setLongitude(coords[0]);
            setLatitude(coords[1]);
        } else {
            setLongitude(currentLocation[0]);
            setLatitude(currentLocation[1]);
        }
        setLocationSearch("");
        setPostalCode("");
    };

    // Search the location in input field by city
    const handleInputValueSearch = (event) => {
        if (event !== "") {
            setLocationSearch(event);
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

    // Loading App, display loader during 4000ms
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    }, []);

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
                    `Impossible de localiser votre position: ${error.message} \n Veuillez activer votre GPS`
                );
            }
        };

        if (latitude === "" && longitude === "") {
            handleCurrentLocation();
            setLongitude(currentLocation[0]);
            setLatitude(currentLocation[1]);
        }
    }, [currentLocation, latitude, longitude]);

    // API Call to display the location by longitude and latitude
    useEffect(() => {
        const reverseGeocodeCallHandler = async () => {
            const fetchAddress = await fetch(
                `${API_URL.API_URL_REVERSEGEO}?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`
            );
            const addressJson = await fetchAddress.json();
            setAddress(addressJson);
            // console.log(addressJson);
        };

        if (longitude !== "" && latitude !== "") {
            reverseGeocodeCallHandler();
        }
    }, [longitude, latitude]);

    // API Call to get datas from openweathermap.org
    useEffect(() => {
        const apiCallHandler = async () => {
            try {
                const fetchData = await fetch(
                    `${API_URL.API_URL_WEATHERDATA}/${API_UTILS.API_METHOD}?lat=${latitude}&lon=${longitude}&${API_UTILS.API_OPTIONS}&units=${API_UTILS.UNITS}&appid=${API_URL.REACT_APP_API_KEY_OPENWEATHER}`
                );
                if (fetchData.ok) {
                    const datasJson = await fetchData.json();
                    setDatas(datasJson);
                    // console.log(datasJson);
                } else {
                    window.alert(
                        `Erreur de connexion au serveur distant \n 
                        Veuillez réessayer plus tard \n
                        AdminLogError ${fetchData.status} : ${fetchData.statusText}`
                    );
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        };

        if (longitude !== "" && latitude !== "") {
            apiCallHandler();
        }
    }, [latitude, longitude]);

    // API call to find and search the right location in the input field
    useEffect(() => {
        const fetchCityGeo = async () => {
            try {
                const fetchAddress = await fetch(
                    `${API_URL.API_URL_LOCALISATIONSEARCH}/?q=${locationSearch}`
                );
                if (fetchAddress.ok) {
                    const cityGeoJson = await fetchAddress.json();
                    setCityGeo(cityGeoJson);
                    // console.log(cityGeoJson);
                } else {
                    window.alert(
                        `Nous ne pouvons pas déterminer cette localité \n
                        Veuillez réessayer plus tard \n
                        AdminLogError ${fetchAddress.status} : ${fetchAddress.statusText}`
                    );
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        };

        const fetchCityGeoByPostalCode = async () => {
            try {
                const fetchAddress = await fetch(
                    `${API_URL.API_URL_LOCALISATIONSEARCH}/?q=${locationSearch}&postcode=${postalCode}`
                );
                if (fetchAddress.ok) {
                    const cityGeoJson = await fetchAddress.json();
                    setCityGeo(cityGeoJson);
                    // console.log(cityGeoJson);
                } else {
                    window.alert(
                        ` Nous ne pouvons pas déterminer cette localité \n
                        Veuillez réessayer plus tard \n
                        AdminLogError ${fetchAddress.status} : ${fetchAddress.statusText}`
                    );
                }
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        };

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
        };

        if (cityGeo.length !== 0) {
            setLocationSearch();
        }
    }, [cityGeo, currentLocation]);

    return loading ? (
        <div className="fade-out">
            <Loader />
        </div>
    ) : (
        <div className={`App ${loading ? "" : "fade-in"}`}>
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
