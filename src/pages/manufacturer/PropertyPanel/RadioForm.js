import React from 'react';
import { Form, Radio } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';

// actions
import { actions as gridActions } from '@/redux/grid';

const Component = Form.create({})(({ form: { getFieldDecorator, validateFields } }) => {
  return (
    <Form>
      <div className="application-config expand-active">
        <span className="radio-title">放大</span>
        {getFieldDecorator('glass', {})(
          <Radio.Group>
            <Radio className="radio-style" value={1}>启用</Radio>
            <Radio className="radio-style" value={2}>禁用</Radio>
          </Radio.Group>
        )}
      </div>

      <div className="application-config">
        <span className="radio-title">过滤</span>
        {getFieldDecorator('filter', {})(
          <Radio.Group>
            <Radio className="radio-style" value={1}>启用</Radio>
            <Radio className="radio-style" value={2}>禁用</Radio>
          </Radio.Group>
        )}
      </div>

      <div className="application-config">
        <span className="radio-title">导出</span>
        {getFieldDecorator('export', {})(
          <Radio.Group>
            <Radio className="radio-style" value={1}>启用</Radio>
            <Radio className="radio-style" value={2}>禁用</Radio>
          </Radio.Group>
        )}
      </div>

      <div className="application-config">
        <span className="radio-title">明细</span>
        {getFieldDecorator('detail', {})(
          <Radio.Group>
            <Radio className="radio-style" value={1}>启用</Radio>
            <Radio className="radio-style" value={2}>禁用</Radio>
          </Radio.Group>
        )}
      </div>
    </Form>
  );
});

const RadioForm = Form.create({
  mapPropsToFields(props){
    return props.formData ? {
      glass: Form.createFormField({
        value: props.formData.cfiEvent.glass
      }),
      filter: Form.createFormField({
        value: props.formData.cfiEvent.filter
      }),
      export: Form.createFormField({
        value: props.formData.cfiEvent.export
      }),
      detail: Form.createFormField({
        value: props.formData.cfiEvent.detail
      })
    } : {};
  },
  onFieldsChange({ setFormField }, changedFields){},
  onValuesChange({ setFormField }, changedValues, allValues){
    const key = _.findKey(changedValues);
    const field = { [`cfiEvent.${key}`]: changedValues[key] };
    setFormField(field);
  }

})(Component);

const mapStateToProps = ({ gridState: { activeLayId, currentData } }) => {
  const formData = currentData[activeLayId];
  return {
    formData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFormField: field => dispatch(gridActions.setFormField(field))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioForm);
