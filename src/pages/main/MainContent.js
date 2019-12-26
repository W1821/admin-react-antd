import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';


import './MainContent.css';

import Blank from '../base/blank/Blank';
import Welcome from '../base/welcome/Welcome';
import systemRoutes from '../system/system.routes';
import mainService from './main.service';

const {Content} = Layout;

class MainContent extends Component {

    state = {
        routeItems: [
            <Route key='/main/welcome' path='/main/welcome' component={Welcome}/>,
            ...systemRoutes,
        ],
    };

    componentDidMount() {
        this.renderRouteItems();
    }

    renderRouteItems = () => {
        const menuList = mainService.getMenuDataList();
        if (!menuList || menuList.length === 0) {
            return;
        }
        const routePaths = menuList.filter(menu => menu.routePath).map(menu => menu.routePath);
        const routeItems = this.state.routeItems.filter(router => {
            for (let routePath of routePaths) {
                if (router.props.path === routePath) {
                    return true;
                }
            }
            return false;
        });
        this.setState({routeItems});
    };

    render() {
        return (
            <Content className="content">
                <Switch>
                    <Route exact path='/main' component={Blank}/>
                    {this.state.routeItems}
                    <Redirect to='/login'/>
                </Switch>
            </Content>
        );
    }

}

export default MainContent;
