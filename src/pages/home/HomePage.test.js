import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";

import { HomePage } from './HomePage';

import { history } from '../../store/store';
import { users } from '../../tests/dummyData';

const createMockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createMockStore({});

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <HomePage
          user={users[0]}
          getIngredients={() => {}}
          getUsers={() => {}}
        />
      </Router>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
