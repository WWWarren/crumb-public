import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";

import { RecipePage } from './RecipePage';

import { history } from '../../store/store';
import { recipes, ingredients } from '../../tests/dummyData';

const createMockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createMockStore({});

  const match = {
    params: {
      id: 'abc123'
    }
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <RecipePage
          match={match}
          recipes={recipes}
          ingredients={ingredients}
          getRecipe={() => {}}
          clearRecipe={() => {}}
        />
      </Router>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
