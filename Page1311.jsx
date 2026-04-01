import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { deepCopy, myDeleteUploadedFiles, myRenameUploadedFiles, myNotice, myDoFiles, myLocalTime, reqdoSQL, reqdoTree } from './api/functions';
//import './css/login.css';

export default class Page1309 extends React.Component {
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
        
    }

    onFinish = async (values) => {
        let { userid, password, checkpassword } = this.form.getFieldValue();
        if (password === checkpassword) {
            let p = {};
            p.sqlprocedure = "changepassword";
            p.userid = userid;
            p.newpassword = password;
            let rs = await reqdoSQL(p);
            if (rs.rows?.length > 0) message.success("密码修改成功");
            else message.warning("此用户不存在，请重新输入或注册新用户");
        } else {
            message.error("两次密码输入不一致");
        }
    };

    handleChange = (changed, all) => {

    }

    render() {
        return (
            <div className="login-container">
                <h1 className="login-title">修改密码</h1>
                <div className="form-container">
                    <Form ref={ref => this.form = ref} name="form" initialValues={{ remember: true, userid: "", password: "" }}
                        onFinish={this.onFinish} onChange={this.handleChange.bind(this)} className="login-form"
                    >
                        <Form.Item labelCol={{ style: { width: 80 } }} label="用户名" name="userid"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                            <Input id="userid" placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: 80 } }} label="新密码" name="password"
                            rules={[{ required: true, message: '密码不能为空' }]}
                        >
                            <Input.Password id="password" placeholder="请输入新密码"
                                iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            />
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: 80 } }} label="确认密码" name="checkpassword"
                            rules={[{ required: true, message: '确认密码不能为空' }]}>
                            <Input.Password id="checkpassword" placeholder="请再次输入新密码" />
                        </Form.Item>
                        <div className='operation'>
                            <Link className='register' to="/Page1309">返回登录页面</Link>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-submit-btn" >
                            确定
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
