export const RECENT_SEARCH_RESULTS = "RECENT_SEARCH_RESULTS";

export const recentSearchResults = (results) => ({
  type: RECENT_SEARCH_RESULTS,
  payload: results,
});
