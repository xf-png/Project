import React, { useState } from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { Link, Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { deepCopy, myDeleteUploadedFiles, myRenameUploadedFiles, myNotice, myDoFiles, myLocalTime, reqdoSQL, reqdoTree } 
from './api/functions';
//import '../../css/login.css';

const dateFormat = 'YYYY-MM-DD';

export default class Page1309 extends React.Component {
    constructor(props) {
        super(props);
        let attr = { ...props };
        let { limitTime } = attr;
        if (limitTime == undefined || isNaN(limitTime)) limitTime = 60;
        attr.limitTime = limitTime;
        this.state = {
            captcha: '',
            flag: false,
            countdown: attr.limitTime,
            limitTime: attr.limitTime,
        };
    }

    componentDidMount() {
        this.handleChange();
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
        let userid = values.userid;
        let password = values.password;
        let p = {};
        p.sqlprocedure = "checkuser";
        p.userid = userid;
        p.password = password;
        let rs = await reqdoSQL(p);
        if (values.captcha !== this.state.captcha) {
            message.error('验证码错误');
            this.getCaptcha();
        } else if (rs.rows.length === 0) {
            message.error('密码错误');
        } else {
            message.success('登录成功');
            //成功登录的用户信息通过sessionStorage保存，所有页面都可以提取使用
            sessionStorage.setItem("useriduserid", userid);
            sessionStorage.setItem("password", password);
            sessionStorage.setItem("date", this.getDate());//成功登录的时间
        }
    };

    getCaptcha = () => {
        let limitTime = this.state.limitTime;
        let str = Math.random().toString(36);
        let captcha = str.substring(2, 8);
        this.setState({ captcha: captcha, countdown: limitTime });
        let timer = setInterval(() => {
            if (this.state.countdown > 0) {
                this.setState({ countdown: this.state.countdown - 1 });
            } else {
                clearInterval(timer);
                this.setState({ captcha: '', countdown: limitTime });
            }
        }, 1000);
    };

    handleDisabledDate = (date) => {
        date = date.$d;
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        return date && (date.getFullYear() !== currentYear || date.getMonth() !== currentMonth);
    }

    handleChange = () => {
        let userid = this.form.getFieldValue().userid;
        let password = this.form.getFieldValue().password;
        let date = this.form.getFieldValue().date;
        if (userid === '' || password === '' || userid === undefined || password === undefined || date === undefined || date === '') {
            this.setState({ flag: true, captcha: '' });
        } else {
            this.setState({ flag: false });
        }
    };

    render() {
        return (
            <div className="login-container">
                <h1 className="login-title">登录</h1>
                <div className="form-container">
                    <Form ref={ref => this.form = ref} name="loginForm"
                        onFinish={this.onFinish} onChange={this.handleChange.bind(this)} className="login-form"
                    >
                        <Form.Item labelCol={{ style: { width: 70 } }} label="用户名" name="userid"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                            <Input id="userid" placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: 70 } }} label="密码" name="password"
                            rules={[{ required: true, message: '密码不能为空' }]}
                        >
                            <Input.Password id="password" placeholder="请输入密码"
                                iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                            />
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: 70 } }} label="日期" name="date"
                            rules={[{ required: true, message: '日期不能为空' }]}>
                            <DatePicker id="date" style={{ width: '230px' }} format={dateFormat} disabledDate={(date) => this.handleDisabledDate(date)} placeholder="请选择日期" />
                        </Form.Item>
                        <Form.Item labelCol={{ style: { width: 70 } }} label="验证码" name="captcha"
                            rules={[{ required: true, message: '验证码不能为空' }]}>
                            <Input id="captcha" placeholder="请输入验证码" />
                        </Form.Item>
                        <Button type="default" disabled={this.state.flag || this.state.countdown !== this.state.limitTime}
                            onClick={this.getCaptcha.bind(this)} className="captcha-btn"
                        >
                            {this.state.countdown !== this.state.limitTime && this.state.countdown + 's'}
                            {this.state.countdown === this.state.limitTime && '获取验证码'}
                        </Button>
                        <Input value={this.state.captcha} className="captcha-input" readOnly />
                        <div className='operation'>
                            <Link className='register' to="/Page1310">新用户注册</Link>
                            {/* <a className='register' href="/Page1310" target="_self">注册</a> */}
                            {/* <a className='forget' href="" target="_self">忘记密码</a> */}
                            <Link className='forget' to="/Page1311">忘记密码</Link>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-submit-btn" >
                            登录
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
