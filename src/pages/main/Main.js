import React, {Component} from 'react';
import {Avatar, Breadcrumb, Button, Dropdown, Icon, Layout, Menu, Progress} from 'antd';

import './Main.css';

import MainContent from './MainContent';
import ModifyPwdModal from './ModifyPwdModal';

import history from '../../common/config/history';
import NotificationService from '../../common/service/NotificationService';
import loginService from '../login/login.service';
import mainService from './main.service';

const {SubMenu} = Menu;
const {Header, Sider, Footer} = Layout;

class Main extends Component {

    state = {
        progress: 0, // 进度条

        userInfo: {},

        headerMenu: {
            treeData: [],
            selectedMenu: {},
            defaultSelectedKeys: [],
        },

        leftMenu: {
            treeData: [],
            selectedLeftMenu: {},          // 展开的左边二级菜单
            selectedSubMenu: {},           // 打开的左边三级菜单
            openKeys: [],                   // 展开的二级菜单key数组
            selectedKeys: [],               // 选中的三级菜单key数组
        },
    };

    componentDidMount() {
        const userInfo = loginService.getUserInfo();
        // 没有登录跳转登陆页面
        if (!userInfo) {
            history.push('/login');
            return;
        }

        // 当前登录用户
        this.setState({userInfo});
        // 设置默认数据
        this.setDefaultMenuDataArr();
    };

    /** ========================================== 可用代码 方法 start  ========================================= */

    /**
     * 设置默认数据
     */
    setDefaultMenuDataArr = () => {
        const heardMenuTreeData = mainService.getMenuDataTree();

        let headerMenu = this.state.headerMenu;
        headerMenu.treeData = heardMenuTreeData;
        this.setState({headerMenu});

        if (this.f5Refresh()) {
            return;
        }

        // 点击默认的头部菜单
        const defaultHeaderMenu = heardMenuTreeData[0];
        this.clickHeaderMenu(defaultHeaderMenu);

        // 点击默认左边二级菜单
        const defaultLeftMenu = defaultHeaderMenu.children[0];
        this.clickLeftMenu(defaultLeftMenu);

        // 点击默认左边三级菜单
        const defaultSubMenu = defaultLeftMenu.children[0];
        this.clickSubMenu(defaultSubMenu);
    };

    /**
     * F5刷新逻辑
     */
    f5Refresh = () => {
        const redirectUrl = mainService.getRedirectUrl();
        if (!redirectUrl) {
            return false;
        }
        const subMenu = mainService.getMenuDataList().find(menu => menu.routePath === redirectUrl);
        if (!subMenu) {
            return false;
        }
        const leftMenu = mainService.getMenuDataList().find(menu => menu.id === subMenu.pid);
        if (!leftMenu) {
            return false;
        }
        const headerMenu = mainService.getMenuDataList().find(menu => menu.id === leftMenu.pid);
        if (!headerMenu) {
            return false;
        }

        console.log('Main->F5刷新逻辑');
        this.clickHeaderMenu(headerMenu);
        this.clickLeftMenu(leftMenu);
        this.clickSubMenu(subMenu);
        return true;
    };

    /**
     * 头部菜单点击事件
     * @param menu 头部菜单
     */
    clickHeaderMenu = (menu) => {
        if (!menu) {
            return;
        }

        // 设置当前选中的头部菜单
        const headerMenu = this.state.headerMenu;
        headerMenu.selectedMenu = menu;
        headerMenu.defaultSelectedKeys = [menu.id + ''];
        this.setState({headerMenu});

        // 切换二级菜单
        const leftMenu = this.state.leftMenu;
        leftMenu.treeData = menu.children;
        this.setState({leftMenu});
    };

    /**
     * 左边二级菜单点击事件
     * @param menu 二级菜单
     */
    clickLeftMenu = (menu) => {
        if (!menu) {
            return;
        }
        // 设置当前选中的二级菜单
        const leftMenu = this.state.leftMenu;
        leftMenu.selectedLeftMenu = menu;
        leftMenu.openKeys = [menu.id + ''];
        this.setState({leftMenu});
    };

    /**
     * 左边三级菜单点击事件
     * @param subMenu 三级菜单
     */
    clickSubMenu = (subMenu) => {
        if (!subMenu) {
            return;
        }
        // 设置当前选中的三级菜单
        const leftMenu = this.state.leftMenu;
        leftMenu.selectedSubMenu = subMenu;
        leftMenu.selectedKeys = [subMenu.id + ''];
        this.setState({leftMenu});

        // 路由配置错误，跳转到404页面
        if (!subMenu.routePath) {
            NotificationService.error('配置错误，请联系开发人员');
            return;
        }

        // 跳转路由
        if (this.props.location.pathname === subMenu.routePath) {
            return;
        }
        mainService.setRedirectUrl(subMenu.routePath);
        history.push(subMenu.routePath);
    };

    /** ========================================== 可用代码 方法 end  ========================================= */

    /** ========================================== 可用代码 事件 start========================================= */

