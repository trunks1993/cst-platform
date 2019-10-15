/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { Input, Skeleton } from 'antd';
// import { getPublicTemp, getStaticTemp } from '@/api/index';
import { Icon } from 'antd';
import _ from 'lodash';
const { Search } = Input;
const tempData = [];

// eslint-disable-next-line complexity
export default ({ setTempData, setTags, tags }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [isShowPublicTemp, ShowPublicTemp] = useState(true);
  const addTag = tag => {
    const fi = _.findIndex(tags, o => o.id === tag.id);
    if (fi < 0) {
      const t = _.clone(tags);
      t.push(tag);
      setTags(t);
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    // getStaticTemp();
    ShowPublicTemp(false);
  },[]);
  return (
    <div className="panel-box" >
      <div className="panel-box-item">
        <div className="btn" onClick={() => setVisible1(!visible1)}>
          <span>工作台模板</span>
          <Icon style={{ marginLeft: '10px' }} type="double-left" />
        </div>
        <div className="content" style={{ paddingTop: visible1 ? 0 : '10px', maxHeight: visible1 ? 0 : '1000px' }}>
          <Search placeholder="请输入模板名称" onSearch={value => console.log(value)} />

          <div className="group-btn" onClick={() => setVisible2(!visible2)}>
            公共模板
            <span className="group-btn-iconbox">
              <Icon type="caret-down" />
            </span>
          </div>
          <ul className="group-list" style={{ paddingBottom: visible2 ? 0 : '10px', maxHeight: visible2 ? 0 : '1000px' }}>
            <Skeleton title={false} loading={ isShowPublicTemp } active>
              {
                tempData.map((tag, index) => (
                  <li key={index} onClick={
                    () => addTag(tag)
                  }>{tag.name}</li>
                ))
              }
            </Skeleton>
          </ul>

          <div className="group-btn" onClick={() => setVisible3(!visible3)}>个人模板<span className="group-btn-iconbox"><Icon type="caret-down" /></span></div>
          <ul className="group-list" style={{ paddingBottom: visible3 ? 0 : '10px', maxHeight: visible3 ? 0 : '1000px' }}>
            <Skeleton title={false} loading={ isShowPublicTemp } active>
              <li>分析研判岗-通用模板一</li>
            </Skeleton>
          </ul>

        </div>
      </div>
      <img style={{ margin: '10px 0' }} src={require('../../assets/images/l-panel.png')} alt="" />
      <div className="panel-box-item">
        <div className="btn" onClick={() => setVisible4(!visible4)}>应用套件<Icon style={{ marginLeft: '10px' }} type="double-left" /></div>
        <div className="content" style={{ paddingTop: visible4 ? 0 : '10px', maxHeight: visible4 ? 0 : '1000px' }}>
          <div className="temp-btn" onClick={() => setVisible5(!visible5)}>
            <span>大数据平台</span>
            <span className="temp-btn-iconbox">
              <Icon type="caret-down" />
            </span>
          </div>
          <ul className="temp-list" style={{ height: visible5 ? 0 : '200px' }}>
            <li draggable onDragStart={() => setTempData({ isEcharts: true, type: 'bar', title: 'AB门管理', minW: 2, minH: 4, w: 4, h: 8 })} unselectable="on" >
              <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">罪犯文化程度...</div>
            </li>
            <li draggable onDragStart={() => setTempData({ isEcharts: true, type: 'line', title: '在监警力统计分析', minW: 2, minH: 4, w: 4, h: 8 })} unselectable="on" >
              <img draggable={false} src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">罪犯婚姻状况...</div>
            </li>
            <li draggable onDragStart={() => setTempData({ isEcharts: true, type: 'pie', title: '罪犯在押状态统计', minW: 2, minH: 2, w: 6, h: 8 })} unselectable="on" >
              <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">三类罪犯统计</div>
            </li>
            <li draggable onDragStart={() => setTempData({ isEcharts: true, type: 'scatter', title: '报警信息', minW: 2, minH: 2, w: 4, h: 8 })} unselectable="on" >
              <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">报警信息</div>
            </li>
            <li draggable onDragStart={() => setTempData({ isEcharts: true, type: 'gauge', title: '安全指数分析', minW: 2, minH: 2, w: 5, h: 12 })} unselectable="on" >
              <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">安全指数分析</div>
            </li>
            <li draggable onDragStart={() => setTempData({ isEcharts: false, type: 'gauge', title: '三类罪犯统计分析', minW: 2, minH: 2, w: 6, h: 10 })} unselectable="on" >
              <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
              <div className="title">三类罪犯统计分析</div>
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
