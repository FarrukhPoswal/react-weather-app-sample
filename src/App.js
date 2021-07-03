import React, { useState, useEffect } from 'react';
import WeatherList from './Components/WeatherList';
import WeatherAddress from './Components/WeatherAddress';
import WeatherCurrent from './Components/WeatherCurrent';
import WeatherDaily from './Components/WeatherDaily';
import './App.css';

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
  const units = 'metric';
  const apiMethod = 'onecall';
  const apiOptions = 'exclude=hourly,minutely';

  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [address, setAddress] = useState([])
  const [datas, setDatas] = useState([]);

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    }, error => {
      console.error(error);
    })
  }

  const handleLocations = (eventValue) => {
    if (eventValue !== "") {
      setLongitude(eventValue.slice(0, -8));
      setLatitude(eventValue.slice(7));
    } else {
      handleCurrentLocation();
    }
  }

  useEffect(() => {
    if (latitude === null && longitude === null) {
      handleCurrentLocation();
    }

    const reverseGeocodeCallHandler = async () => {
      const fetchAddress = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`);
      const addressJson = await fetchAddress.json();
      setAddress(addressJson);
      // console.log(addressJson);
    }

    const apiCallHandler = async () => {
      const fetchData = await fetch(`${process.env.REACT_APP_API_URL_WEATHERDATA}/${apiMethod}?lat=${latitude}&lon=${longitude}&${apiOptions}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`);
      const dataJson = await fetchData.json();
      setDatas(dataJson);
      // console.log(dataJson);
    }

    reverseGeocodeCallHandler();
    apiCallHandler();
  }, [latitude, longitude])

  return (
    <div className="App">
      <WeatherList 
        locations={locations} 
        handleLocations={handleLocations} 
      />

      {(typeof address.localityInfo !== 'undefined') ? (
        <WeatherAddress 
          address={address}
        />
      ) : (
        <div></div>
      )}

      {(typeof datas.current != 'undefined') ? (
        <WeatherCurrent datas={datas} />
      ) : (
        <div></div>
      )}

      {(typeof datas.daily != 'undefined') ? (
        <WeatherDaily datas={datas} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
