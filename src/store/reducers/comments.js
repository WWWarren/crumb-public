// Get
export const GET_COMMENTS = 'GET_COMMENTS';

// Post
export const ADD_COMMENT = 'ADD_COMMENT';

const comments = (
  state = {
    list: [],
  }, action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      return {
        list: action.payload,
      };
    case 'ADD_COMMENT':
      return {
        list: state.list.concat(action.payload),
      };
    default:
      return state;
  }
};

export default comments;
