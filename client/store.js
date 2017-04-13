import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { routerReducer } from 'react-router-redux'
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction'

export default function configureStore(initialState) {
  return createStore(combineReducers({orgs:reducers, routing:routerReducer}), initialState, compose(
    applyMiddleware(thunk),
    devToolsEnhancer()
  ));
}