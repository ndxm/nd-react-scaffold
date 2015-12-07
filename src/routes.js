import React from 'react';
import { Route, Router, Link, Redirect } from 'react-router';
import index from './containers/index.js';
import login from './containers/login.js';
import tasks from './containers/tasks';


export default function getRoutes({ getState,dispatch }) {
    return (
        <Router>
            <Redirect from="/" to="/login" />
            <Route path="/" component={index}>
                <Route path="login" component={login} />
                <Route path="tasks" component={tasks} />
            </Route>
        </Router>
    );
}
