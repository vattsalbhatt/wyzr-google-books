import { RECENT_SEARCH_RESULTS } from "./action";
const initState = {
  searchResults: [],
};

export const searchResultsReducer = (store = initState, { type, payload }) => {
  // console.log("seach Store", store);

  switch (type) {
    case RECENT_SEARCH_RESULTS:
      return { ...store, searchResults: payload };

    default:
      return store;
  }
};
