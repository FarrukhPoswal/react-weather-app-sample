import React, { useState, useEffect } from "react";
import WeatherList from "./Components/WeatherList";
import WeatherInputSearch from "./Components/WeatherInputSearch";
import WeatherAddress from "./Components/WeatherAddress";
import WeatherCurrent from "./Components/WeatherCurrent";
import WeatherDaily from "./Components/WeatherDaily";
import "./App.css";

const locations = [
    {
        id: 1,
        name: "Plateau d'Emparis",
        latitude: "45.0523",
        longitude: "6.2342",
    },
    {
        id: 2,
        name: "Nevache",
        latitude: "45.0192",
        longitude: "6.6068",
    },
    {
        id: 3,
        name: "Pré de Madame Carle",
        latitude: "44.9178",
        longitude: "6.4156",
    },
];

const App = () => {
    const units = "metric";
    const apiMethod = "onecall";
    const apiOptions = "exclude=hourly,minutely";

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

    const handleLocations = (event) => {
        if (event !== "") {
            setLongitude(event.slice(0, -8));
            setLatitude(event.slice(7));
        } else {
            setLongitude(currentLocation[0]);
            setLatitude(currentLocation[1]);
        }
    };

    const handleInputValueSearch = (event)  => {
        setLocationSearch(event)
    };

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

        const reverseGeocodeCallHandler = async () => {
            const fetchAddress = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`);
            const addressJson = await fetchAddress.json();
            setAddress(addressJson);
            // console.log(addressJson);
        };

        const apiCallHandler = async () => {
            const fetchData = await fetch(
                `${process.env.REACT_APP_API_URL_WEATHERDATA}/${apiMethod}?lat=${latitude}&lon=${longitude}&${apiOptions}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`);
            const dataJson = await fetchData.json();
            setDatas(dataJson);
            // console.log(dataJson);
        };

        if (longitude !== "" && latitude !== "") {
            reverseGeocodeCallHandler();
            apiCallHandler();
        }
    }, [latitude, longitude, currentLocation]);

    useEffect(() => {
        const fetchCityGeo = async () => {
            const fetchAddress = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${locationSearch}`);
            const addressJson = await fetchAddress.json();
            setCityGeo(addressJson);
            // console.log(addressJson);
        }

        if (locationSearch !== "") {
            fetchCityGeo();
        }
    }, [locationSearch]);

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
    }, [cityGeo, currentLocation])

    return (
        <div className="App">
            <WeatherList
                locations={locations}
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

            {typeof datas.current != "undefined" ? (
                <WeatherCurrent datas={datas} />
            ) : (
                <div></div>
            )}

            {typeof datas.daily != "undefined" ? (
                <WeatherDaily datas={datas} />
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default App;
