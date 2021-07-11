/*
Weather React App by David Bouscarle
A simple weather app built with ReactJS

Use your API key to get weather data from openweathermap.org

Start your app with:
npm start

No library dependencies needed!
*/

// Import React
import React from 'react';
import ReactDOM from 'react-dom';

// Import CSS
import './style/index_style/index_normalize.css';
import './style/index_style/index_reset.css';
import './style/index_style/index_typography.css';

// Import App
import App from './App';

// React Features
import reportWebVitals from './reportWebVitals';

// Render to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
