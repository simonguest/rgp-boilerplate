import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducers from './app/reducers/organizations'
import { routerReducer } from 'react-router-redux'

export default function configureStore(initialState) {
  return createStore(combineReducers({orgs:reducers, routing:routerReducer}), initialState, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));
}