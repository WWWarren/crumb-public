// Packages, config, etc.
import database from '../../config';

// Reducers
import {
  GET_INGREDIENTS,
} from '../reducers/ingredients';


//
// Get list of ingredients
export function getIngredients() {
  //
  // Retreive recipes from database
  return (dispatch) => {
    return database.ref(`/ingredients`).once('value').then((snapshot) => {
      //
      // Create array of recipes from the returned values
      const ingredients = [];
      snapshot.forEach((childSnapShot) => {
        ingredients.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      //
      // Dispatch recipes to redux
      dispatch({
        type: GET_INGREDIENTS,
        payload: ingredients,
      });
    })
    .catch(() => {
      //
      // Show error if ingredients not retrieved
      console.log('ingredient not retrieved from database');
    });
  };
}

//
// Post ingredient to database
export function postIngredient(values, callback) {
  return (dispatch) => {
    //
    // Dispatch comment to database
    return database.ref(`/ingredients`).push(values)
    .then((ref) => {
        //
        // End function with callback
        // return callback();
    })
    .catch(() => {
      //
      // Show error if comment not added
      console.log('ingredient not added to database');
    });
  };
}
