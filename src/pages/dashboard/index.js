import React, { useState, useRef } from 'react';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from '@/components/TagViews';
import { Modal, Form, Input, message } from 'antd';
import { addStaticTemp, getStaticTemp, deleteTemp } from '@/api/index';
import { getToken } from '@/utils/auth';

// const { Option } = Select;
export default () => {
  const [tempData, setTempData] = useState({});
  const [tags, setTags] = useState([]);
  const [showModel, handleShowModel] = useState(false);
  const [InputValue, handleInputValue] = useState('');
  const [curIndex, handleCurIndex] = useState([]);// 当前模板id
  const [layouts, setLayouts] = useState([{ type: 'bar', x: 1, y: 0, w: 4, h: 8 }]);// layouts

  const childRef = useRef();
  const gridRef = useRef();
  const addNewModule = () => {
    addStaticTemp({ token: getToken(), cucName: InputValue, cucStatus: '1' }).then(res => {
      message.success(res.msg);
      handleShowModel(false);
      handleInputValue('');
    }).then(() => {
      getStaticTemp({ token: getToken() }).then(res => {
        if (res.data.rows.length) {
          childRef.current.changeVal(res.data.rows);
        }
      }).catch(err => {
        console.error(err);
      });
    }).catch(err => {
      console.error(err);
    });
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
            <li className="btn-item" onClick={() => { deleteTemp(); }}>删除</li>
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
          <Panel ref={childRef}
            cRef={childRef}
            setTempData={setTempData}
            tags={tags}
            setTags={setTags}
            handleCurIndex={handleCurIndex}
            curIndex={curIndex} />
        </div>
        <div className="dashboard-container-body-content">
          <Modal
            centered
            visible={ showModel}
            closable={false}
            footer={null}
          >
            <Form>
              <Form.Item>
                <Input
                  style={{ width: 200 }}
                  onChange={val => { handleInputValue(val.target.value); }}
                  placeholder="请输入模板名称"
                />
              </Form.Item>
              <Form.Item>
                <button className="global-btn" onClick={() => { addNewModule(); }}>确定</button>
                <button className="global-btn" onClick={() => { handleShowModel(false);handleInputValue(''); }}>取消</button>
              </Form.Item>
            </Form>
          </Modal>
          <TagViews tags={tags} setTags={setTags} curIndex={curIndex} handleCurIndex={handleCurIndex} />
          <Grid tempData={tempData} tags={tags} ref={gridRef} layout={layouts} setLayouts={setLayouts} isDroppable />
        </div>
      </div>
    </div>
  );
};
