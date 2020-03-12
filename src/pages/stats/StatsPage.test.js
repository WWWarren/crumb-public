import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { StatsPage } from './StatsPage';

import { ingredients, comments, users, recipes } from '../../tests/dummyData';

const createMockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createMockStore({});

  ReactDOM.render(
    <Provider store={store}>
      <StatsPage
        ingredients={ingredients}
        comments={comments}
        user={users[0]}
        recipes={recipes}
      />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
