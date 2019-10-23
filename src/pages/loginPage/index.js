import React, { useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { actions as userActions } from '@/redux/user';
import { createHashHistory } from 'history';
import md5 from 'js-md5';
const history = createHashHistory();

const LoginPage = ({ handleLogin }) => {
  const [userNameObj, setUserName] = useState({
    value: ''
  });

  const [passworldObj, setPassworld] = useState({
    value: ''
    // e10adc3949ba59abbe56e057f20f883e
  });

  return (
    <div className="login-container">
      <Form className="login-form">
        <h2>登录系统</h2>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入账号"
            onChange={e => {
              setUserName({
                value: e.target.value
              });
            }}
            value={userNameObj.value}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="请输入密码"
            value={passworldObj.value}
            onChange={e => {
              setPassworld({
                value: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => {
            if (userNameObj.value && passworldObj.value) {
              handleLogin(userNameObj.value, md5(passworldObj.value));
            }
          }} className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (name, passworld) => {
      dispatch(userActions.loginByUsername(name, passworld)).then(res => {
        history.push('/');
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
