import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from './store';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);