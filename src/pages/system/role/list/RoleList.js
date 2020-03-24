import React, {Component} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {ListTable, SearchForm, TableOperationColumn} from '../../../../components';
import RoleEdit from '../edit/RoleEdit';

import './RoleList.css';

import ButtonAuthService from '../../../main/button-auth.service';
import roleService from '../role.service';

import formFields from './search.form-field';
import columns from './table-columns';

class RoleList extends Component {

    state = {
        searchBody: {},
        authButtons: {
            search: false,
            add: false,
            edit: false,
            delete: false,
        }
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
        this.roleEditRef.openAddModal();
    };

    edit = (item) => {
        if (!this.state.authButtons.edit) {
            return;
        }
        this.roleEditRef.openEditModal(item.id);
    };

    delete = (item) => {
        if (!this.state.authButtons.delete) {
            return;
        }
        roleService.delete(item.id).then(res => {
            if (res) {
                this.search();
            }
        });
    };

    getDefaultOperationColumn = () => {
        let options = [];
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
            key: 'operation',
            title: '操作',
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
                    searchBody={this.state.searchBody}
                    dataSourceUrl='/role/list'
                    onRef={ref => this.listTableRef = ref}
                    columns={tableColumns}/>

                {add || edit ? <RoleEdit onRef={ref => this.roleEditRef = ref} saveSuccess={this.reload}/> : null}

            </div>
        );
    }
}

export default RoleList;
