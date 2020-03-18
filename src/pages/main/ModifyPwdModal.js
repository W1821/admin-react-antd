import React, {Component} from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal } from 'antd';
import {BasicForm} from '../../components';

import './ModifyPwdModal.css';

import NotificationService from '../../common/service/NotificationService';
import mainService from './main.service';

import formFields from './modify-pwd.form-fields';

class ModifyPwdModal extends Component {

    state = {
        modalVisible: false,
    };

    componentDidMount() {
        this.props.onRef(this);
    }

    openModal = () => {
        this.setState({modalVisible: true});
    };

    clickOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                mainService.modifyPwd(values).then(res => {
                    if (res) {
                        NotificationService.success('修改成功');
                        this.clickCancel();
                    }
                });
            }
        });
    };

    clickCancel = () => {
        this.props.form.resetFields();
        this.setState({modalVisible: false});
    };

    render() {
        return (
            <Modal
                visible={this.state.modalVisible}
                onOk={this.clickOk}
                onCancel={this.clickCancel}
                width={'40%'}
                title='选择图标'>

                <BasicForm formFields={formFields} {...this.props}/>

            </Modal>
        );
    }

}

export default Form.useForm(ModifyPwdModal);
