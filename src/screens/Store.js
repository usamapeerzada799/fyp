import { createStore } from 'redux';
import myReducer from "./Reducer"; // Importing the reducer

const Store = createStore(myReducer); // Creating the store with the reducer

export default Store;