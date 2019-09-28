import React from 'react';
import Grid from './Grid';

export default () => (
  <div className="dashboard-container" >
    <div className="dashboard-container-panel">
      <div className="droppable-element" draggable unselectable="on">
            Droppable Element
      </div>
    </div>
    <div className="dashboard-container-content">
      <div className="tag-views" />
      <Grid />
    </div>
  </div>
);
