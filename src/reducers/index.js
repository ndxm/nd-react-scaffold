/**
 * Created by Administrator on 2015/12/7.
 */

import auth from './auth.js';
import task from './task.js';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux'

export default combineReducers({
    auth,
    task,
    router
});
