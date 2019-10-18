import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from '@/components/TagViews/test';
import PropertyPanel from './PropertyPanel';
import { getToken } from '@/utils/auth';
import { SaveGroupData } from '../../redux/actions';
import _ from 'lodash';
import { UserContext } from '@/utils/contexts';

// API
import { saveGroupConfig, getSelectParent, queryConfig, saveInfo, updateStauts } from '@/api/cs_api';

import { Modal, Form, Input, AutoComplete } from 'antd';
const { Option } = AutoComplete;

const operates = [
  {
    key: 'build',
    label: '新建',
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

const Main = ({ addConfigData }) => {
  const [tempData, setTempData] = useState({});
  const [showModel, handleShowModel] = useState(false);
  const [groupId, setGroupId] = useState({
    id: ''
  });
  const [configName, setConfigName] = useState({
    value: ''
  });
  const [formInfo, setFormInfo] = useState([]);// layouts
  const [selectId, setSelectId] = useState('');// layouts选中Id

  const [selectTag, setSelectTag] = useState({});// tags选中Id

  const [groupParents, setParents] = useState([]);

  const callSave = async() => {
    // 组名 (groupName) 不传的话就是新建组，配置名 (configName) 就会当作组名
    // 选择了组名，配置名就是组下的配置名
    if (configName.value) {
      const res = await saveGroupConfig({ configName: configName.value, cfgParentId: groupId.value }, getToken());
      handleShowModel(!showModel);
      // 新建配置后重新请求所有配置
      const allConfigData = await queryConfig(getToken());

      // disptch 保存到 common state
      addConfigData(allConfigData.data);
    }
  };

  const user = useContext(UserContext);
  console.log('user', user);
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
                  case '新建':
                    item.callback(handleShowModel, showModel);
                    break;
                  // eslint-disable-next-line no-duplicate-case
                  case '保存':
                    saveInfo(formInfo).then(res => {
                      console.log(res);
                    });
                    break;
                  case '删除':
                    item.callback(111);
                    break;
                  case '发布':
                    updateStauts(selectTag.cfgId, 3, user.surUserId).then(res => {});
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
          <Panel setSelectTag={setSelectTag} selectTag={selectTag} setSelectId={setSelectId} setTempData={setTempData} setFormInfo={setFormInfo} />
        </div>
        <div
          className="dashboard-container-body-content"
          style={{ position: 'relative' }}
        >
          <Modal
            centered
            visible={ showModel}
            onOk={() => handleShowModel(false)}
            onCancel={() => handleShowModel(false)}
            closable={false}
            footer={null}
          >
            <Form>
              <Form.Item label="添加组：">
                <AutoComplete
                  AutoComplete
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择组名"
                  optionFilterProp="children"
                  onChange={val => setGroupId({ value: val })}
                  value={groupId.value}
                >

                  {
                    groupParents.map(item => <Option key={item.cfgId} value={item.cfgId}>{item.cfgName}</Option>)
                  }
                </AutoComplete>
              </Form.Item>
              <Form.Item label="配置名">
                <Input
                  style={{ width: 200 }}
                  onChange={val => setConfigName({ value: val.target.value })}
                  //   handleInputValue(val.target.value); }}
                  placeholder="请填写配置名"
                />
              </Form.Item>
              <Form.Item>
                <button className="global-btn" onClick={() => callSave()}>确定</button>
                <button className="global-btn" onClick={() => { handleShowModel(false); }}>取消</button>
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
    addConfigData: data => dispatch(SaveGroupData(data))
  };
};

export default connect(null, mapDispatchToProps)(Main);
