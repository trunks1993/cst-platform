import React, { useState } from 'react';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from '@/components/TagViews';
import { Modal, Form, Input, Select } from 'antd';
const { Option } = Select;
export default () => {
  const [tempData, setTempData] = useState({});
  const [tags, setTags] = useState([]);
  const [showModel, handleShowModel] = useState(false);
  // const [SelectValue, handleSelectValue] = useState('');
  // const [InputValue, handleInputValue] = useState('');
  // const addNewModule = () => {

  // };
  const onSearch = () => {

  };
  const onBlur = () => {

  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-container-header">
        <div className="dashboard-container-header-title">
          <span className="label">个性化工作台</span>
          <img
            src={require('../../assets/images/bg-dashboard-headerl.png')}
            alt=""
          />
        </div>
        <div className="dashboard-container-header-btn">
          <img
            src={require('../../assets/images/bg-dashboard-header.png')}
            alt=""
          />
          <ul>
            <li className="btn-item" onClick={() => { handleShowModel(true); }}>新建</li>
            <li className="btn-item">保存</li>
            <li className="btn-item">另存为</li>
            <li className="btn-item">删除</li>
            <li className="btn-item">重置</li>
            <li className="btn-item">预览</li>
            <li className="btn-item">发布</li>
            <li className="btn-item">共享</li>
            <li className="btn-item">关闭</li>
          </ul>
        </div>
      </div>
      <div className="dashboard-container-body">
        <div className="dashboard-container-body-panel">
          {/* <div className="droppable-element" draggable unselectable="on" /> */}
          <Panel setTempData={setTempData} tags={tags} setTags={setTags} />
        </div>
        <div className="dashboard-container-body-content">
          <Modal
            centered
            visible={ showModel}
            onOk={() => handleShowModel(false)}
            onCancel={() => handleShowModel(false)}
            closable={false}
            footer={null}
          >
            <Form>
              <Form.Item label="添加组：">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择组名"
                  optionFilterProp="children"
                  // onChange={val => { console.log(val);
                  //   handleSelectValue(val); }}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  // allowClear
                  filterOption={
                    (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* <Option value="1">公共模板</Option> */}
                  <Option value="1">个人模板</Option>
                </Select>
              </Form.Item>
              <Form.Item label="配置名">
                <Input
                  style={{ width: 200 }}
                  // onChange={val => { console.log(val.target.value);
                  //   handleInputValue(val.target.value); }}
                  placeholder="请填写配置名"
                />
              </Form.Item>
              <Form.Item>
                <button className="global-btn">确定</button>
                <button className="global-btn" onClick={() => { handleShowModel(false); }}>取消</button>
              </Form.Item>
            </Form>
          </Modal>
          <TagViews tags={tags} setTags={setTags} />
          <Grid tempData={tempData} />
        </div>
      </div>
    </div>
  );
};
