import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import PropTypes from 'prop-types';

import {BasicForm} from '../index';

import NotificationService from '../../common/service/NotificationService';

class EditModal extends Component {
    static propTypes = {
        saveCallback: PropTypes.func,
        formFields: PropTypes.array,
    };

    state = {
        isLoading: false,
        showModal: false,
    };

    componentDidMount() {
        // 让父组件可以调用openModal方法,父组件必须有props：onFef，否则报错
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.setState = () => {
        };
    }

    openModal = () => {
        this.setState({showModal: true});
    };

    clickOk = () => {
        // 先验证
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            // 开始转圈
            this.setState({isLoading: true});
            // 调用回调方法
            this.props.saveCallback(values).then((success) => {
                // 取消转圈
                this.setState({isLoading: false});
                if (success) {
                    NotificationService.success('保存成功');
                    this.clickCancel();
                }
            });
        });
    };

    /**
     * 关闭弹窗
     */
    clickCancel = () => {
        this.props.form.resetFields();
        this.setState({showModal: false});
    };

    renderModalFooter = () => {
        return [
            <Button key="cancel" onClick={this.clickCancel}>取消</Button>,
            <Button key="ok" type="primary" loading={this.state.isLoading} onClick={this.clickOk}>保存</Button>
        ];
    };

    render() {
        const {modalTitle, modalWidth, children} = this.props;
        return (
            <Modal
                title={modalTitle || '增加/编辑'}
                width={modalWidth || '70%'}
                bodyStyle={{minHeight: '70vh'}}
                visible={this.state.showModal}
                footer={this.renderModalFooter()}
                onCancel={this.clickCancel}
                maskClosable={false}
                okText='确认'
                cancelText='取消'>
                <BasicForm {...this.props}>
                    {children}
                </BasicForm>
            </Modal>
        );
    }
}

export default EditModal;

