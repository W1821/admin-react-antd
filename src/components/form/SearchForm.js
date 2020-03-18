import React from 'react';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import {BasicForm} from '../index';

const FormItem = Form.Item;

class SearchForm extends React.Component {
    static propTypes = {
        formFields: PropTypes.array,
        onSearch: PropTypes.func,
    };

    /**
     * 点击查询按钮
     */
    onClickSearch = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSearch(values);
            }
        });
    };

    /**
     * 重置查询表单
     */
    reset = () => {
        this.props.form.resetFields();
        this.props.onSearch({});
    };

    render() {
        return (
            <BasicForm
                {...this.props}
                formItemLayout={{}}
                showLabel={false}
                layout='inline'>
                    <span>
                        <FormItem>
                            <Button type='primary' onClick={this.onClickSearch}>
                                <SearchOutlined />搜索
                            </Button>
                        </FormItem>
                        <FormItem>
                           <Button onClick={this.reset}><DeleteOutlined />重置</Button>
                        </FormItem>
                    </span>
            </BasicForm>
        );
    }
}

export default Form.useForm(SearchForm);
