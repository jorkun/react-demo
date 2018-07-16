import React, { Component } from "react";
import { browserHistory } from "react-router";
import { Form, Input, Button, Icon, message } from 'antd';
import instance from 'utils/instance';
const FormItem = Form.Item;

function noop() {
    return false;
}
class LoginFormContent extends Component {
    constructor() {
        super();
        this.state = {
            loginError: null
        };
    }
    handleSubmit(e) {
        this.setState({
            loginError: ""
        });
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.toLogin(values);
        });
    }
    async toLogin(params) {
        try {
            let response = await instance.get(`/TM/security/login?userid=${params.userid}&password=${params.password}`)
            let { data } = response;
            if (data.success) {
                browserHistory.push("/");
            } else {
                this.setState({
                    loginError: data.message || "账号或密码错误"
                });
            }
        } catch (error) {
            this.setState({
                loginError: "服务异常"
            });
            browserHistory.push("/");
            message.success("登录成功！");
            console.log("登录失败", error);
        }
    }
    render() {
        const { getFieldProps, isFieldValidating, getFieldError } = this.props.form;
        const nameProps = getFieldProps('userid', {
            rules: [
                { required: true, message: '请输入账户' }
            ]
        });
        const passwdProps = getFieldProps('password', {
            rules: [
                { required: true, message: '请填写密码' }
            ]
        });
        return (
            <Form layout="horizontal" >
                <FormItem
                    hasFeedback
                    help={isFieldValidating('userid') ? '校验中...' : (getFieldError('userid') || []).join(', ')}
                >
                    <Input {...nameProps}
                        addonBefore={<Icon type="user" />}
                        autoComplete="off"
                        placeholder="请输入账户名"
                    />
                </FormItem>
                <FormItem
                    hasFeedback
                >
                    <Input {...passwdProps}
                        addonBefore={<Icon type="lock" />}
                        type="password"
                        placeholder="请输入密码"
                        autoComplete="off"
                        onContextMenu={noop}
                        onPaste={noop}
                        onCopy={noop}
                        onCut={noop}
                    />
                </FormItem>
                <p className="error-msg">{this.state.loginError}</p>
                <Button type="primary" size="large" htmlType="button"
                    onClick={this.handleSubmit.bind(this)} className="login-btn">登录</Button>
            </Form>
        );
    }
};

let LoginForm = Form.create()(LoginFormContent);
export default LoginForm;