import React, {Component} from 'react';
import {Alert, Button, Checkbox, Col, Form, Layout, Row, Spin} from 'antd';
import {BasicForm} from '../../components';

import './Login.css';

import NotificationService from '../../common/service/NotificationService';
import history from '../../common/config/history';
import formFields from './form-fields';
import loginService from './login.service';
import mainService from '../main/main.service';

const FormItem = Form.Item;
const Content = Layout.Content;


class Login extends Component {
    state = {
        errorMsg: false,
        loading: false,
    };


    componentDidMount() {
        // enter事件
        document.addEventListener('keydown', this.handleEnterKey);

        // 为了测试，增加账号 密码
        this.props.form.setFieldsValue({userName: '15256639988', password: '1'});
    }

    componentWillUnmount() {
        // enter事件
        document.removeEventListener('keydown', this.handleEnterKey);
    }

    handleEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.login(e);
        }
    };

    /**
     * 登录
     * @param e
     */
    login = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 转圈开始
                this.setState({loading: true});
                loginService.login(values.userName, values.password).then(this.handleLogin);
            }
        });
    };

    handleLogin = (response) => {
        // 取消设置转圈
        this.setState({loading: false});
        if (!response) {
            this.loginError(response);
            return;
        }
        if (response.success) {
            this.setState({errorMsg: null});
            NotificationService.success('登录成功');
            this.loginSuccess();
        } else {
            this.loginError(response);
        }
    };

    /**
     *  登陆成功，跳转到main页面，main页面默认打开第一个菜单
     */
    loginSuccess = () => {
        // 初始化菜单数据
        mainService.init().then(() => history.push('/main'));
    };

    loginError = (error) => {
        console.log(error);
        switch (error.status) {
            case 401:
                this.setState({errorMsg: '用户名或密码错误'});
                break;
            case 500:
                this.setState({errorMsg: '系统错误，请稍候再试'});
                break;
            default:
                const errorMsg = error.msg || '网络异常，请稍候再试';
                this.setState({errorMsg});
                break;
        }
    };

    render() {
        return (
            <Layout className='login-bg'>
                <Content>

                    {/* 标题 */}
                    <Row className='login-title-row'>
                        <div className="login-title">xxx后台管理系统</div>
                    </Row>

                    {/* 登录错误提示 */}
                    <Row>
                        <Col xxl={{span: 4, push: 10}} sm={{span: 6, push: 9}} xs={{span: 16, push: 4}}>
                            <Alert style={this.state.errorMsg ? {display: 'block'} : {display: 'none'}}
                                   message={this.state.errorMsg}
                                   showIcon={true}
                                   type='error'/>
                        </Col>
                    </Row>

                    {/* 加载圈 */}
                    <div className='login-spin'>
                        <Spin size="large" spinning={this.state.loading}/>
                    </div>

                    {/* 登录表单 */}
                    <Row type='flex' align='middle'>
                        <Col xxl={{span: 4, push: 10}} sm={{span: 6, push: 9}} xs={{span: 16, push: 4}}>
                            <BasicForm formFields={formFields} formItemLayout={{}} showLabel={false} {...this.props} >
                                <FormItem>
                                    <Checkbox>自动登录</Checkbox>
                                    <Button type='primary' onClick={this.login} className='login-form-button'>
                                        登录
                                    </Button>
                                </FormItem>
                            </BasicForm>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Form.useForm(Login);
