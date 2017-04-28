import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app';
import Admin from './admin';
import OrgPanel from './admin/organizations/index';
import UserPanel from './admin/users/index';
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
        <Route path="organizations" component={OrgPanel} />
        <Route path="users" component={UserPanel} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);