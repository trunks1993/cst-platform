/* eslint-disable no-alert */
import React, { useState, useEffect, useImperativeHandle } from 'react';
import { connect } from 'react-redux';
import { Input, Skeleton, Icon } from 'antd';
// import { SaveGroupData } from '../../redux/actions';
import { queryConfig, deleteConfig, queryByConfigId } from '@/api/cs_api';
import { tempArr } from '@/config';

import _ from 'lodash';

const { Search } = Input;
// eslint-disable-next-line complexity
export default ({ setTempData, setSelectTag, selectTag, setFormInfo, setSelectId, cRef }) => {
  const [visible1, setVisible1] = useState(false);
  const [groupDatas, setGroupDatas] = useState([]);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [queryConfigState, setQueryState] = useState(false);

  useEffect(() => {
    // 查询配置信息
    aqueryConfig();
  }, [queryConfigState]);

  function aqueryConfig() {
    queryConfig().then(res => {
      // 左侧配置(组名和组的子节点)
      const g = _.map(res.data, v => {
        v.visible = true;
        return v;
      });
      setGroupDatas(g);
      setQueryState(true);
    });
  }

  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    fqueryConfig: () => {
      aqueryConfig();
    }
  }));

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
            !queryConfigState ? <Skeleton active /> : groupDatas.map((group, index, arrs) => {
              return (
                <div key={group.cfgId}>
                  <div className="group-btn" onClick={() => {
                    const t = _.clone(groupDatas);
                    t[index].visible = !group.visible;
                    setGroupDatas(t);
                  }}>
                    {group.cfgName}
                    <span className="group-btn-iconbox">
                      <Icon type="caret-down" />
                    </span>
                  </div>
                  <ul
                    className="group-list"
                    style={{
                      paddingBottom: !group.visible ? 0 : '10px',
                      maxHeight: !group.visible ? 0 : '1000px'
                    }}
                  >
                    {
                      // eslint-disable-next-line complexity
                      group.children.map(child => (<li
                        key={child.cfgId}
                        onClick = {() => {
                          setSelectTag(child);
                          queryByConfigId(child.cfgId).then(res => {
                            if (res.data.length) setSelectId(JSON.parse(res.data[0].cfiLayout).i);
                            setFormInfo(res.data);
                          });
                        }}
                        style={{ color: selectTag.cfgId === child.cfgId ? '#03AFFF' : null }}
                      >
                        {child.cfgName}{child.cfgStatus === 3 ? '(已发布)' : (child.state === 2 ? '(已保存)' : '(编辑中)')}
                      </li>)
                      )
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
            {
              _.map(tempArr, (v, i) => (
                // eslint-disable-next-line no-unused-expressions
                <li
                  key={i}
                  draggable
                  onDragStart={() => setTempData(v)}
                  unselectable="on"
                >
                  <img src={require('@/assets/images/tempIcons/' + v.icon)} alt="" />
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

// const mapStateToProps = ({ user: { data } }) => {
//   return {
//     configData: data
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     addGroupConfigData: data => dispatch(SaveGroupData(data))
//   };
// };

// export default connect(mapStateToProps, null)(Panel);
