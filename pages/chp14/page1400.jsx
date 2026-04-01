import React, { useState } from 'react';
import { notification, Modal, Form, Input, Button, message, DatePicker } from 'antd';
import { Link, Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { deepCopy, myDeleteUploadedFiles, myRenameUploadedFiles, myNotice, myDoFiles, myLocalTime, reqdoSQL, reqdoTree } from '../../api/functions';
import { ConfirmModal, AntdLabel, AntdInputBox, AntdCheckBox, AntdComboBox } from '../../api/antdClass.js';
import { MyFormComponent } from '../../api/antdFormMethod.js';
import '../../css/login.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import App from '../../App.js'; //定义菜单主控程序
//const sys = sessionStorage.getItem('sys');
const sys = { ...React.sys }
//console.log(881, sys.user)
const dateFormat = 'YYYY-MM-DD';
const rowheight = 52;
export default class Login extends MyFormComponent {
    constructor(props) {
        super(props);
        let attr = { ...props };
        let { limitTime } = attr;
        if (limitTime == undefined || isNaN(limitTime)) limitTime = 60;
        attr.limitTime = limitTime;
        this.state = {
            row: { userid: sys.user.userid, password: '123456', logindate: dayjs(myLocalTime().date, sys.dateformat) },
            isVisible: true,
            loginedFlag: false,
            logindateFlag: false,
            captcha: '',
            flag: false,
            countdown: attr.limitTime,
            limitTime: attr.limitTime,
        };
    }

    componentDidMount() {
        document.title = "城市绿化管理信息系统";
        //this.setState({ isVisible: true });
        this.handleChange();
    }

    handleSubmitClick = async (values) => {
        let row = this.getFormValues('myForm1');
        //console.log(111,row)
        let userid = row.userid;
        let password = row.password;
        let error = '';
        if (userid == '') error = '用户名不能为空';
        if (password == '') error += '登录密码不能为空';
        if (error == '') {
            let p = {};
            p.sqlprocedure = "login";
            p.userid = userid;
            p.password = password;
            let rs = await reqdoSQL(p);
            // if (values.captcha !== this.state.captcha) {
            //     message.error('验证码错误');
            //     this.getCaptcha();
            // } else 
            if (rs.rows.length < 2) {
                //message.error('用户名输入错误！', 3);
                //message.error('登录密码输入错误！', 3);
                notification.open({
                    key: 'notice1',
                    message: '系统提示!',
                    description: (rs.rows.length == 0 ? '用户名' : '登录密码') + '输入错误！',
                    duration: 3,
                    type: 'error',
                    placement: 'bottomRight',
                });  //停留3秒时间后自动关闭                
            } else {
                let url = window.location.href;
                if (!sys.user) sys.user = {};
                sys.user.userid = rs.rows[0].userid;
                sys.user.username = rs.rows[0].username;
                sys.user.logindate = myLocalTime(values.login).date;
                //console.log(115, sys);
                message.success('登录成功！', 1);
                sessionStorage.setItem('sys', JSON.stringify(sys));  //存储登录用户信息
                this.setState({ isVisible: false, loginedFlag: true }, () => {
                    window.location.href = '../Page1401';  //'index.js';  //重新定位到主页，即刷新主页，保证用户名称显示为新的值
                });
            }
        } else {
            notification.open({
                key: 'notice1',
                message: '系统提示!',
                description: error,
                duration: 3,
                type: 'warning',
                placement: 'bottomRight',
            });
            //message.error(error, 3);
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
        let row = this.getFormValues('myForm1');
        let userid = row.userid;
        let password = row.password;
        let date = row.logindate;
        if (userid === '' || password === '' || userid === undefined || password === undefined || date === undefined || date === '') {
            this.setState({ flag: true, captcha: '' });
        } else {
            this.setState({ flag: false });
        }
    };

    handleSetDate = () => {
        let { logindateFlag } = this.state;
        this.setState({ logindateFlag: !logindateFlag });
    }
    handleSetPassword = () => {
        let { logindateFlag } = this.state;
        this.setState({ logindateFlag: !logindateFlag });
    }

    handleRegister = () => {

    }

    render() {
        let { loginedFlag, logindateFlag } = this.state;
        const today = dayjs(myLocalTime().date, sys.dateformat)
        return (
            <div>
                <Modal name='isVisible' title='管理员登录' open={this.state.isVisible} height={245} width={367} forceRender centered maskClosable={false}
                    hidden closable keyboard={false} className='login-modal' onCancel={() => { this.setState({ isVisible: false }) }}
                    //cancelText='关闭'                    
                    styles={{ position: 'relative', padding: 0, body: { overflow: 'hidden', height: '225px', width: '350px', padding: 0, margin: 0 } }}
                    footer={
                        <div style={{ position: 'relative', height: 45, marginTop: '-1px', borderTop: '1px solid #e8e8e8', backgroundColor: '#f0f2f5' }}>
                            <Link to="/register.jsx" style={{ position: 'absolute', top: 10, left: 30 }}>忘记密码？</Link>
                            <Link to="/register.jsx" style={{ position: 'absolute', top: 10, right: 30 }}>立即注册</Link>
                            {/* <a onClick={() => this.handleSetPassword()} className='xlabelStyle' style={{ position: 'absolute', top: 12, left: 30 }}>忘记密码？</a>
                            <a onClick={() => this.handleRegister()} className='xlabelStyle' style={{ position: 'absolute', top: 12, right: 30 }}>立即注册</a> */}
                        </div>
                    }
                >
                    <div style={{ position: 'relative' }}>  {/* 添加一个层，否则文本框需要大于30px才能输入 */}
                        <Form name="myForm1" ref={ref => this.myForm1 = ref} autoComplete="off" onFinish={this.onFinish} initialValues={this.state.row}
                            style={{ padding: 0, margin: 0, position: 'absolute', height: '100%', width: '100%' }} >
                            <AntdInputBox type='text' id='userid' label='用 户 名' labelwidth='80' left='20' height='36' width='240' top={18 + rowheight * 0} ref={ref => this.productid = ref} />
                            <AntdInputBox type='password' id='password' label='用户密码' labelwidth='80' left='20' height='36' width='240' top={18 + rowheight * 1} />
                            <AntdInputBox type='date' id='logindate' label='系统日期' labelwidth='80' left='20' height='32' width='240' top={18 + rowheight * 2} />
                            <Button key='btnok' type='primary' htmltype='submit' onClick={this.handleSubmitClick} style={{ position: 'absolute', top: 18 + rowheight * 3 + 4, left: 30, height: 32, width: 312 }}>登&nbsp;&nbsp;录</Button>
                        </Form>
                    </div>
                </Modal>

                <Routes>
                    {/* <Route key="route_register" path="register/*" element={React.createElement(require(".//register").default)} /> */}
                    {/* <Route key="route_register" path="register/*" element={React.createElement(require("./chp07/register").default)} /> */}

                </Routes>
            </div>
        );
    }
}
