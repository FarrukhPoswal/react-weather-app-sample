import React, { useState, useEffect } from 'react';
import WeatherList from './Components/WeatherList';
import WeatherCurrent from './Components/WeatherCurrent';
import WeatherDaily from './Components/WeatherDaily';
import './App.css';

const locations = [
  {
    id: 1,
    name: 'Plateau d\'Emparis',
    latitude: '45.05360',
    longitude: '6.23389',
  },
  {
    id: 2,
    name: 'Nevache',
    latitude: '45.1887',
    longitude: '6.60521',
  },
  {
    id: 3,
    name: 'Pré de Madame Carle',
    latitude: '44.91736',
    longitude: '6.41682',
  },
];

const App = () => {
  const units = 'metric';
  const apiMethod = 'onecall';
  const apiOptions = 'exclude=hourly,minutely';

  const [longitude, setLongitude] = useState(locations[0].longitude);
  const [latitude, setLatitude] = useState(locations[0].latitude);
  const [datas, setDatas] = useState([]);

  const handleLocations = (eventValue) => {
    setLongitude(eventValue.slice(0, -9))
    setLatitude(eventValue.slice(8))
  }

  useEffect(() => {
    const apiCallHandler = async () => {
      const fetchData = await fetch(`${process.env.REACT_APP_API_URL}/${apiMethod}?lat=${latitude}&lon=${longitude}&${apiOptions}&units=${units}&appid=${process.env.REACT_APP_API_KEY}`);
      const dataJson = await fetchData.json();
      setDatas(dataJson);
      console.log(dataJson);
    }
    return () => {
      apiCallHandler();
    }
  }, [latitude, longitude])

  return (
    <div className="App">
      <WeatherList locations={locations} handleLocations={handleLocations} />

      {(typeof datas.current != 'undefined') ? (
        <WeatherCurrent datas={datas}/>
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
