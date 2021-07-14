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

// Import PropTypes
import PropTypes from 'prop-types';

// Import App
import App from './App';

// Import styled component
import styled from 'styled-components/macro';

// Import theme
import theme from './theming/theme';

// Import Utils Function
import getHour from './utils/getHour'

// Import CSS
import './style/index_style/index_normalize.css';
import './style/index_style/index_reset.css';
import './style/index_style/index_typography.css';

// React Features
import reportWebVitals from './reportWebVitals';

// Styled component

const AppWrapper = styled.div`
 color: ${getHour() === "day" ?
    theme.day.color :
    theme.night.color};
  background-image: url(${getHour() === "day" ?
    theme.day.backgroundImage :
    theme.night.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`

// Render to the DOM
ReactDOM.render(
  <React.StrictMode>
    <AppWrapper theme={theme}>
      <App />
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// AppWrapper component propTypes
AppWrapper.propTypes = {
  theme: PropTypes.object.isRequired,
  getHour: PropTypes.func.isRequired
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
