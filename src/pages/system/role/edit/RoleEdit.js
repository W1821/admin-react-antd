import React, {Component} from 'react';
import {Form, TreeSelect} from 'antd';

import './RoleEdit.css';

import {EditModal} from '../../../../components';

import mainService from '../../../main/main.service';
import roleService from '../role.service';
import menuService from '../../menu/menu.service';

import formFields from './edit.form-field';
import PropTypes from 'prop-types';
import {Role} from '../role.model';

const FormItem = Form.Item;

class RoleEdit extends Component {

    static propTypes = {
        saveSuccess: PropTypes.func,
    };

    state = {
        treeData: [],
        menuIds: [],
        formFieldList: [],
        role: new Role(),
    };

    componentDidMount() {
        // 让父组件可以调用方法,父组件必须有props：onFef，否则报错
        this.props.onRef(this);
        // 初始化角色树
        this.initRoleTree();
    }

    componentWillUnmount() {
        this.setState = () => {
        };
    }

    initRoleTree = () => {
        let treeData = mainService.getMenuDataTree().map(menu => menuService.getTreeItem(menu));
        this.setState({treeData});
    };

    /**
     * 增加页面
     */
    openAddModal = () => {
        this.setState({role: new Role()}, this.openModal);
    };

    /**
     * 修改页面
     */
    openEditModal = (id) => {
        this.openModal();
        roleService.query(id).then(res => {
            if (res) {
                const role = new Role(res.data);
                this.setState({role});
                this.setFormValue(role);
            }
        });
    };

    /**
     * 表单赋值
     * @param role
     */
    setFormValue = (role) => {
        const fieldsValue = {};
        formFields.forEach(field => {
            fieldsValue[field.key] = role[field.key];
        });
        const values = this.createTreeSelectValues(role);
        this.props.form.setFieldsValue({menuButtonNode: values, ...fieldsValue});
    };

    openModal = () => {
        this.editModalRef.openModal();
    };

    /**
     * 保存
     */
    save = (values) => {
        const body = this.getRequestBody(values);
        let promise;
        if (body.id !== undefined && body.id !== null) {
            // update
            promise = roleService.update(body);
        } else {
            // add
            promise = roleService.add(body);
        }
        return promise.then(res => {
            if (res) {
                // 保存成功，刷新list页面
                this.props.saveSuccess();
            }
            return !!res;
        });
    };

    createTreeSelectValues = (role) => {
        const values = [];
        const menuIds = role.menuIds ? role.menuIds.map(id => id + '') : [];
        const buttons = role.buttonIds ? role.buttonIds.map(id => id + '-btn') : [];
        menuIds.forEach(id => {
            const menu = mainService.getMenuDataList().find(m => m.id + '' === id);
            if (!menu) {
                return;
            }
            values.push({value: id, label: menu.menuName, halfChecked: []});
            buttons.forEach(bid => {
                const button = (menu.buttons || []).find(b => b.id + '-btn' === bid);
                if (button) {
                    values.push({value: bid, label: button.menuName, halfChecked: []});
                }
            });
        });
        return values;
    };


    getRequestBody = (values) => {
        const body = {
            id: this.state.role.id,
            ...values
        };
        // 用户角色
        if (body.menuButtonNode) {
            body.menuIds = [];
            body.buttonIds = [];
            body.menuButtonNode.forEach(node => {
                if (node.value.endsWith('btn')) {
                    body.buttonIds.push(node.value.split('-')[0]);
                } else {
                    body.menuIds.push(node.value);
                }
            });
        }
        delete body.menuButtonNode;
        return body;
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <EditModal
                {...this.props}
                onRef={ref => this.editModalRef = ref}
                formFields={formFields}
                saveCallback={this.save}
            >
                <FormItem label='角色权限'>
                    {
                        getFieldDecorator('menuButtonNode')
                        (
                            <TreeSelect
                                treeData={this.state.treeData}
                                showCheckedStrategy={TreeSelect.SHOW_ALL}
                                treeCheckStrictly
                                treeCheckable
                                allowClear
                                treeDefaultExpandAll
                                placeholder="请选择角色权限"/>
                        )
                    }
                </FormItem>
            </EditModal>
        );
    }
}

export default Form.useForm(RoleEdit);
