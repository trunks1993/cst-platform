import React from 'react';
import { Icon } from 'antd';

export default ({ label, onTitleClick }) => (
  <div className="btn" onClick={() => onTitleClick()}>
    {label}
    <Icon style={{ marginLeft: '10px' }} type="double-left" />
  </div>
);
