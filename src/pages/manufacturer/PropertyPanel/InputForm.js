import React, { useEffect } from 'react';
import { Input, Form, Select, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { domTypes } from '@/utils/const';
// actions
import { actions as gridActions } from '@/redux/grid';
import { actions as propertyActions } from '@/redux/property';

// api
import { selectRepeat } from '@/api/cs_api';

import _ from 'lodash';

const Component = ({ form: { getFieldDecorator, validateFields, setFieldsValue }, setCurrentValidate, formData: { cfiIsUpdate, cfiType, cfiId }, activeLayId, dataSourceOptions, setDsOptions, setFormField }) => {
  useEffect(() => {
    // 查询配置信息
    setCurrentValidate(validateFields);
  }, [activeLayId, setCurrentValidate, validateFields]);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <Form {...formItemLayout} style={{ marginTop: '10px' }}>
      <Form.Item labelAlign="right" label={<span className="scale">数据绑定</span>} className="property-content">
        {getFieldDecorator('cfiName', {
          rules: [
            {
              max: 10,
              message: '最多输入10个字符',
            },
            {
              required: true,
              message: '请输入功能名',
            },
            {
              validator: (rules, value, callback) => {
                selectRepeat(value, cfiId).then(res => {
                  // console.log(res.code);
                  if (res.code === '1') callback(new Error(res.msg));
                  else callback();
                });
              }
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label={<span className="scale">图表类型</span>} className="property-content">
        {getFieldDecorator('cfiType', {})(<Input disabled />)}
      </Form.Item>
      <Form.Item label={<span className="scale">数据更新</span>} className="property-content">
        {getFieldDecorator('cfiIsUpdate', {})(<Select className="select" >
          <Select.Option value={1}>不更新</Select.Option>
          <Select.Option value={2}>定时更新</Select.Option>
        </Select>)}
      </Form.Item>
      <Form.Item label={<span className="scale">更新时间</span>} className="property-content" style={{ display: cfiIsUpdate === 1 ? 'none' : null }}>
        {getFieldDecorator('cfiUpdateHz', {
          rules: [
            {
              required: cfiIsUpdate !== 1,
              message: '请输入更新时间',
            },
          ],
        })(<InputNumber min={1} style={{ width: 'calc(100% - 20px)' }} />)}
        <span style={{ marginLeft: '5px' }}>秒</span>
      </Form.Item>

      <Form.Item label={<span className="scale">数据源</span>} className="property-content">
        {getFieldDecorator('cdsOdbcType', {})(<Select className="select" onChange={e => {
          setDsOptions(cfiType, e, 1);
          setFormField({ cfiDatasourceId: '' });
        }}>
          <Select.Option value={'1'}>自定义</Select.Option>
          <Select.Option value={'2'}>URL</Select.Option>
          <Select.Option value={'3'}>SQL</Select.Option>
        </Select>)}
      </Form.Item>
      <Form.Item className="property-content" label={<span className="scale">数据绑定</span>} >
        {getFieldDecorator('cfiDatasourceId', {
          rules: [
            {
              required: true,
              message: '请选择绑定数据',
            },
          ],
        })(
          <Select className="select" onChange={e => {
            const o = _.find(dataSourceOptions, item => item.cdsOdbcId === e);
            const cdsOdbcValue = _.get(o, 'cdsOdbcValue', JSON.stringify(''));
            setFormField({ cdsOdbcValue });
          }}>
            <Select.Option value="">选择绑定数据</Select.Option>
            {_.map(dataSourceOptions, ({ cdsOdbcId, cdsRemark }) => <Select.Option key={cdsOdbcId} value={cdsOdbcId}>{cdsRemark}</Select.Option>)}
          </Select>
        )}
      </Form.Item>
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
    dataSourceOptions,
    activeLayId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFormField: field => dispatch(gridActions.setFormField(field)),
    setDsOptions: (cdsChartId, cdsOdbcType, cdsSystemId) => dispatch(propertyActions.setDsOptions(cdsChartId, cdsOdbcType, cdsSystemId)),
    setCurrentValidate: fn => dispatch(propertyActions.setCurrentValidate(fn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
