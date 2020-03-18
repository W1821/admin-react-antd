import React, {Component} from 'react';
import {Modal} from 'antd';
import {BasicForm} from '../../components';

import './ModifyPwdModal.css';

import NotificationService from '../../common/service/NotificationService';
import mainService from './main.service';

import formFields from './modify-pwd.form-fields';

export default class ModifyPwdModal extends Component {

    state = {
        modalVisible: false,
    };

    formRef = React.createRef();

    componentDidMount() {
        this.props.onRef(this);
    }

    openModal = () => {
        this.setState({modalVisible: true});
    };

    clickOk = () => {
        this.formRef.current.validateFields()
            .then(values => {
                mainService.modifyPwd(values).then(res => {
                    if (res) {
                        NotificationService.success('修改成功');
                        this.clickCancel();
                    }
                });
            }).catch(e => null);
    };

    clickCancel = () => {
        this.formRef.current.resetFields();
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

                <BasicForm ref={this.formRef} formFields={formFields} {...this.props}/>

            </Modal>
        );
    }

}
