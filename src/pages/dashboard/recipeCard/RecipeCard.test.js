import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import RecipeCard from './RecipeCard';

import { recipes } from '../../../tests/dummyData';

const createMockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createMockStore({ ingredients: { list: ['ui1', 'ui2']}});

  ReactDOM.render(
    <Provider store={store}>
      <RecipeCard recipe={recipes[0]} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
