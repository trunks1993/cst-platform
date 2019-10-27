import React, { useRef } from 'react';
import { Input, Form, Select } from 'antd';
import { connect } from 'react-redux';
import { domTypes } from '@/utils/const';
// actions
import { actions as gridActions } from '@/redux/grid';
import { actions as propertyActions } from '@/redux/property';

import _ from 'lodash';

const Component = ({ form: { getFieldDecorator, validateFields, setFieldsValue }, formData: { cfiIsUpdate, cfiType }, dataSourceOptions, setDsOptions, setFormField }) => {
  const fileInputEl = useRef(null);
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
      <div className="property-content" style={{ display: cfiIsUpdate === 1 ? 'none' : null }}>
        <span className="property-content-btn">更新时间</span>
        {getFieldDecorator('cfiUpdateHz', {})(<Input style={{ width: 'calc(100% - 90px)' }} />)}
        <span style={{ marginLeft: '10px' }}>秒</span>
      </div>

      <div className="property-content">
        <span className="property-content-btn">数据源</span>
        {getFieldDecorator('cdsOdbcType', {})(<Select className="select" onChange={e => {
          setDsOptions(cfiType, e, 1);
          setFormField({ cfiDatasourceId: '' });
        }}>
          <Select.Option value={'1'}>自定义</Select.Option>
          <Select.Option value={'2'}>URL</Select.Option>
          <Select.Option value={'3'}>SQL</Select.Option>
        </Select>)}
      </div>
      <div className="property-content">
        <span className="property-content-btn">数据绑定</span>
        {getFieldDecorator('cfiDatasourceId', {})(
          <Select className="select">
            <Select.Option value="">选择绑定数据</Select.Option>
            {_.map(dataSourceOptions, ({ cdsOdbcId, cdsRemark }) => <Select.Option key={cdsOdbcId} value={cdsOdbcId}>{cdsRemark}</Select.Option>)}
          </Select>
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
        value: domTypes[props.formData.cfiType]
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
  onFieldsChange({ setFormField }, changedFields){
    // setFormField(changedFields);
  },
  onValuesChange({ setFormField }, changedValues, allValues){
    setFormField(changedValues);
  }

})(Component);

const mapStateToProps = ({ gridState: { activeLayId, currentData }, propertyState: { dsOptions } }) => {
  const formData = _.get(currentData, activeLayId, {});
  const { cdsOdbcType, cfiType } = formData;
  const dataSourceOptions = _.get(dsOptions, `${cfiType}-${cdsOdbcType}-1`, {});
  return {
    formData,
    dataSourceOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFormField: field => dispatch(gridActions.setFormField(field)),
    setDsOptions: (cdsChartId, cdsOdbcType, cdsSystemId) => dispatch(propertyActions.setDsOptions(cdsChartId, cdsOdbcType, cdsSystemId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
