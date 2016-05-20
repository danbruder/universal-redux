import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
import getRoutes from 'universal-redux/routes';
import AsyncProps from '../../vendor/async-props';

export default function(store, devComponent) {
  const root = (
    <Provider store={store} key="provider">
      <div>
        <Router render={(props) => <AsyncProps {...props} />} history={browserHistory}>
          {getRoutes(store)}
        </Router>
        {devComponent}
      </div>
    </Provider>
  );

  return Promise.resolve(root);
}
