import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { FilterBar } from './FilterBar';

import { filters } from '../../../tests/dummyData';

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Provider store={store}>
      <FilterBar filters={filters} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
