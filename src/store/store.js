import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer as formReducer } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import commentsReducer from './reducers/comments';
import ingredientsReducer from './reducers/ingredients';
import recipesReducer from './reducers/recipes';
import montyReducer from './reducers/monty';

// Create master reducer
const reducers = combineReducers({
  router,
  user: userReducer,
  comments: commentsReducer,
  ingredients: ingredientsReducer,
  recipes: recipesReducer,
  form: formReducer,
  monty: montyReducer,
});

// Create persist reducer
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['form']
};
const persistedReducer = persistReducer(persistConfig, reducers);

// Create history variable to be used for all components inside and outside the routing switch
export const history = createBrowserHistory({ basename: '/crumb' });

// Create redux store & Add redux persist
export default () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return { persistor, store };
};
