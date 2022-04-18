import { combineReducers, createStore } from "redux";
import { searchResultsReducer } from "./Search/reducer";

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
});

//creating the store & updating the store

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
