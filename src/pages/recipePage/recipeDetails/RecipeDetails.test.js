import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { RecipeDetails } from './RecipeDetails';

const createMockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createMockStore({});

  ReactDOM.render(
    <Provider store={store}>
      <RecipeDetails />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
