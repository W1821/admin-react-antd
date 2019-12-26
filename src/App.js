import React, {Component} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';

import Login from './pages/login/Login';
import Main from './pages/main/Main';

import './App.css';

class App extends Component {

    componentDidMount() {
        console.log('App componentDidMount', ' react 17 版本将会移除 componentWillMount、componentWillReceiveProps、componentWillUpdate 3个生命周期方法，请不要使用这几个方法');
    }

    linkToLogin = (props) => {
        return <Login {...props}/>;
    };

    linkToMain = (props) => {
        return <Main {...props}/>;
    };

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' render={this.linkToLogin}/>
                    <Route path='/login' render={this.linkToLogin}/>
                    <Route path='/main' render={this.linkToMain}/>
                    <Redirect to='/login'/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
