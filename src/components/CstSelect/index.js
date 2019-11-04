import React, { useState } from 'react';
import { Icon } from 'antd';
import _ from 'lodash';
import { DRAG_TYPE_ECHART } from '@/utils/const';

export default ({ onChange, options, defaultValue }) => {
  const [value, setValue] = useState(DRAG_TYPE_ECHART);
  const [visible, setVisible] = useState(true);
  return (
    <div className="temp-select">
      <div className="temp-select-result" onClick={() => {
        setVisible(!visible);
      }}>
        <span>{_.find(options, item => item.value === value).label}</span>
        <span className="temp-select-iconbox">
          <Icon type="caret-down" />
        </span>
      </div>
      <ul className="temp-select-option" style={{ display: visible ? 'none' : null }}>
        {_.map(options, item => <li key={item.value} className={value === item.value ? 'active' : '' } onClick={() => {
          onChange && onChange(item.value);
          setValue(item.value);
          setVisible(!visible);
        }}>{item.label}</li>)}
      </ul>
    </div>
  );
};
