// Packages, config, etc.
import { firebase } from '../../config';

// Reducers
import {
  CLEAR_USER,
} from '../reducers/user';

// Functions
import { getUser } from './user';

//
// Get user from database and add them to redux store
export function logInUser(values, callback) {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then((data) => {
      dispatch(getUser(data.user.uid));
    })
    .catch((error) => {
      return callback();
    })
  };
}

//
// Logout user from the application
export function logOutUser() {
  return (dispatch) => {
    return firebase.auth().signOut()
    .then(() => {
      dispatch({ type: CLEAR_USER });
    })
    .catch((error) => {
      console.log(error);
    })
  };
}
