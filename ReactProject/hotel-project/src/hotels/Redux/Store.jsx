import { createStore } from "redux";
import { produce } from 'immer'
import { addAdvertiser, getAllApartments } from "../api";
import { Apartments } from "../Apartments";
import { addCity } from "./Action";

const initialState = {
  currentUser: {},
  apartments: [],
  cities: [],
  categories: []
}

const reducer = produce((state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      state.currentUser = action.payload
      break;
    case 'ADD_USER':
      addAdvertiser(action.payload)
      break;
    case 'SET_APARTMENTS':
      state.apartments = action.payload
      break;
    case 'SET_CATEGORIES':
      state.categories = action.payload
      break;
    case 'SET_CITIES':
      state.cities = action.payload
      break;
    case 'ADD_CITY'://מוסיף עיר 
      state.cities.push(action.payload)
      break;
    case 'ADD_CATEGORY':
      state.categories.push(action.payload) 
      break;
    case 'DEL_APARTMENT':
      const index = state.apartments.findIndex(apartment => apartment.id === action.payload);
      if (index !== -1) {
        state.apartments.splice(index, 1); }
      break;
      case 'ADD_APARTMENT':
      state.apartments = { ...action.payload }
      break;
  }
}, initialState)

const myStore = createStore(reducer)
window.store = myStore
export default myStore;
