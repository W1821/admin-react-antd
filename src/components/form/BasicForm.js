import React from 'react';
import {Form} from 'antd';
import { Icon } from '@ant-design/compatible';
import {Cascader, Checkbox, DatePicker, Input, Radio, Select, TimePicker} from 'antd';
import PropTypes from 'prop-types';

const {TextArea, Search} = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;


const defaultFormItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 12},
};

class BasicForm extends React.Component {
    static propTypes = {
        formFields: PropTypes.array,
        formItemLayout: PropTypes.object,
        showLabel: PropTypes.bool,
    };

    formRef = React.createRef();

    componentDidMount() {
        // 让父组件可以调用方法,父组件必须有props：onFef，否则报错
        // this.props.onRef(this);
    }

    componentWillUnmount() {
        this.setState = () => {
        };
    }

    setFieldsValue = (value) => {
        this.formRef.current.setFieldsValue(value);
    };

    validateFields = () => {
        return this.formRef.current.validateFields();
    };

    resetFields = () => {
        this.formRef.current.resetFields();
    };

    createComponentByField = field => {
        const {type, inputType, inputId, placeholder, icon, options, loadData, onChange, onSearch} = field;
        switch (type) {
            case 'input':
                return <Input type={inputType} id={inputId} prefix={<Icon type={icon}/>}
                              placeholder={placeholder}/>;
            case 'search':
                return (
                    <Search
                        prefix={icon ? <Icon type={icon}/> : null}
                        placeholder={placeholder}
                        onSearch={value => {
                            if (onSearch && typeof onSearch === 'function') {
                                onSearch(value);
                            }
                        }}
                    />
                );
            case 'textArea':
                return <TextArea placeholder={placeholder}/>;
            case 'checkbox':
                return <CheckboxGroup options={options}/>;
            case 'radio':
                return (
                    <RadioGroup>
                        {options.map(({label, value}) => <Radio value={value} key={label}>{label}</Radio>)}
                    </RadioGroup>
                );
            case 'select':
                return (
                    <Select
                        showSearch
                        placeholder={placeholder}
                        optionLabelProp='children'
                        onChange={(value, option) => {
                            if (onChange && typeof onChange === 'function') {
                                onChange(value, option);
                            }
                        }}
                        style={{minWidth: '100px'}}
                    >
                        {
                            options.map(({label, value}) => (
                                <Option value={value} key={label}>
                                    {label}
                                </Option>
                            ))
                        }
                    </Select>
                );

            case 'cascader':
                return <Cascader options={options} placeholder={placeholder}{...(loadData ? {loadData} : null)}/>;
            case 'date':
                return <DatePicker placeholder={placeholder}/>;
            case 'time':
                return <TimePicker placeholder={placeholder}/>;
            case 'datetime':
                return (
                    <DatePicker
                        showTime={true}
                        placeholder={placeholder}
                        onChange={(value, dateString) => value._i = dateString}
                        format="YYYY-MM-DD HH:mm:ss"/>
                );
            default:
                return null;
        }
    };

    getFields() {
        const {formFields, showLabel = true} = this.props;
        return (formFields || [])
            .filter(field => field.type)
            .map(field => (
                <FormItem
                    key={'item' + field.key}
                    label={showLabel ? field.label : undefined}
                    name={field.key}
                    rules={field.rules}>
                    {
                        (this.createComponentByField(field))
                    }
                </FormItem>
            ));
    }

    render() {
        const {layout, formItemLayout} = this.props;
        const itemLayout = formItemLayout ? formItemLayout : defaultFormItemLayout;
        return (
            <Form ref={this.formRef} layout={layout} {...itemLayout}>
                {this.getFields()}
                {this.props.children}
            </Form>
        );
    }
}

export default BasicForm;

