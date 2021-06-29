import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [longitude, setLongitude] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiCallHandler = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }, (error) => {
          console.warn(error.message)}
      );
          
      await fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => response.json())
        .then(result => {
          setData(result)
          console.log(result);
        });
    }
      return () => {
        apiCallHandler();
      }
  }, [latitude, longitude]);
  
  return (
    <div className="App">
      {console.log(data)}
    </div>
  );
}

export default App;
