/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Input, Skeleton, Icon, Message } from 'antd';
import { connect } from 'react-redux';
// actions
import { actions as configGroupActions } from '@/redux/configGroup';
import { actions as gridActions } from '@/redux/grid';
import { actions as appActions } from '@/redux/app';

import { deleteConfig } from '@/api/cs_api';
import { showConfirm } from '@/utils';
import { types, dragTypes } from '@/utils/const';
import CstSelect from '@/components/CstSelect';
import _ from 'lodash';

// types
import { DRAG_TYPE_ECHART } from '@/utils/const';
const { Search } = Input;
// eslint-disable-next-line complexity
const Panel = ({ setTempData, deleteTag, activeTagId, getConfigGroup, visibleIds, configGroup, isFetching, cfgIdsByPId, setVisibleIds, queryByConfigId }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible4, setVisible4] = useState(false);

  const [dragModelsSel, setDragModelsSel] = useState(DRAG_TYPE_ECHART);

  useEffect(() => {
    // 查询配置信息
    getConfigGroup('');
  }, [getConfigGroup]);

  return (
    <div className="panel-box">
      <div className="panel-box-item" style={{ height: '35%' }}>
        <div className="btn" onClick={() => setVisible1(!visible1)}>
          <span className="scale">工作台模板</span>
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
            isFetching ? <Skeleton active /> : _.map(_.keys(cfgIdsByPId), id => {
              return (
                <div key={id}>
                  <div className="group-btn" onClick={() => setVisibleIds(id)}>
                    <span className="scale">{configGroup[id].cfgName}</span>
                    <span className="group-btn-del" onClick={e => {
                      e.stopPropagation();
                      showConfirm(`是否删除分组 ${configGroup[id].cfgName}`, function() {
                        deleteConfig(id).then(res => {
                          Message.success(res.msg);
                          // 删除分组打开的tags
                          _.map(cfgIdsByPId[id], id => deleteTag(id));
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
                      paddingBottom: _.findIndex(visibleIds, cfgId => cfgId === id) === -1 ? 0 : '10px',
                      maxHeight: _.findIndex(visibleIds, cfgId => cfgId === id) === -1 ? 0 : '1000px'
                    }}
                  >
                    {
                      // eslint-disable-next-line complexity
                      _.map(cfgIdsByPId[id], cId => (<li
                        key={cId}
                        onClick = {() => {
                          if (activeTagId === cId) return;
                          queryByConfigId(configGroup[cId]);
                        }}
                        style={{ color: activeTagId === cId ? '#03AFFF' : null }}
                      >
                        <span className="scale">{configGroup[cId].cfgName}{types[configGroup[cId].cfgStatus]}</span>
                      </li>))
                    }
                  </ul>
                </div>
              );
            })
          }
        </div>
      </div>
      <img style={{ margin: '10px 0', height: '10px' }} src={require('@/assets/images/l-panel.png')} alt="" />
      <div className="panel-box-item" style={{ height: 'calc(65% - 30px)' }}>
        <div className="btn" onClick={() => setVisible4(!visible4)}>
          <span className="scale">应用套件</span>
          <Icon style={{ marginLeft: '10px' }} type="double-left" />
        </div>
        <div
          className="content"
          style={{
            paddingTop: visible4 ? 0 : '10px',
            // overflow: visible4 ? 'hidden' : 'auto',
            maxHeight: visible4 ? 0 : '1000px'
          }}
        >
          <CstSelect options={[{ value: DRAG_TYPE_ECHART, label: '图表类型' }]} defaultValue={ DRAG_TYPE_ECHART } onChange={e => setDragModelsSel(e)} />
          <ul className="temp-list">
            {
              _.map(dragTypes[dragModelsSel], (v, i) => (
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

const mapStateToProps = ({ configGroupState: { visibleIds, configGroup, isFetching, cfgIdsByPId }, appState, gridState }) => {
  return {
    visibleIds,
    configGroup,
    isFetching,
    cfgIdsByPId,
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
