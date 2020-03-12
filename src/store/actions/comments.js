// Packages, config, etc.
import database from '../../config';

// Reducers
import { GET_COMMENTS, ADD_COMMENT } from '../reducers/comments';

// Functions
import { updateRecipe } from './recipes';


//
// Get list of comments for specific recipe
export function getComments() {
  //
  // Retreive comments from database
  return (dispatch) => {
    return database.ref(`/comments`).once('value').then((snapshot) => {
      //
      // Create array of comments from the returned values
      const comments = [];
      snapshot.forEach((childSnapShot) => {
        comments.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      //
      // Dispatch comments to redux
      dispatch({
        type: GET_COMMENTS,
        payload: comments,
      })
    })
    .catch(() => {
      console.log('comments not returned')
    });
  };
}


//
// Post comment to database and link comment id to recipe
export function postComment(values, recipe, callback) {
  return (dispatch, getState) => {
    //
    // Dispatch comment to database
    return database.ref(`/comments`).push(values).then((ref) => {
        //
        // Create comment object with new id
        const obj = {
          id: ref.key,
          ...values,
        }
        //
        // Dipstach comment to redux
        dispatch({
          type: ADD_COMMENT,
          payload: obj,
        })
        //
        // Get current recipe from recipe list & add comment id to it
        const recipes = getState().recipes.list;
        const currentRecipe = recipes.find(r => r.id === recipe);
        const comments = currentRecipe.comments || [];
        const newRecipeComment = {
          ...currentRecipe,
          comments: comments.concat(obj.id),
        }
        //
        // Send updated recipe to database and redux
        dispatch(updateRecipe(newRecipeComment));
        //
        // End function with callback
        return callback();
    })
    .catch(() => {
      //
      // Show error if comment not added
      console.log('comment not added to database');
    });
  };
}
