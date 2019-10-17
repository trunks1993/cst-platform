/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Skeleton, Icon } from 'antd';
import { SaveGroupData } from '../../redux/actions';
import { queryConfig, deleteGroupConfig, queryByConfigId } from '../../api';
import { getToken } from '../../utils/auth';
import _ from 'lodash';

const { Search } = Input;

// eslint-disable-next-line complexity
const Panel = ({ setTempData, configData, addGroupConfigData }) => {
  const [visible1, setVisible1] = useState(false);
  const [groupDatas, setGroupDatas] = useState([]);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [queryConfigState, setQueryState] = useState(false);

  useEffect(() => {
    const token = getToken();
    // 查询配置信息
    queryConfig(token).then(res => {
      // 左侧配置(组名和组的子节点)
      console.log('query config', res);

      const newArr = Array(res.data.length).fill(true);
      setGroupDatas(newArr);
      // dispatch 添加组的数据
      addGroupConfigData(res.data);

      setQueryState(!queryConfigState);
    });
  }, []);
  console.log('-----------------', configData);

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
            onSearch={value => console.log(value)}
          />

          {
            !queryConfigState ? <Skeleton active /> : configData.map((group, index, arrs) => {
              return (
                <div key={group.cfgId}>
                  <div className="group-btn" onClick={() => {
                    // 这里 ...............
                    const ary = _.clone(groupDatas);
                    ary[index] = !groupDatas[index];
                    setGroupDatas(ary);
                  }}>
                    {group.cfgName}
                    <span className="group-btn-iconbox">
                      <Icon type="caret-down" />
                    </span>
                  </div>
                  <ul
                    className="group-list"
                    style={{
                      paddingBottom: groupDatas[index] ? 0 : '10px',
                      maxHeight: groupDatas[index] ? 0 : '1000px'
                    }}
                  >
                    {
                      // eslint-disable-next-line complexity
                      group.children.map(child => <li
                        key={child.cfgId}
                        onClick={async e => {
                          const nodes = e.target.parentNode.childNodes;
                          for (let i = 0; i < nodes.length; i++) {
                            nodes[i].setAttribute('class', '');
                          }
                          e.target.setAttribute('class', 'active-li');

                          console.log('删除当前选中配置', child.cfgId);
                          const deleteRes = await deleteGroupConfig(child.cfgId, getToken());

                          console.log('deleteRes: ', deleteRes);

                          const configDetail = await queryByConfigId(child.cfgId, getToken());
                          console.log('configDetail: ', configDetail);

                        }}
                      >
                        {child.cfgName}{child.cfgStatus === 0 ? '(编辑中)' : (child.state === 1 ? '(已保存)' : '(已发布)')}
                      </li>)
                    }
                  </ul>
                </div>
              );
            })
          }
        </div>
      </div>
      <img
        style={{ margin: '10px 0' }}
        src={require('../../assets/images/l-panel.png')}
        alt=""
      />
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
            <li
              draggable
              onDragStart={() => {
                return setTempData({
                  type: 'bar',
                  title: '罪犯文化程度',
                  minW: 2,
                  minH: 4,
                  w: 4,
                  h: 8
                });
              }}
              unselectable="on"
            >
              <img
                src={require('../../assets/images/tempIcons/1.png')}
                alt=""
              />
              <div className="title">罪犯文化程度...</div>
            </li>
            <li
              draggable
              onDragStart={() => {
                return setTempData({
                  type: 'line',
                  title: '罪犯婚姻状况',
                  minW: 2,
                  minH: 4,
                  w: 4,
                  h: 8
                });
              }}
              unselectable="on"
            >
              <img
                draggable={false}
                src={require('../../assets/images/tempIcons/1.png')}
                alt=""
              />
              <div className="title">罪犯婚姻状况...</div>
            </li>
            <li
              draggable
              onDragStart={() => {
                return setTempData({
                  type: 'pie',
                  title: '三类罪犯统计',
                  minW: 2,
                  minH: 2,
                  w: 3,
                  h: 8
                });
              }}
              unselectable="on"
            >
              <img
                src={require('../../assets/images/tempIcons/1.png')}
                alt=""
              />
              <div className="title">三类罪犯统计</div>
            </li>
            <li>
              {/* <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">四涉罪犯统计</div> */}
            </li>
            {/* <li>
              <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">罪犯危险性分...</div>
            </li>
            <li>
              <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">监狱安全指数</div>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { data } }) => {
  return {
    configData: data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGroupConfigData: data => dispatch(SaveGroupData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
