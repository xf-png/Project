//npm install antd@5.10.2   //升级antd

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
//import 'rc-easyui/dist/themes/default/easyui.css';
//import 'rc-easyui/dist/themes/material-teal/easyui.css';
//import 'rc-easyui/dist/themes/icon.css';
//import 'rc-easyui/dist/themes/react.css';
//import { LocaleProvider } from 'rc-easyui';
//import zh_CN from 'rc-easyui/dist/locale/easyui-lang-zh_CN';
import locale from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './css/style.css';
import 'react-resizable/css/styles.css';
//import data from './data/pinyin.json';
//import '../node_modules/react-resizable/css/styles.css'; 
//import App from '././pages/chp02/demo202'; //定义菜单主控程序
//import App from '././pages/chp03/demo311'; //定义菜单主控程序
//easyui本地化<LocaleProvider locale={zh_CN}> 
//antd本地化<ConfigProvider locale={locale}>
//console.log(111,React.sys)
import App from './App.js'; //定义菜单主控程序
//import Login from './login.jsx'; //定义菜单主控程序
const sys = React.sys;

const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the application
root.render(
  //不能加这个StrictMode，否则组件的componentDidMount会执行两次
  // <React.StrictMode>
    <BrowserRouter>
      {/* <LocaleProvider locale={zh_CN}> */}
      <ConfigProvider locale={locale}>
        <App />  {/* 与import的菜单主控程序一致 */}
        {/* <Login /> */}
      </ConfigProvider>
      {/* </LocaleProvider> */}
    </BrowserRouter>
  // </React.StrictMode>
);


// ReactDom.render(
//    <BrowserRouter>
//       {/* <LocaleProvider locale={zh_CN}> */}
//          <ConfigProvider locale={locale}>
//             <App />  {/* 与import的菜单主控程序一致 */}
//             {/* <Login /> */}
//          </ConfigProvider>
//       {/* </LocaleProvider> */}
//    </BrowserRouter>
//    , document.getElementById('root'));

   /* 另一种方式
   class MyComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
      }
    
      handleLogin() {
        this.setState({ isLoggedIn: true });
      }
    
      handleLogout() {
        this.setState({ isLoggedIn: false });
      }
    
      render() {
        const { isLoggedIn } = this.state;
        return (
          <BrowserRouter>
            <LocaleProvider locale={zh_CN}>
              <ConfigProvider locale={locale}>
                <div>
                  {isLoggedIn ? (
                    <App />
                  ) : (
                    <button onClick={this.handleLogin}>Login</button>
                  )}
                </div>
              </ConfigProvider>
            </LocaleProvider>
          </BrowserRouter>
        );
      }
    }
    
    ReactDom.render(
      <MyComponent />,
      document.getElementById('root')
    );
    */