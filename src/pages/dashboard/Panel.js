import React from 'react';
import { Input } from 'antd';
import { Icon } from 'antd';

const { Search } = Input;

export default () => (
  <div className="panel-box" >
    <div className="panel-box-item">
      <div className="btn">工作台模板<Icon style={{ marginLeft: '10px' }} type="double-left" /></div>
      <div className="content">
        <Search placeholder="请输入模板名称" onSearch={value => console.log(value)} />

        <div className="group-btn">公共模板<span className="group-btn-iconbox"><Icon type="caret-down" /></span></div>
        <ul className="group-list">
          <li>分析研判岗-通用模板一</li>
          <li>分析研判岗-通用模板二</li>
          <li>分析研判岗-通用模板三</li>
        </ul>

        <div className="group-btn">个人模板<span className="group-btn-iconbox"><Icon type="caret-down" /></span></div>
        <ul className="group-list">
          <li>分析研判岗-通用模板一</li>
        </ul>
      </div>
    </div>
    <img style={{ margin: '10px 0' }} src={require('../../assets/images/l-panel.png')} alt="" />
    <div className="panel-box-item">
      <div className="btn">应用套件<Icon style={{ marginLeft: '10px' }} type="double-left" /></div>
      <div className="content">
        <div className="temp-btn">
          <span>大数据平台</span>
          <span className="temp-btn-iconbox">
            <Icon type="caret-down" />
          </span>
        </div>
        <ul className="temp-list">
          <li>
            <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
            <div className="title">罪犯文化程度...</div>
          </li>
          <li>
            <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
            <div className="title">罪犯婚姻状况...</div>
          </li>
          <li>
            <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
            <div className="title">三类罪犯统计</div>
          </li>
          <li>
            <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
            <div className="title">四涉罪犯统计</div>
          </li>
          <li>
            <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
            <div className="title">罪犯危险性分...</div>
          </li>
          <li>
            <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
            <div className="title">监狱安全指数</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
