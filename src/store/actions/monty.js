// Packages, config, etc.
import database from '../../config';
import { history } from '../store';

// Reducers
import { GET_SEARCH, CLEAR_SEARCH } from '../reducers/monty';

// Functions

//
// Get search record from database
export function getSearch(id, callback) {
  //
  // Retreive recipes from database
  return (dispatch) => {
    return database.ref(`/searches/`).once('value').then((snapshot) => {
      //
      // Create array of recipes from the returned values
      const searches = [];
      snapshot.forEach((childSnapShot) => {
        searches.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      //
      // Filter out requested recipe from list of recipes
      const search = searches.filter(r => r.id === id);
      //
      // Dispatch recipe to redux
      dispatch({
        type: GET_SEARCH,
        payload: search[0],
      })
      //
      // Callback
      return callback();
    })
    .catch(() => {
      //
      // Show error if comment not added
      console.log('recipe not returned from database');
    });
  }
}

//
// Post search record to database
export function postSearch(values) {
  return () => {
    //
    // Dispatch search to database
    return database.ref(`/searches`).push(values)
    .then((data) => {
      console.log(data.key);
      history.push(`/monty/${data.key}`)
    })
    .catch(() => {
      //
      // Show error if search not added
      console.log('search not added to database');
    });
  };
}

//
// Clear selected search from redux
export function clearSearch() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SEARCH
    });
  };
}
