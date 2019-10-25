import React, { useState, useEffect } from 'react';
import { Input, Skeleton, Icon, Message } from 'antd';
import { connect } from 'react-redux';
// actions
import { actions as configGroupActions } from '@/redux/configGroup';
import { actions as gridActions } from '@/redux/grid';
import { actions as appActions } from '@/redux/app';

import { deleteConfig } from '@/api/cs_api';
import { tempArr } from '@/config';
import { showConfirm } from '@/utils';
import { types } from '@/utils/const';

import _ from 'lodash';

// Form组件
import InputForm from './InputForm';
import RadioForm from './RadioForm';

// eslint-disable-next-line complexity
export default () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <div className="property-panel">
      <div className="property-panel-item">
        <div className="btn" onClick={() => setVisible1(!visible1)}>
          <span>属性面板</span>
          <Icon style={{ marginLeft: '10px' }} type="double-left" />
        </div>
        <div className="content" style={{ maxHeight: visible1 ? 0 : '1000px' }}>
          <InputForm />
        </div>
      </div>
      <img style={{ margin: '10px 0' }} src={require('@/assets/images/l-panel.png')} alt="" />
      <div className="property-panel-item">
        <div className="btn" onClick={() => setVisible2(!visible2)}>
          <span>应用套件</span>
          <Icon style={{ marginLeft: '10px' }} type="double-left" />
        </div>
        <div className="content" style={{ maxHeight: visible2 ? 0 : '1000px' }}>
          <RadioForm />
        </div>
      </div>
    </div>
  );
};
