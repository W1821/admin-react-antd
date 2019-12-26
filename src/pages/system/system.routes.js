import React from 'react';
import {Route} from 'react-router-dom';

import UserList from '../../pages/system/user/list/UserList';
import RoleList from '../../pages/system/role/list/RoleList';
import MenuList from '../../pages/system/menu/list/MenuList';


const systemRoutes = [

    <Route exact key='/main/system/user/list' path='/main/system/user/list' component={UserList}/>,

    <Route exact key='/main/system/role/list' path='/main/system/role/list' component={RoleList}/>,

    <Route exact key='/main/system/menu/list' path='/main/system/menu/list' component={MenuList}/>,

];
export default systemRoutes;
