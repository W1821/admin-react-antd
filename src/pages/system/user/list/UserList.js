import React, {Component} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {ListTable, TableOperationColumn, SearchForm} from '../../../../components';
import UserEdit from '../edit/UserEdit';

import './UserList.css';

import ButtonAuthService from '../../../main/button-auth.service';
import userService from '../user.service';

import formFields from './search.form-field';
import columns from './table-columns';

class UserList extends Component {

    state = {
        showModal: false,
        authButtons: {
            search: false,
            add: false,
            edit: false,
            delete: false,
        },
        searchBody: {},
    };

    constructor(props) {
        super(props);
        this.state.authButtons = ButtonAuthService.getButtonAuth(this.state.authButtons, this.props.location.pathname);
    }

    search = (searchBody) => {
        if (!this.state.authButtons.search) {
            return;
        }
        this.setState({searchBody}, this.reload);
    };

    reload = () => {
        this.listTableRef.search();
    };


    add = () => {
        if (!this.state.authButtons.add) {
            return;
        }
        this.userEditRef.openAddModal();
    };

    edit = (item) => {
        if (!this.state.authButtons.edit) {
            return;
        }
        this.userEditRef.openEditModal(item.id);
    };

    delete = (item) => {
        if (!this.state.authButtons.delete) {
            return;
        }
        userService.delete(item.id).then(res => {
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
                option: (record) => this.edit(record),
            });
        }
        if (this.state.authButtons.delete) {
            options.push({
                icon: 'delete',
                title: '删除',
                type: 'confirm',
                buttonType: 'danger',
                confirmTitle: '是否确认删除?',
                option: (record) => this.delete(record),
            });
        }
        return {
            title: '操作',
            dataIndex: 'operation',
            fixed: false,
            width: 250,
            render: (text, record) => (<TableOperationColumn record={record} options={options}/>)
        };

    };

    render() {
        const {search, add, edit} = this.state.authButtons;
        const tableColumns = [...columns];
        if (edit || this.state.authButtons.delete) {
            tableColumns.push(this.getDefaultOperationColumn());
        }
        return (
            <div>

                {search ? <SearchForm formFields={formFields} onSearch={this.search}/> : null}

                {add ? <Button className='add-btn' type='dashed' icon={<PlusOutlined/>} onClick={this.add}>添加</Button> : null}

                <ListTable
                    dataSourceUrl='/user/list'
                    searchBody={this.state.searchBody}
                    onRef={ref => this.listTableRef = ref}
                    columns={tableColumns}/>

                {add || edit ? <UserEdit onRef={ref => this.userEditRef = ref} saveSuccess={this.reload}/> : null}

            </div>
        );
    }
}

export default UserList;
