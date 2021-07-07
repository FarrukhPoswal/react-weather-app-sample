import { createStore } from "redux";

const initialState = [{}];

const ADD_LOCATION = {    
    type: 'ADD_LOCATION', 
    payload: { 
    id: Math.random(), 
    name: '', 
    latitude: '', 
    longitude: '', }  
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_LOCATION' : return [...state, ADD_LOCATION.payload];
        default: return state;
    }
};

const store = createStore(locationReducer);

export default store;
