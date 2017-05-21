import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import Admin from './admin';
import Organizations from './admin/organizations/index';
import Users from './admin/Users/index';
import Dashboard from './admin/Dashboard';

import configureStore from './store';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="admin" component={Admin}>
     	<IndexRoute component={Dashboard} />
        <Route path="organizations" component={Organizations} />
        <Route path="users" component={Users} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);