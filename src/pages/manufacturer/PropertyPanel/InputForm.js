import React from 'react';
import { Input, Form, Select } from 'antd';
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

const Component = ({ form: { getFieldDecorator, validateFields } }) => {

  return (
    <Form>
      <div className="property-content">
        <span className="property-content-btn">功能名</span>
        {getFieldDecorator('cfiName', {
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
        {getFieldDecorator('cfiType', {})(<Input disabled />)}
      </div>
      <div className="property-content">
        <span className="property-content-btn">数据更新</span>
        {getFieldDecorator('cfiIsUpdate', {})(<Select className="select" >
          <Select.Option value={1}>不更新</Select.Option>
          <Select.Option value={2}>定时更新</Select.Option>
        </Select>)}
      </div>
      <div className="property-content">
        <span className="property-content-btn">更新时间</span>
        {getFieldDecorator('cfiUpdateHz', {})(<Input style={{ width: 'calc(100% - 90px)' }} />)}
        <span style={{ marginLeft: '10px' }}>秒</span>
      </div>

      <div className="property-content">
        <span className="property-content-btn">数据源</span>
        {getFieldDecorator('cdsOdbcType', {})(<Select className="select">
          <Select.Option value={'1'}>自定义</Select.Option>
          <Select.Option value={'2'}>URL</Select.Option>
          <Select.Option value={'3'}>SQL</Select.Option>
        </Select>)}
      </div>
      <div className="property-content">
        <span className="property-content-btn">数据绑定</span>
        {getFieldDecorator('cfiDatasourceId', {})(
          <Select className="select" />
        )}
      </div>
    </Form>
  );
};

const InputForm = Form.create({
  mapPropsToFields(props){
    return props.formData ? {
      cfiName: Form.createFormField({
        value: props.formData.cfiName
      }),
      cfiType: Form.createFormField({
        value: props.formData.cfiType
      }),
      cfiIsUpdate: Form.createFormField({
        value: props.formData.cfiIsUpdate
      }),
      cfiUpdateHz: Form.createFormField({
        value: props.formData.cfiUpdateHz
      }),
      cdsOdbcType: Form.createFormField({
        value: props.formData.cdsOdbcType
      }),
      cfiDatasourceId: Form.createFormField({
        value: props.formData.cfiDatasourceId
      })
    } : {};
  },
  onFieldsChange(props, changedFields){
    // console.log(props, changedFields);
  },
  onValuesChange(props, changedValues, allValues){}

})(Component);

const mapStateToProps = ({ gridState: { activeLayId, currentData } }) => {
  const formData = currentData[activeLayId];
  return {
    formData
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     handleLogin: (name, passworld) => dispatch(formActions.loginByUsername(name, passworld))
//   };
// };

export default connect(mapStateToProps, null)(InputForm);
