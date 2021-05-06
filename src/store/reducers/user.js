// Get
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';

// Post
export const ADD_RECIPE_ID = 'ADD_RECIPE_ID';
export const UPDATE_USER = 'UPDATE_USER';

// Misc.
export const CLEAR_USER = 'CLEAR_USER';

const user = (
  state = {
    list: [],
    activeUser: null,
  }, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        list: action.payload,
      };
    case 'GET_USER':
      return {
        ...state,
        activeUser: action.payload
      };
    case 'UPDATE_USER':
    return {
      ...state,
      activeUser: action.payload,
    }
    case 'CLEAR_USER':
      return {};
    default:
      return state;
  }
};

export default user;