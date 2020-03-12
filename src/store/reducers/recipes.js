// Get
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE = 'GET_RECIPE';

// Post
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';

// Misc.
export const CLEAR_RECIPE = 'CLEAR_RECIPE';

export default (
  state = {
    list: [],
    selected: null,
  }, action) => {
  switch (action.type) {
    case 'GET_RECIPES':
      return {
        ...state,
        list: action.payload,
      };
    case 'GET_RECIPE':
      return {
        ...state,
        selected: action.payload,
      };
    case 'ADD_RECIPE':
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    case 'UPDATE_RECIPE':
      return {
        ...state,
        list: state.list.map((r) => {
          if (r.id === action.id) {
            return {
              ...r,
              ...action.updates,
            }
          } else {
            return r;
          }
        }),
        selected: action.updates
      }
    case 'CLEAR_RECIPE':
      return {
        ...state,
        selected: null,
      }
    default:
      return state;
  }
};
