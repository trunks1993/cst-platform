import React from 'react';
import { Form, Radio } from 'antd';
import { connect } from 'react-redux';
// actions

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
