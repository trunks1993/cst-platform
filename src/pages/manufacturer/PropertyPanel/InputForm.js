import React, { useState, useEffect } from 'react';
import { Input, Skeleton, Icon, Message, Form, Select } from 'antd';
import { connect } from 'react-redux';
// actions
import { actions as configGroupActions } from '@/redux/configGroup';
import { actions as gridActions } from '@/redux/grid';
import { actions as appActions } from '@/redux/app';

import { deleteConfig } from '@/api/cs_api';
import { tempArr } from '@/config';
import { showConfirm } from '@/utils';
import { types } from '@/utils/const';

import _ from 'lodash';

const InputForm = Form.create({})(({ form: { getFieldDecorator, validateFields } }) => {
  const [username, setUsername] = useState('');

  return (
    <Form>
      <div className="property-content">
        <span className="property-content-btn">功能名</span>
        {getFieldDecorator('fff', {
          rules: [
            {
              required: true,
              message: '请输入用户名',
            },
          ],
        })(<Input />)}
      </div>
      <div className="property-content">
        <span className="property-content-btn">图表类型</span>
        <span className="property-content-disable">1111</span>
      </div>
      <div className="property-content">
        <span className="property-content-btn">数据更新</span>
        <Select className="select" >
          <Select.Option value={1}>不更新</Select.Option>
          <Select.Option value={2}>定时更新</Select.Option>
        </Select>
      </div>
      <div className="property-content">
        <span className="property-content-btn">功能名</span>
        <Input />
      </div>

      <div className="property-content">
        <span className="property-content-btn">更新时间</span>
        <Input style={{ width: 'calc(100% - 90px)' }} /> <span style={{ marginLeft: '10px' }}>秒</span>
      </div>

      <div className="property-content">
        <span className="property-content-btn">数据源</span>
        <Select className="select">
          <Select.Option value={'1'}>自定义</Select.Option>
          <Select.Option value={'2'}>URL</Select.Option>
          <Select.Option value={'3'}>SQL</Select.Option>
        </Select>
      </div>

      <div className="property-content">
        <span className="property-content-btn">数据绑定</span>
        <Select className="select">
          <Select.Option value={'0'}>选择绑定数据</Select.Option>
        </Select>
      </div>
    </Form>
  );
});

// const mapStateToProps = ({ userState }) => {
//   return {
//     isFetching: userState.isFetching
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     handleLogin: (name, passworld) => dispatch(formActions.loginByUsername(name, passworld))
//   };
// };

export default connect(null, null)(InputForm);
