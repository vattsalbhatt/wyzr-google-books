export const RECENT_SEARCH_RESULTS = "RECENT_SEARCH_RESULTS";

//Search Results action
export const recentSearchResults = (results) => ({
  type: RECENT_SEARCH_RESULTS,
  payload: results,
});
