import React from 'react';
import {DeleteOutlined, SearchOutlined} from '@ant-design/icons';
import {Button, Divider} from 'antd';
import PropTypes from 'prop-types';
import {BasicForm} from '../index';

export default class SearchForm extends React.Component {
    static propTypes = {
        formFields: PropTypes.array,
        onSearch: PropTypes.func,
    };

    formRef = React.createRef();

    /**
     * 点击查询按钮
     */
    onClickSearch = () => {
        this.formRef.current.validateFields()
            .then(values => this.props.onSearch(values))
            .catch(e => null);
    };

    /**
     * 重置查询表单
     */
    reset = () => {
        this.formRef.current.resetFields();
        this.props.onSearch({});
    };

    render() {
        return (
            <BasicForm
                {...this.props}
                ref={this.formRef}
                formItemLayout={{}}
                showLabel={false}
                layout='inline'>
                    <span>
                        <Button type='primary' onClick={this.onClickSearch}>
                            <SearchOutlined/>搜索
                        </Button>
                        <Divider type="vertical"/>
                        <Button onClick={this.reset}><DeleteOutlined/>重置</Button>
                    </span>
            </BasicForm>
        );
    }
}
