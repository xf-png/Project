import React, { useState } from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { Link, Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { deepCopy, myDeleteUploadedFiles, myRenameUploadedFiles, myNotice, myDoFiles, myLocalTime, reqdoSQL, reqdoTree } from './api/functions';
import './css/login.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import App from './App.js'; //定义菜单主控程序
//const sys = sessionStorage.getItem('sys');
const sys = { ...React.sys }
console.log(881, sys.user)
const dateFormat = 'YYYY-MM-DD';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        let attr = { ...props };
        let { limitTime } = attr;
        if (limitTime == undefined || isNaN(limitTime)) limitTime = 60;
        attr.limitTime = limitTime;
        this.state = {
            loginedFlag: false,
            captcha: '',
            flag: false,
            countdown: attr.limitTime,
            limitTime: attr.limitTime,
        };
    }

    componentDidMount() {
        document.title = "React+AntDesign演示系统";        
        this.handleChange();
    }
    
    onFinish = async (values) => {
        let userid = values.userid;
        let password = values.password;
        let p = {};
        p.sqlprocedure = "login";
        p.userid = userid;
        p.password = password;
        let rs = await reqdoSQL(p);
        // if (values.captcha !== this.state.captcha) {
        //     message.error('验证码错误');
        //     this.getCaptcha();
        // } else 
        if (rs.rows.length === 0) {
            message.error('用户名或密码错误', 4);
        } else {
            //console.log(991, sys.user);
            sys.user.userid = rs.rows[0].userid;
            sys.user.username = rs.rows[0].username;
            sys.user.logindate = myLocalTime(values.login).date;
            //console.log(999, sys);
            message.success('登录成功', 1);
            sessionStorage.setItem('sys', JSON.stringify(sys));
            this.setState({ loginedFlag: true })
            //成功登录的用户信息通过sessionStorage保存，所有页面都可以提取使用
            //sessionStorage.setItem("userid", rs.rows[0].userid);
            //sessionStorage.setItem("username", rs.rows[0].username);
            //sessionStorage.setItem("date", this.getDate());//成功登录的时间
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
        let { loginedFlag } = this.state;
        const today = dayjs(myLocalTime().date, sys.dateformat)
        return (
            <div>
                {!loginedFlag && <div className="login-container">
                    <h3 className="login-title">登录</h3>
                    <div className="form-container">
                        <Form ref={ref => this.form = ref} name="loginForm" onFinish={this.onFinish} onChange={this.handleChange.bind(this)} className="login-form">
                            <Form.Item labelCol={{ style: { width: 80 } }} name="userid" >
                                <Input id="userid" placeholder="请输入用户名" defaultValue="20000554" />
                            </Form.Item>
                            <Form.Item labelCol={{ style: { width: 80 } }} name="password" >
                                <Input.Password id="password" placeholder="请输入密码" defaultValue="123456"
                                    iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                                />
                            </Form.Item>
                            <Form.Item labelCol={{ style: { width: 80 } }} name="logindate"
                                rules={[{ required: true, message: '日期不能为空' }]}>
                                <DatePicker id="logindate" style={{ width: '230px' }} format={dateFormat} defaultValue={today} disabledDate={(date) => this.handleDisabledDate(date)} placeholder="选择登录日期" />
                            </Form.Item>
                            {/* <Form.Item labelCol={{ style: { width: 70 } }} label="验证码" name="captcha"
                                rules={[{ required: true, message: '验证码不能为空' }]}>
                                <Input id="captcha" placeholder="请输入验证码" defaultValue="123456" />
                            </Form.Item>
                            <Button type="default" disabled={this.state.flag || this.state.countdown !== this.state.limitTime}
                                onClick={this.getCaptcha.bind(this)} className="captcha-btn"
                            >
                                {this.state.countdown !== this.state.limitTime && this.state.countdown + 's'}
                                {this.state.countdown === this.state.limitTime && '获取验证码'}
                            </Button>
                            <Input value={this.state.captcha} className="captcha-input" readOnly /> */}
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
                </div>}
                {loginedFlag && <App />}
            </div>
        );
    }
}
