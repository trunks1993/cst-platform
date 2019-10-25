import React, { useState, useEffect } from 'react';
import { Input, Skeleton, Icon, Message, Form, Radio } from 'antd';
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
  return (
    <Form>
      <div className="application-config expand-active">
        <span className="radio-title">放大</span>
        <Radio.Group>
          <Radio className="radio-style" value={1}>启用</Radio>
          <Radio className="radio-style" value={2}>禁用</Radio>
        </Radio.Group>
      </div>

      <div className="application-config">
        <span className="radio-title">过滤</span>
        <Radio.Group>
          <Radio className="radio-style" value={1}>启用</Radio>
          <Radio className="radio-style" value={2}>禁用</Radio>
        </Radio.Group>
      </div>

      <div className="application-config">
        <span className="radio-title">导出</span>
        <Radio.Group>
          <Radio className="radio-style" value={1} >启用</Radio>
          <Radio className="radio-style" value={2}>禁用</Radio>
        </Radio.Group>
      </div>

      <div className="application-config">
        <span className="radio-title">明细</span>
        <Radio.Group>
          <Radio className="radio-style" value={1}>启用</Radio>
          <Radio className="radio-style" value={2}>禁用</Radio>
        </Radio.Group>
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
