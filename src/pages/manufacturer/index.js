/* eslint-disable complexity */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from 'react';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from '@/components/TagViews/test';
import PropertyPanel from './PropertyPanel';
import { UserContext } from '@/utils/contexts';
import BtnTools from '@/components/BtnTools';
import { showConfirm } from '@/utils';

import { connect } from 'react-redux';
import { actions as gridActions } from '@/redux/grid';
import { actions as appActions } from '@/redux/app';
import { actions as configGroupActions } from '@/redux/configGroup';

// 字符串常量
import { CONF_STATUS_PUBLISH, CONF_STATUS_SAVED } from '@/utils/const';

// API
import { saveGroupConfig, getSelectParent, deleteConfig, saveInfo, updateStauts } from '@/api/cs_api';
import _ from 'lodash';

import { Modal, Form, Input, Message, Select } from 'antd';

const manufacturer = ({ cfgStatus, tag, disabled, removeCfgId, deleteTag, getConfigGroup, queryByConfigId, currentDataForSave, validateFields }) => {
  const [tempData, setTempData] = useState({});
  const [newModelVisible, handleNewModelVisible] = useState(false);
  const [newGroupVisible, handleNewGroupVisible] = useState(false);

  // 选择组
  const [groupId, setGroupId] = useState('');

  // 新建分组
  const [cfgName, setCfgName] = useState('');

  const [groupParents, setGroupParents] = useState([]);

  // 顶部工具栏数据
  const btnList = [
    {
      label: '新建分组',
      icon: 'plus',
      fn: () => handleNewGroupVisible(!newGroupVisible)
    },
    {
      label: '新建配置',
      icon: 'folder-add',
      fn: () => {
        handleNewModelVisible(!newModelVisible);
        getSelectParent().then(res => {
          setGroupParents(res.data);
        });
      }
    },
    {
      label: '保存',
      icon: 'file-protect',
      disabled: disabled,
      fn: () => {
        validateFields((err, res) => {
          if (!err) {
            saveInfo(currentDataForSave, tag.cfgId).then(res => {
              getConfigGroup();
              // 移除byConfigId中cfgId对应的layIds数组才能清空缓存重新请求
              removeCfgId(tag.cfgId);
              queryByConfigId(tag);
              Message[res.code === '1' ? 'error' : 'success'](res.msg);
            });
          } else {
            Message.error('提交验证未通过, 请检查属性面板表单数据');
          }
        });
      }
    },
    {
      label: '删除',
      icon: 'delete',
      disabled: disabled,
      fn: () => {
        showConfirm(`是否删除配置项 ${tag.cfgName}`, () => {
          deleteConfig(tag.cfgId).then(res => {
            Message.success(res.msg);
            // 移除tag和layout的数据关联
            removeCfgId(tag.cfgId);
            // 删除标签
            deleteTag(tag.cfgId);
            getConfigGroup();
          });
        });
      }
    },
    {
      label: '重置',
      icon: 'redo',
      disabled: disabled,
      fn: () => {
        showConfirm(`是否重置配置项 ${tag.cfgName}`, () => {
          removeCfgId(tag.cfgId);
          queryByConfigId(tag);
          Message.success('操作成功');
        });
      }
    },
    {
      label: cfgStatus === CONF_STATUS_PUBLISH ? '取消发布' : '发布',
      icon: 'cloud-upload',
      disabled: disabled,
      fn: () => {
        const label = cfgStatus === CONF_STATUS_PUBLISH ? '取消发布' : '发布';
        showConfirm(`${label}配置项 ${tag.cfgName}`, () => {
          const status = cfgStatus === CONF_STATUS_PUBLISH ? CONF_STATUS_SAVED : CONF_STATUS_PUBLISH;
          updateStauts(tag.cfgId, status, user.surUserId).then(res => {
            Message.success(res.msg);
            getConfigGroup();
          });
        });
      }
    }
  ];

  const handleSave = () => {
    saveGroupConfig(groupId, cfgName).then(res => {
      Message.success(res.msg);
      getConfigGroup();
      handleNewModelVisible(false);
    });
  };

  const handleSaveGroup = () => {
    saveGroupConfig('', cfgName).then(res => {
      Message.success(res.msg);
      getConfigGroup();
      handleNewGroupVisible(false);
    });
  };

  const user = useContext(UserContext);
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
          {/* <<<<<<< HEAD
          <ul>
            {
              // eslint-disable-next-line complexity
              operates.map((item, idx) => <li key={idx} className="btn-item" onClick={(e) => {
                switch (e.target.innerText) {
                  case '新建分组':
                    // item.callback(handleShowModel, showModel);
                    openNewGroupModel();
                    break;
                  case '新建配置':
                    // item.callback(handleShowModel, showModel);
                    openNewModel();
                    break;
                  // eslint-disable-next-line no-duplicate-case
                  case '保存':
                    // 选择标签 模块不能为空
                    if (!selectTag.cfgId || formInfo.length === 0) return Message.error('系统未找到可用模板');
                    // 名字不能为空
                    let o = _.find(formInfo, v => _.trim(v.cfiName) === '');
                    if (o !== undefined) {
                      Message.error('功能名不能为空');
                      return setSelectId(JSON.parse(o.cfiLayout).i);
                    }

                    // 数据源未绑定
                    o = _.find(formInfo, v => v.cfiDatasourceId === '0');
                    if (o !== undefined) {
                      Message.error('请绑定数据');
                      return setSelectId(JSON.parse(o.cfiLayout).i);
                    }
                    saveInfo(formInfo).then(res => {
                      childRef.current.fqueryConfig();
                      Message.success(res.msg);
                    });
                    break;
                  case '删除':
                    if (!selectTag.cfgId) return Message.error('请选择要删除的配置');
                    showConfirm(function() {
                      deleteConfig(selectTag.cfgId).then(res => {
                        Message.success(res.msg);
                        childRef.current.fqueryConfig();
                      });
                    }, () => setFormInfo(temp), '请问是否删除当前模块?');
                    break;
                  case '重置':
                    if (!selectTag.cfgId) return Message.error('请选择要重置的配置');
                    const temp = _.clone(formInfo);
                    setFormInfo([]);
                    showConfirm(function() {
                      queryByConfigId(selectTag.cfgId).then(res => {
                        if (res.data.length) setSelectId(JSON.parse(res.data[0].cfiLayout).i);
                        setFormInfo(res.data);
                      });
                    }, () => setFormInfo(temp), '请问是否重置当前配置?');
                    break;
                  case '发布':
                    if (!selectTag.cfgId || formInfo.length === 0) return Message.error('系统未找到可用模板');
                    updateStauts(selectTag.cfgId, 3, user.surUserId).then(res => {
                      Message.success(res.msg);
                      childRef.current.fqueryConfig();
                    });
                    break;
                  default:
                    return '';
                }
              }}> <Icon type={item.iconType} /> {item.label}</li>)
            }
          </ul>
======= */}
          <BtnTools btnList={btnList} />
        </div>
      </div>
      <div className="dashboard-container-body">
        <div className="dashboard-container-body-panel">
          {/* <div className="droppable-element" draggable unselectable="on" /> */}
          <Panel setTempData={setTempData} />
        </div>
        <div className="dashboard-container-body-content">
          <Modal centered visible={newModelVisible} footer={null} closable={false}>
            <Form>
              <Form.Item>
                <Select
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  onChange={e => setGroupId(e)}
                  value={groupId}
                >
                  <Select.Option value="">请选择组名</Select.Option>
                  {
                    groupParents.map(item => <Select.Option key={item.cfgId} value={item.cfgId}>{item.cfgName}</Select.Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item>
                <Input
                  style={{ width: 200 }}
                  onChange={e => setCfgName(e.target.value)}
                  placeholder="请填写配置名"
                />
              </Form.Item>
              <Form.Item>
                <button className="global-btn" onClick={() => handleSave()}>保存</button>
                <button className="global-btn" onClick={() => { handleNewModelVisible(false); }}>取消</button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal centered visible={newGroupVisible} footer={null} closable={false}>
            <Form>
              <Form.Item>
                <Input
                  style={{ width: 200 }}
                  onChange={e => setCfgName(e.target.value)}
                  placeholder="请填写分组名"
                />
              </Form.Item>
              <Form.Item>
                <button className="global-btn" onClick={() => handleSaveGroup()}>保存</button>
                <button className="global-btn" onClick={() => handleNewGroupVisible(false)}>取消</button>
              </Form.Item>
            </Form>
          </Modal>
          <TagViews />
          <Grid tempData={tempData} />
          <PropertyPanel />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ configGroupState: { configGroup }, appState: { activeTagId }, gridState: { byConfigId, currentData }, propertyState: { validateFields } }) => {
  const tag = _.get(configGroup, activeTagId, {});
  const layIds = _.get(byConfigId, activeTagId, []);
  const currentDataForSave = _.map(layIds, id => {
    const data = _.clone(currentData[id]);
    data.cfiLayout = JSON.stringify(data.cfiLayout);
    data.cfiEvent = JSON.stringify(data.cfiEvent);
    return data;
  });
  return {
    currentDataForSave,
    cfgStatus: tag && tag.cfgStatus,
    disabled: activeTagId === '',
    tag,
    validateFields
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConfigGroup: () => dispatch(configGroupActions.getConfigGroup()),
    queryByConfigId: tag => dispatch(gridActions.queryByConfigId(tag)),
    removeCfgId: id => dispatch(gridActions.removeCfgId(id)),
    deleteTag: id => dispatch(appActions.deleteTag(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(manufacturer);
