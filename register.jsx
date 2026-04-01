import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { deepCopy, myDeleteUploadedFiles, myRenameUploadedFiles, myNotice, myDoFiles, myLocalTime, reqdoSQL, reqdoTree } from './api/functions';
import './css/login.css';

export default class Register extends React.Component {   //1309
    constructor(props) {
        super(props);
        let attr = { ...props };
        let { limitTime } = attr;
        if (limitTime == undefined || isNaN(limitTime)) limitTime = 60;
        attr.limitTime = limitTime;
        this.state = {
            captcha: '',
            flag: true,
            countdown: attr.limitTime,
            limitTime: attr.limitTime,
        };
    }

    componentDidMount() {
        alert(99);
        this.setUserID();
    }

    getDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const formatdate = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formatdate;
    }

    onFinish = async (values) => {
        let { userid, password, checkpassword } = this.form.getFieldValue();
        if (password === checkpassword) {
            let p = {};
            p.sqlprocedure = "register";
            p.userid = userid;
            p.password = password;
            let rs = await reqdoSQL(p);
            if (rs.rows.length > 0) message.success("注册成功");
        } else {
            message.error("两次密码输入不一致");
        }
    };

    setUserID = async () => {
        let p = {};
        p.sqlprocedure = "users";
        let rs = await reqdoSQL(p);
        this.form.setFieldValue("userid", "user" + parseInt(rs.rows.length + 1));
    };

    handleChange = (changed, all) => {
        
    }

    render() {
        return (
            <div className="login-container">
                <h1 className="login-title">新用户注册</h1>
                <div className="form-container">
                    <Form ref={ref => this.form = ref} name="form" initialValues={{ remember: true, userid: "", password: "" }}
                        onFinish={this.onFinish} onChange={this.handleChange.bind(this)} className="login-form"
                    >
                        <Form.Item labelCol={{ style: { width: 80 } }} label="用户名" name="userid"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                            <Input id="userid" placeholder="请输入用户名" disabled />
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: 80 } }} label="密码" name="password"
                            rules={[{ required: true, message: '密码不能为空' }]}
                        >
                            <Input.Password id="password" placeholder="请输入密码"
                                iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            />
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: 80 } }} label="确认密码" name="checkpassword"
                            rules={[{ required: true, message: '确认密码不能为空' }]}>
                            <Input.Password id="checkpassword" placeholder="请再次输入密码" />
                        </Form.Item>
                        <div className='operation'>
                            <Link className='register' to="/Page1309">返回登录页面</Link>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-submit-btn" >
                            注册
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
