import React, { useState } from 'react';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from '@/components/TagViews';

export default () => {
  const [tempData, setTempData] = useState({});

  const [tags, setTags] = useState([]);

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
            <li className="btn-item">新建</li>
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
          <TagViews tags={tags} setTags={setTags} />
          <Grid tempData={tempData} />
        </div>
      </div>
    </div>
  );
};
