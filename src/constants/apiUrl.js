// Resolve .env file

const {REACT_APP_API_KEY_OPENWEATHER, REACT_APP_API_KEY_SAINTS} = process.env;

// URL API Call

const API_URL_WEATHERDATA = "https://api.openweathermap.org/data/2.5";
const API_URL_REVERSEGEO = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const API_URL_LOCALISATIONSEARCH = "https://api-adresse.data.gouv.fr/search";
const API_URL_SAINTS = "http://fetedujour.fr/api/v2";

// Export

export {
    API_URL_WEATHERDATA,
    API_URL_REVERSEGEO,
    API_URL_LOCALISATIONSEARCH,
    API_URL_SAINTS,
    REACT_APP_API_KEY_OPENWEATHER,
    REACT_APP_API_KEY_SAINTS,
};
