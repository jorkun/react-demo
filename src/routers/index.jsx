import React, { Component } from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from 'components/app';
import Dashboard from '../components/dashboard/index';
import Login from 'components/login';

function validate() {
    // 在路由群载入时做 filter 处理
}
class RoutesMap extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/login" component={Login} />
                <Route path="/" onEnter={validate} component={App}>
                    <IndexRedirect to="dashboard" />
                    <Route path="dashboard" component={Dashboard} />
                </Route>
                {/* <Route path="*" component={NotFound} /> */}
            </Router>);
    }
}


export default RoutesMap;
