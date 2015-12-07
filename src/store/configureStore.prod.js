import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes';
import thunk from 'redux-thunk';
import apiRequester from '../middleware/apiRequester';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, apiRequester),
  reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
