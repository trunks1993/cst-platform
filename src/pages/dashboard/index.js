import React from 'react';
import Grid from './Grid';
import Panel from './Panel';

export default () => (
  <div className="dashboard-container" >
    <div className="dashboard-container-header">
      <div className="dashboard-container-header-title">
        <span className="label">个性化工作台</span>
        <img src={require('../../assets/images/bg-dashboard-headerl.png')} alt="" />
      </div>
      <div className="btn">
        <img src={require('../../assets/images/bg-dashboard-header.png')} alt="" />
      </div>
    </div>
    <div className="dashboard-container-body">
      <div className="dashboard-container-body-panel">
        {/* <div className="droppable-element" draggable unselectable="on" /> */}
        <Panel />
      </div>
      <div className="dashboard-container-body-content">
        <div className="tag-views" />
        <Grid />
      </div>
    </div>
  </div>
);
