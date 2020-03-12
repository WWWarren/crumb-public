// Packages, config, etc.
import database from '../../config';

// Functions
import { updateUserDetails } from './user';

// Reducers
import {
  GET_RECIPES,
  GET_RECIPE,
  CLEAR_RECIPE,
  ADD_RECIPE,
  UPDATE_RECIPE,
} from '../reducers/recipes';

//
// Get list of recipes
export function getRecipes() {
  //
  // Retreive recipes from database
  return (dispatch) => {
    return database.ref(`/recipes`).once('value').then((snapshot) => {
      //
      // Create array of recipes from the returned values
      const recipes = [];
      snapshot.forEach((childSnapShot) => {
        recipes.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      //
      // Dispatch recipes to redux
      dispatch({
        type: GET_RECIPES,
        payload: recipes,
      });
      // Return
      return null;
    });
  };
}

//
// Get specific recipe
export function getRecipe(id, callback) {
  //
  // Retreive recipes from database
  return (dispatch) => {
    return database.ref(`/recipes/`).once('value').then((snapshot) => {
      //
      // Create array of recipes from the returned values
      const recipes = [];
      snapshot.forEach((childSnapShot) => {
        recipes.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      //
      // Filter out requested recipe from list of recipes
      const recipe = recipes.filter(r => r.id === id);
      //
      // Dispatch recipe to redux
      dispatch({
        type: GET_RECIPE,
        payload: recipe[0],
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
// Post recipe to database and link recipe to user
export function postRecipe(values, callback) {
  return (dispatch, getState) => {
    //
    // Dispatch comment to database
    return database.ref(`/recipes`).push(values).then((ref) => {
        //
        // Create comment object with new id
        const obj = {
          id: ref.key,
          ...values,
        }
        //
        // Dipstach comment to redux
        dispatch({
          type: ADD_RECIPE,
          payload: obj,
        })
        //
        // Add recipe Id to current user logged in
        let user = getState().user.activeUser;
        user = {
          ...user,
          recipes: user.recipes || []
        };

        const addRecipe = user.recipes.concat(obj.id);

        user = {
          ...user,
          recipes: addRecipe
        };

        dispatch(updateUserDetails(user));
        //
        // End function with callback
        return callback();
    })
    .catch(() => {
      //
      // Show error if comment not added
      console.log('recipe not added to database');
    });
  };
}


//
// Post recipe to database and link recipe to user
export function updateRecipe(values) {
  return (dispatch) => {
    //
    // Dispatch comment to database
    return database.ref(`/recipes/${values.id}`).update(values).then((ref) => {
        //
        // Create comment object with new id
        const obj = {
          ...values,
        }
        //
        // Dispatch updated recipe to redux
        // (Will update list of recipes and selected recipe)
        dispatch({
          type: UPDATE_RECIPE,
          id: obj.id,
          updates: obj,
        });
    })
    .catch(() => {
      //
      // Show error if comment not added
      console.log('recipe not updated in database');
    });
  };
}


//
// Clear selected recipe from redux
export function clearRecipe() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_RECIPE
    });
  };
}
