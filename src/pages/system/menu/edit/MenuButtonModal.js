import React, {Component} from 'react';
import {DeleteOutlined, EditOutlined, MenuOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {Divider, Modal, Radio} from 'antd';

import './MenuButtonModal.css';

import {BasicForm} from '../../../../components';

import formFields from './button-edit.form-field';
import {Button} from '../menu.model';
import PropTypes from 'prop-types';

const options = ['search-查询', 'add-增加', 'edit-编辑', 'delete-删除', 'other-其他'];

export default class MenuButtonModal extends Component {

    static propTypes = {
        onClickOk: PropTypes.func,
    };

    state = {
        modalVisible: false,
        button: new Button(),
        buttonType: null,
        index: null,
    };

    formRef = React.createRef();

    isFirstOpen = true;

    componentDidMount() {
        this.props.onRef(this);
    }

    /**
     * 弹窗
     */
    openModal = (index, button) => {
        this.setState({modalVisible: true});

        // 第一次打开需要等表单渲染好才能赋值
        if (this.isFirstOpen) {
            setTimeout(() => this.setDefaultValue(index, button), 100);
            this.isFirstOpen = false;
        } else {
            this.setDefaultValue(index, button);
        }
    };

    setDefaultValue = (index, button) => {
        // 修改按钮
        if (button) {
            const value = button.code + '-' + button.buttonName;
            const buttonType = options.find(opt => opt === value) || options[options.length - 1];
            this.setState({index, button, buttonType});
            const values = {
                buttonName: button.buttonName,
                code: button.code,
                actions: button.actions
            };
            this.formRef.current.setFieldsValue(values);
        } else {
            this.changeButtonType(options[0]);
        }
    };

    handleOk = () => {
        this.formRef.current.validateFields()
            .then(values => {
                // 返回编辑的按钮
                const button = new Button(values);
                button.id = this.state.button.id;
                this.props.onClickOk(this.state.index, button).then(success => {
                    if (success) {
                        this.handleCancel();
                    }
                });
            })
            .catch(e => null);
    };

    handleCancel = () => {
        this.setState({modalVisible: false, index: null, button: new Button()});
        this.formRef.current.resetFields();
    };

    changeButtonType = (buttonType) => {
        const arr = buttonType.split('-');
        this.formRef.current.setFieldsValue({buttonName: arr[1], code: arr[0]});
        this.setState({buttonType});
    };

    render() {
        return (
            <Modal
                visible={this.state.modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={'40%'}
                title='增加修改注册按钮'>

                <div className='radio-button-type'>
                    <Radio.Group
                        defaultValue={options[0]}
                        onChange={event => this.changeButtonType(event.target.value)}
                        value={this.state.buttonType}>
                        <Radio.Button value="search-查询"><SearchOutlined/>查询</Radio.Button>
                        <Radio.Button value="add-增加"><PlusOutlined/>增加</Radio.Button>
                        <Radio.Button value="edit-编辑"><EditOutlined/>编辑</Radio.Button>
                        <Radio.Button value="delete-删除"><DeleteOutlined/>删除</Radio.Button>
                        <Radio.Button value="other-其他"><MenuOutlined/>其他</Radio.Button>
                    </Radio.Group>
                </div>
                <Divider/>

                <BasicForm ref={this.formRef} formFields={formFields} {...this.props}/>

            </Modal>
        );
    }
}

