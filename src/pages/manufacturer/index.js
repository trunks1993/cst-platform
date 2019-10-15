import React, { useState } from 'react';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from './TagViews';
import PropertyPanel from './PropertyPanel';
import request from '../../utils/request';

const operates = [
  {
    key: 'build',
    label: '新建',
    callback: function() {
      request.get('https://jsonplaceholder.typicode.com/todos/1').then(res => {
        console.log('res: ', res);
      });
    }
  },
  {
    key: 'save',
    label: '保存',
    callback: function() {
      console.log('保存啊');
    }
  },
  {
    key: 'delete',
    label: '删除',
    callback: function() {
      console.log('删除啊');
    }
  },
  {
    key: 'reset',
    label: '重置',
    callback: function() {
      console.log('重置啊');
    }
  },
  {
    key: 'preview',
    label: '预览',
    callback: function() {
      console.log('预览啊');
    }
  },
  {
    key: 'publish',
    label: '发布',
    callback: function() {
      console.log('发布啊');
    }
  },
  {
    key: 'share',
    label: '共享',
    callback: function() {
      console.log('共享啊');
    }
  },
  {
    key: 'close',
    label: '关闭',
    callback: function() {
      console.log('关闭啊');
    }
  },
];

export default () => {
  const [tempData, setTempData] = useState({});
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
            {
              operates.map(item => <li key={item.key} className="btn-item" onClick={() => {
                item.callback();
              }}>{item.label}</li>)
            }
          </ul>
        </div>
      </div>
      <div className="dashboard-container-body">
        <div className="dashboard-container-body-panel">
          {/* <div className="droppable-element" draggable unselectable="on" /> */}
          <Panel setTempData={setTempData} />
        </div>
        <div
          className="dashboard-container-body-content"
          style={{ position: 'relative' }}
        >
          <TagViews />
          <Grid tempData={tempData} />
          <PropertyPanel visible />
        </div>
      </div>
    </div>
  );
};
