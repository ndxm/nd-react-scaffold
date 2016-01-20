import React from 'react';
import { Route, Router, Link, Redirect } from 'react-router';
import index from './containers/index.js';
import login from './containers/login.js';
import tasks from './containers/tasks';


export default function getRoutes({ getState,dispatch }) {
    function requireAuth(nextState, replaceState, cb) {
        setTimeout(() => {
            if (!getState().auth) {
                replaceState(null,'/login');
            }
            cb();
        },0);
    }

    return (
        <Router>
            <Redirect from="/" to="/tasks" />
            <Route path="login" component={login} />
            <Route path="/" component={index} onEnter={requireAuth}>
                <Route path="tasks" component={tasks} />
            </Route>
        </Router>
    );
}
