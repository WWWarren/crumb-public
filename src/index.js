import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import 'normalize.css/normalize.css';

import configureStore from './store/store';

import Routing from './routing/Routing';

import Container from './components/layout/Container';
import './styles/global.scss';

const { store, persistor } = configureStore();
const app =
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Container
        height="100%"
        flexDirection="column"
      >
        <Routing />
      </Container>
    </PersistGate>
  </Provider>

ReactDOM.render(app, document.getElementById('root'));
