import React, {Component} from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { TreeSelect } from 'antd';

import './UserEdit.css';

import {EditModal, ImageCropperUpload} from '../../../../components';

import formFields from './edit.form-field';

import roleService from '../../role/role.service';
import userService from '../user.service';
import PropTypes from 'prop-types';
import {User} from '../user.model';

const FormItem = Form.Item;


class UserEdit extends Component {

    static propTypes = {
        a: PropTypes.object,
        saveSuccess: PropTypes.func,
    };

    state = {
        treeData: [],
        user: new User(),
        headPictureUrl: null,
        editModelKey: 0,
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
        roleService.roleList().then(res => {
            if (res) {
                const treeData = res.data.map(role => {
                    return {
                        key: role.id,
                        value: role.id,
                        title: role.roleName,
                    };
                });
                this.setState({treeData});
            }
        });
    };

    /**
     * 增加页面
     */
    openAddModal = () => {
        this.setState({user: new User(), headPictureUrl: null}, this.openModal);
    };

    /**
     * 修改页面
     */
    openEditModal = (id) => {
        userService.query(id).then(res => {
            if (res) {
                const user = new User(res.data);
                this.setState({user, headPictureUrl: user.headPictureUrl}, this.openModal);
                this.setFromValue(user);
            }
        });
    };

    setFromValue = (user) => {
        // 表单赋值
        const fieldsValue = {};
        formFields.forEach(field => {
            fieldsValue[field.key] = user[field.key];
        });
        const roles = user.roles.map(role => role.id);
        this.props.form.setFieldsValue({roles, ...fieldsValue});
    };

    openModal = () => {
        this.editModalRef.openModal();
    };

    save = (values) => {
        const body = this.getRequestBody(values);
        let promise;
        if (body.id !== undefined && body.id !== null) {
            // update
            promise = userService.update(body);
        } else {
            // add
            promise = userService.add(body);
        }
        return promise.then(res => {
            if (res) {
                // 保存成功，刷新list页面
                this.props.saveSuccess();
            }
            return !!res;
        });

    };

    getRequestBody = (values) => {
        const body = {
            id: this.state.user.id,
            headPictureUrl: this.state.user.headPictureUrl,
            headPictureBase64: this.state.headPictureUrl,
            ...values
        };
        // 用户角色
        if (body.roles) {
            body.roles = body.roles.map(id => {
                return {id};
            });
        }
        return body;
    };

    /**
     * 图片上传成功回调
     */
    onUploadSuccess = (data) => {
        this.setState({headPictureUrl: data});
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
                <FormItem label='头像'>
                    <ImageCropperUpload
                        imageUrl={this.state.headPictureUrl}
                        onSuccess={this.onUploadSuccess}
                    />
                </FormItem>
                <FormItem label='角色'>
                    {
                        getFieldDecorator('roles')
                        (
                            <TreeSelect
                                treeCheckable={true}
                                allowClear={true}
                                treeData={this.state.treeData}
                                placeholder="请选择角色"
                            />
                        )
                    }
                </FormItem>
            </EditModal>
        );
    }
}

export default Form.useForm(UserEdit);
