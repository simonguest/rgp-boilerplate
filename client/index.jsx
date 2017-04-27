import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import Admin from './admin/containers/Admin';
import OrgPanel from './admin/containers/OrgPanel';
import UserPanel from './admin/containers/UserPanel';
import Dashboard from './admin/components/Dashboard';

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