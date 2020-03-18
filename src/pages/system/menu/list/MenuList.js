import React, {Component} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Table} from 'antd';
import MenuEdit from '../edit/MenuEdit';
import {TableOperationColumn} from '../../../../components';

import './MenuList.css';

import ButtonAuthService from '../../../main/button-auth.service';

import menuService from '../menu.service';
import columns from './table-columns';

class MenuList extends Component {


    state = {
        dataSource: [],
        loading: false,         // 是否正在加载数据
        expandedRowKeys: [],
        authButtons: {
            search: false,
            add: false,
            addSub: false,
            edit: false,
            delete: false,
        }
    };

    constructor(props) {
        super(props);
        this.state.authButtons = ButtonAuthService.getButtonAuth(this.state.authButtons, this.props.location.pathname);
    }

    componentDidMount() {
        this.search();
    }

    componentWillUnmount() {
        this.setState = () => {
        };
    }

    search = () => {
        console.log(this.state.authButtons);
        if (!this.state.authButtons.search) {
            return;
        }
        console.log('search', this.state.authButtons.search);
        this.setState({loading: true});
        menuService.list().then(res => {
            this.setState({loading: false});
            if (res) {
                const menus = menuService.getSortedMenuList(res.data);
                const tableTree = menuService.getMenuTree(menus);
                const expandedRowKeys = menus.map(menu => menu.id);
                this.setState({dataSource: tableTree, expandedRowKeys});
            }
        });
    };

    add = (item) => {
        if (!this.state.authButtons.add) {
            return;
        }
        this.menuEditRef.openAddModal(item.id);
    };

    edit = (item) => {
        if (!this.state.authButtons.edit) {
            return;
        }
        this.menuEditRef.openEditModal(item.id);
    };

    delete = (item) => {
        if (!this.state.authButtons.delete) {
            return;
        }
        menuService.delete(item.id).then(res => {
            if (res) {
                this.search();
            }
        });
    };

    getDefaultOperationColumn = () => {
        const options = [];
        if (this.state.authButtons.edit) {
            options.push({
                icon: 'edit',
                title: '编辑',
                type: 'button',
                buttonType: 'primary',
                option: record => this.edit(record),
            });
        }
        if (this.state.authButtons.delete) {
            options.push({
                icon: 'delete',
                title: '删除',
                type: 'confirm',
                buttonType: 'danger',
                confirmTitle: '是否确认删除?',
                option: record => this.delete(record),
            });
        }
        if (this.state.authButtons.addSub) {
            options.push({
                icon: 'plus',
                title: '添加下级',
                type: 'button',
                showButton: record => record.pids.split(',').length < 2,
                option: record => this.add(record),
            });
        }
        return {
            title: '操作',
            dataIndex: 'operation',
            fixed: false,
            width: 320,
            render: (text, record) => (<TableOperationColumn record={record} options={options}/>)
        };
    };

    render() {
        const {add, addSub, edit} = this.state.authButtons;
        const tableColumns = [...columns];
        if (edit || this.state.authButtons.delete) {
            tableColumns.push(this.getDefaultOperationColumn());
        }
        return (
            <div>

                {add ? <Button className='add-button' type='dashed' icon={<PlusOutlined />} onClick={this.add}>添加</Button> : null}

                <Table
                    columns={tableColumns}
                    dataSource={this.state.dataSource}
                    expandedRowKeys={this.state.expandedRowKeys}
                    loading={this.state.loading}
                    pagination={false}
                    className='table'
                    rowKey='id'
                    bordered/>

                {
                    add || addSub || edit ?
                        <MenuEdit
                            menuTreeData={this.state.dataSource}
                            onRef={ref => this.menuEditRef = ref}
                            saveSuccess={this.search}/>
                        : null
                }

            </div>
        );
    }
}

export default MenuList;

