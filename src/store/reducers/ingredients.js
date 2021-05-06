// Get
export const GET_INGREDIENTS = 'GET_INGREDIENTS';

const ingredients = (
  state = {
    list: [],
  }, action) => {
  switch (action.type) {
    case 'GET_INGREDIENTS':
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default ingredients;
