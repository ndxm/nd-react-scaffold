import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createHashHistory';
import routes from '../routes';
import thunk from 'redux-thunk';
import apiRequester from '../middleWare/apiRequester';
import assembleApiRequester from '../middleWare/assembledApiRequester.js'
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, apiRequester, assembleApiRequester),
  reduxReactRouter({ routes, createHistory })
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}