    onClickHeaderMenu = (item) => {
        const headerMenu = mainService.getMenuDataList().find(menu => menu.id + '' === item.key);
        this.clickHeaderMenu(headerMenu);
    };


    onClickTopRightMenu = (item) => {
        if (item.key === '1') {
            this.changePwdModal.openModal();
        } else {
            loginService.logout().then(() => history.push('/login')); // 退出
        }
    };

    onClickLeftMenu = (item) => {
        // 修改选中菜单样式
        // this.updateStateSelectedKeys(item);
        // 跳转子路由
        const subMenu = mainService.getMenuDataList().find(menu => menu.id + '' === item.key);
        this.clickSubMenu(subMenu);

    };

    /**
     * 左边二级菜单只展开当前父级菜单
     * @param openKeys
     */
    onLeftMenuOpenChange = openKeys => {
        const leftMenu = this.state.leftMenu;
        if (openKeys) {
            leftMenu.openKeys = [openKeys.pop()];
        } else {
            leftMenu.openKeys = [];
        }
        this.setState({leftMenu});
    };

    /** ========================================== 可用代码 事件 end========================================= */

    /** ========================================== 可用代码 渲染相关 start=================================== */

    /**
     * 左上角操作按钮
     * @returns {*}
     */
    createTopRightInfo = () => {
        const userInfo = this.state.userInfo;
        return (
            <div className='user-info'>
                <div className='name'>欢迎您！{userInfo.userName}</div>
                <Avatar src={userInfo ? userInfo.headPictureUrl : ''} className='avatar' icon='user'/>
                <Dropdown className='dropdown' overlay={this.createUserInfoDropdownMenu()}>
                    <Button>更多操作<Icon type="down"/></Button>
                </Dropdown>
            </div>
        );
    };

    createUserInfoDropdownMenu = () => {
        return (
            <Menu onClick={this.onClickTopRightMenu}>
                <Menu.Item key="1"><Icon type="unlock"/>修改密码</Menu.Item>
                <Menu.Item key="2"><Icon type="logout"/>退出</Menu.Item>
            </Menu>
        );
    };

    /**
     * 创建头部菜单
     */
    createHeaderMenu = () => {
        const headerMenu = this.state.headerMenu;
        if (headerMenu.treeData.length > 0) {
            const defaultSelectedKeys = headerMenu.defaultSelectedKeys;
            return (
                <Menu className='header-menu'
                      defaultSelectedKeys={defaultSelectedKeys}
                      onClick={this.onClickHeaderMenu}
                      theme='dark'
                      mode='horizontal'>
                    {
                        headerMenu.treeData.map(menu => {
                            return <Menu.Item key={menu.id}><Icon type={menu.icon}/>{menu.menuName}</Menu.Item>;
                        })
                    }
                </Menu>
            );
        }
    };


    /**
     * 遍历生成左边菜单
     * @returns {Array}
     */
    createLeftMenu = () => {
        const leftMenu = this.state.leftMenu;
        if (leftMenu.treeData && leftMenu.treeData.length > 0) {

            const leftSubMenu = leftMenu.treeData
                .map((item) => {
                    const title = <span><Icon type={item.icon}/>{item.menuName}</span>;
                    const children = item.children
                        .map(menu => <Menu.Item key={menu.id}>{menu.menuName}</Menu.Item>);
                    return <SubMenu key={item.id} title={title} children={children}/>;
                });

            return (
                <Menu mode='inline'
                      openKeys={leftMenu.openKeys}
                      selectedKeys={leftMenu.selectedKeys}
                      onOpenChange={this.onLeftMenuOpenChange}
                      onClick={this.onClickLeftMenu}
                >
                    {leftSubMenu}
                </Menu>
            );
        }
    };


    /** ========================================== 可用代码 渲染相关 end======================================= */

    render() {
        return (
            <Layout>

                <Header>
                    <div className="logo"/>
                    {this.createTopRightInfo()}
                    {this.createHeaderMenu()}
                </Header>

                <Layout>

                    <Sider className="left-menu"
                           theme='light'
                           collapsed={this.state.collapsed}
                           onCollapse={this.onCollapse}>
                        {this.createLeftMenu()}
                    </Sider>
                    <Layout>

                        <Layout className="layout-content">
                            <Breadcrumb className="breadcrumb">
                                <Breadcrumb.Item
                                    key='1'> {this.state.headerMenu.selectedMenu.menuName}</Breadcrumb.Item>
                                <Breadcrumb.Item
                                    key='2'> {this.state.leftMenu.selectedLeftMenu.menuName}</Breadcrumb.Item>
                                <Breadcrumb.Item
                                    key='3'> {this.state.leftMenu.selectedSubMenu.menuName}</Breadcrumb.Item>
                            </Breadcrumb>

                            <MainContent/>

                        </Layout>
                    </Layout>

                </Layout>
                <Footer className='footer'>xxx后台管理系统</Footer>

                <ModifyPwdModal onRef={ref => this.changePwdModal = ref}/>

            </Layout>
        );
    }

}

export default Main;
