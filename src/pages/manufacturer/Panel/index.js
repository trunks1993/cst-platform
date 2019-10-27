/* eslint-disable no-alert */
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

const { Search } = Input;
// eslint-disable-next-line complexity
const Panel = ({ setTempData, deleteTag, activeTagId, getConfigGroup, configGroupState, setVisibleIds, queryByConfigId }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);

  useEffect(() => {
    // 查询配置信息
    getConfigGroup('');
  }, [getConfigGroup]);

  return (
    <div className="panel-box">
      <div className="panel-box-item">
        <div className="btn" onClick={() => setVisible1(!visible1)}>
          <span>工作台模板</span>
          <Icon style={{ marginLeft: '10px' }} type="double-left" />
        </div>
        <div
          className="content"
          style={{
            paddingTop: visible1 ? 0 : '10px',
            maxHeight: visible1 ? 0 : '1000px'
          }}
        >
          <Search
            placeholder="请输入模板名称"
            onSearch={value => getConfigGroup(value)}
          />
          {
            configGroupState.isFetching ? <Skeleton active /> : configGroupState.configGroup.map((group, index) => {
              return (
                <div key={index}>
                  <div className="group-btn" onClick={() => setVisibleIds(group.cfgId)}>
                    {group.cfgName}
                    <span className="group-btn-del" onClick={e => {
                      e.stopPropagation();
                      showConfirm(`是否删除分组 ${group.cfgName}`, function() {
                        deleteConfig(group.cfgId).then(res => {
                          Message.success(res.msg);
                          // 删除分组打开的tags
                          _.map(group.children, v => deleteTag(v.cfgId));
                          getConfigGroup('');
                        });
                      });
                    }}>
                      <Icon type="delete" />
                    </span>
                    <span className="group-btn-iconbox">
                      <Icon type="caret-down" />
                    </span>
                  </div>
                  <ul
                    className="group-list"
                    style={{
                      paddingBottom: _.findIndex(configGroupState.visibleIds, id => id === group.cfgId) === -1 ? 0 : '10px',
                      maxHeight: _.findIndex(configGroupState.visibleIds, id => id === group.cfgId) === -1 ? 0 : '1000px'
                    }}
                  >
                    {
                      // eslint-disable-next-line complexity
                      _.map(group.children, child => (<li
                        key={child.cfgId}
                        onClick = {() => {
                          if (activeTagId === child.cfgId) return;
                          queryByConfigId(child);
                        }}
                        style={{ color: activeTagId === child.cfgId ? '#03AFFF' : null }}
                      >
                        {child.cfgName}{types[child.cfgStatus]}
                      </li>))
                    }
                  </ul>
                </div>
              );
            })
          }
        </div>
      </div>
      <img style={{ margin: '10px 0' }} src={require('@/assets/images/l-panel.png')} alt="" />
      <div className="panel-box-item">
        <div className="btn" onClick={() => setVisible4(!visible4)}>
          应用套件
          <Icon style={{ marginLeft: '10px' }} type="double-left" />
        </div>
        <div
          className="content"
          style={{
            paddingTop: visible4 ? 0 : '10px',
            maxHeight: visible4 ? 0 : '1000px'
          }}
        >
          <div className="temp-btn" onClick={() => setVisible5(!visible5)}>
            <span>大数据平台</span>
            <span className="temp-btn-iconbox">
              <Icon type="caret-down" />
            </span>
          </div>
          <ul
            className="temp-list"
            style={{ maxHeight: visible5 ? 0 : '1000px' }}
          >
            {
              _.map(tempArr, (v, i) => (
                // eslint-disable-next-line no-unused-expressions
                <li
                  key={i}
                  draggable
                  onDragStart={() => {
                    if (activeTagId === '') Message.warning('请先选择模板');
                    setTempData(v);
                  }}
                  unselectable="on"
                >
                  <div className="drag-mask" />
                  <img draggable={ false } src={require('@/assets/images/tempIcons/' + v.icon)} alt="" />
                  <div className="title">{v.name}</div>
                </li>)
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ configGroupState, appState, gridState }) => {
  return {
    configGroupState,
    activeTagId: appState.activeTagId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConfigGroup: cfgName => dispatch(configGroupActions.getConfigGroup(cfgName)),
    setVisibleIds: id => dispatch(configGroupActions.setVisibleIds(id)),
    queryByConfigId: id => dispatch(gridActions.queryByConfigId(id)),
    deleteTag: tag => dispatch(appActions.deleteTag(tag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
