// Get
export const GET_SEARCH = 'GET_SEARCH';

// Post

// Misc.
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export default (
  state = {
    selected: null,
  }, action) => {
  switch (action.type) {
    case 'GET_SEARCH':
      return {
        selected: action.payload,
      };
    case 'CLEAR_SEARCH':
      return {
        selected: null,
      }
    default:
      return state;
  }
};
