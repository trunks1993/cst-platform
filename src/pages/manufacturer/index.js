import React, { useState, useContext, useRef } from 'react';
import { connect } from 'react-redux';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from '@/components/TagViews/test';
import PropertyPanel from './PropertyPanel';
import _ from 'lodash';
import { UserContext } from '@/utils/contexts';
import { getCSGroup } from '@/redux/actions';
import { Select } from 'antd';
// API
import { saveGroupConfig, getSelectParent, deleteConfig, saveInfo, updateStauts } from '@/api/cs_api';

import { Modal, Form, Input, Message } from 'antd';
// const { Option } = AutoComplete;

const operates = [
  {
    key: 'build',
    label: '新建分组',
    callback: function(fn, state) {
      fn(!state);
    }
  },
  {
    key: 'build',
    label: '新建配置',
    callback: function(fn, state) {
      fn(!state);
    }
  },
  {
    key: 'save',
    label: '保存',
    callback: function(fn) {
      fn();
    }
  },
  {
    key: 'delete',
    label: '删除',
    callback: function(a) {
      console.log('删除啊', a);
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
    key: 'publish',
    label: '发布',
    callback: function() {
      console.log('发布啊');
    }
  }
];

const Main = ({ getCSGroup }) => {
  const [tempData, setTempData] = useState({});
  const [newModelVisible, handleNewModelVisible] = useState(false);

  const [newGroupVisible, handleNewGroupVisible] = useState(false);

  // 选择组
  const [groupId, setGroupId] = useState('');
  // 新建配置
  const [cfgName, setCfgName] = useState('');

  // 新建组
  // const [groupName, setGroupName] = useState('');

  const [formInfo, setFormInfo] = useState([]);// layouts
  const [selectId, setSelectId] = useState('');// layouts选中Id

  const [selectTag, setSelectTag] = useState({});// tags选中Id

  const [groupParents, setGroupParents] = useState([]);

  // const callSave = async() => {
  //   // 组名 (groupName) 不传的话就是新建组，配置名 (configName) 就会当作组名
  //   // 选择了组名，配置名就是组下的配置名
  //   if (configName.value) {
  //     const res = await saveGroupConfig({ configName: configName.value, cfgParentId: groupId.value }, getToken());
  //     handleShowModel(!showModel);
  //     // 新建配置后重新请求所有配置
  //     const allConfigData = await queryConfig(getToken());
  //     // disptch 保存到 common state
  //     addConfigData(allConfigData.data);
  //   }
  // };
  const childRef = useRef();


  const handleSave = () => {
    // const isNum = (typeof +groupId === 'number' && !isNaN(+groupId));
    // const id = isNum ? groupId : '';
    saveGroupConfig(groupId, cfgName).then(res => {
      Message.success('保存成功');
      childRef.current.fqueryConfig();
      handleNewModelVisible(false);
    });
  };

  const handleSaveGroup = () => {
    // const isNum = (typeof +groupId === 'number' && !isNaN(+groupId));
    // const id = isNum ? groupId : '';
    saveGroupConfig('', cfgName).then(res => {
      Message.success('保存成功');
      childRef.current.fqueryConfig();
      handleNewGroupVisible(false);
    });
  };

  const openNewModel = () => {
    handleNewModelVisible(!newModelVisible);
    getSelectParent().then(res => {
      setGroupParents(res.data);
    });
  };

  const openNewGroupModel = () => {
    handleNewGroupVisible(!newGroupVisible);
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
          <ul>
            {
              // eslint-disable-next-line complexity
              operates.map(item => <li key={item.key} className="btn-item" onClick={(e) => {
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
                    saveInfo(formInfo).then(res => {
                      childRef.current.fqueryConfig();
                      Message.success('保存成功');
                    });
                    break;
                  case '删除':
                    deleteConfig(selectTag.cfgId).then(res => {
                      Message.success('删除成功');
                      childRef.current.fqueryConfig();
                    });
                    break;
                  case '发布':
                    updateStauts(selectTag.cfgId, 3, user.surUserId).then(res => {
                      Message.success('发布成功');
                      childRef.current.fqueryConfig();
                    });
                    break;
                  default:
                    return '';
                }
              }}>{item.label}</li>)
            }
          </ul>
        </div>
      </div>
      <div className="dashboard-container-body">
        <div className="dashboard-container-body-panel">
          {/* <div className="droppable-element" draggable unselectable="on" /> */}
          <Panel setSelectTag={setSelectTag} cRef={childRef} ref={childRef} selectTag={selectTag} setSelectId={setSelectId} setTempData={setTempData} setFormInfo={setFormInfo} />
        </div>
        <div
          className="dashboard-container-body-content"
          style={{ position: 'relative' }}
        >
          <Modal centered visible={newModelVisible} footer={null}>
            <Form>
              <Form.Item label="选择加组：">
                <Select
                  style={{ width: 200 }}
                  placeholder="请选择组名"
                  optionFilterProp="children"
                  onChange={e => setGroupId(e)}
                  value={groupId}
                >
                  {
                    groupParents.map(item => <Select.Option key={item.cfgId} value={item.cfgId}>{item.cfgName}</Select.Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item label="配置名">
                <Input
                  style={{ width: 200 }}
                  onChange={e => setCfgName(e.target.value)}
                  placeholder="请填写配置名"
                />
              </Form.Item>
              <Form.Item>
                <button className="global-btn" onClick={() => handleSave()}>确定</button>
                <button className="global-btn" onClick={() => { handleNewModelVisible(false); }}>取消</button>
              </Form.Item>
            </Form>
          </Modal>

          <Modal centered visible={newGroupVisible} footer={null}>
            <Form>
              <Form.Item label="分组名">
                <Input
                  style={{ width: 200 }}
                  onChange={e => setCfgName(e.target.value)}
                  placeholder="请填写分组名"
                />
              </Form.Item>
              <Form.Item>
                <button className="global-btn" onClick={() => handleSaveGroup()}>确定</button>
                <button className="global-btn" onClick={() => handleNewGroupVisible(false)}>取消</button>
              </Form.Item>
            </Form>
          </Modal>
          <TagViews selectTag={selectTag} setSelectTag={setSelectTag} />
          <Grid tempData={tempData} selectTag={selectTag} setSelectId={setSelectId} selectId={selectId} tags={['test']} formInfo={formInfo} setFormInfo={setFormInfo} />
          <PropertyPanel selectId={selectId} setFormInfo={setFormInfo} formInfo={formInfo} visible />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getCSGroup: () => dispatch(getCSGroup())
  };
};

export default connect(null, mapDispatchToProps)(Main);
