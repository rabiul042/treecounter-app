import React, { Component } from 'react';
import { Provider } from 'react-redux';

import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
import GlobalErrorBoundary from '../ErrorBoundry/globalErrorBoundry';
import Icon from 'react-native-vector-icons/FontAwesome';

let store;
Icon.loadFont();
export default class App extends Component {
  constructor() {
    super();
    store = configureStore();
  }

  render() {
    return (
      <Provider store={store}>
        <GlobalErrorBoundary>
          <TreeCounter />
        </GlobalErrorBoundary>
      </Provider>
    );
  }
}

export const getStore = () => store;
