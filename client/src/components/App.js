// npm imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components imports
import Layout from './core/Layout';
import Home from './Home';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import TaskInit from './tasks/TaskInit';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';

export default function App() {
	return (
		<Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/signin' component={Signin} />
                    <Route exact path='/auth/activate/:token' component={Activate} />
                    <Route exact path='/private' component={TaskInit} />
                    <Route exact path='/auth/password/forgot' component={ForgotPassword} />
                    <Route exact path='/auth/password/reset/:token' component={ResetPassword} />
                </Switch>
            </Layout>
        </Router>
	);
}
