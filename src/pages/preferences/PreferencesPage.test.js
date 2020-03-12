import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { PreferencesPage } from './PreferencesPage';

const createMockStore = configureMockStore([thunk]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = createMockStore({});

  ReactDOM.render(
    <Provider store={store}>
      <PreferencesPage />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
