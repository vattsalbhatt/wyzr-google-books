import { combineReducers, createStore } from "redux";
import { searchResultsReducer } from "./Search/reducer";

const rootReducer = combineReducers({
  searchResults: searchResultsReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
