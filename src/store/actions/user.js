// Packages, config, etc.
import database, { firebase } from '../../config';

// Reducers
import {
  GET_USER,
  GET_USERS,
  UPDATE_USER
} from '../reducers/user';

//
// Get list of users
export function getUsers() {
  //
  // Retreive users from database
  return (dispatch) => {
    return database.ref(`/users`).once('value').then((snapshot) => {
      //
      // Create array of users from the returned values
      const users = [];
      snapshot.forEach((childSnapShot) => {
        users.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      //
      // Dispatch users to redux
      dispatch({
        type: GET_USERS,
        payload: users,
      });
    });
  };
}

//
// Get specific user
export function getUser(id) {
  //
  // Retreive users from database
  return (dispatch) => {
    return database.ref(`/users`).once('value').then((snapshot) => {
      //
      // Create array of users from the returned values
      const users = [];
      snapshot.forEach((childSnapShot) => {
        users.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      //
      // Filter out requested user from list of users
      const user = users.filter(u => u.id === id);
      //
      // Dispatch user to redux
      dispatch({
        type: GET_USER,
        payload: user[0],
      });
    })
    .catch(() => {
      //
      // Show error if comment not added
      console.log('user not returned from database');
    });
  }
}

//
// Post user to database
export function postUser(values, callback) {
  return (dispatch, getState) => {
    //
    // Dispatch user to database on successful form submission
    return firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(() => {
      const user = firebase.auth().currentUser;
      const obj = {
        id: user.uid,
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        age: values.age,
        email: values.email
      }
      database.ref(`/users`).child(user.uid).set(obj);
      callback();
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

//
// Update user object in database and store
export function updateUserDetails(values) {
  console.log(values);
  return (dispatch) => {
    //
    // Dispatch user to database
    return database.ref(`/users/${values.id}`).update(values).then((ref) => {
      console.log('hit');
        //
        // Dispatch updated recipe to redux
        dispatch({
          type: UPDATE_USER,
          payload: values
        });
    })
    .catch(() => {
      //
      // Show error if comment not added
      console.log('user not updated in database');
    });
  };
}

//
// Update user email address
export function updateUserEmail(values, callback) {
  const user = firebase.auth().currentUser;
  user.updateEmail(values.email)
    .then(() => {
      callback('success');
    })
    .catch(() => {
      callback('failure');
    });
}


//
// Update user password
export function updateUserPassword(values, callback) {
  const user = firebase.auth().currentUser;
  user.updatePassword(values.password)
    .then(() => {
      callback('success');
    })
    .catch(() => {
      callback('failure');
    });
}
