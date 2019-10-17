import React, { useState, useEffect } from 'react';
import PanelTitle from '@/components/PanelTitle';

import { Select, Input, Radio } from 'antd';
import EditeTable from './EditeTable';
import _ from 'lodash';
const { Option } = Select;
const { TextArea } = Input;

// eslint-disable-next-line complexity
const PropertyPanel = ({ visible, formInfo, selectId, setFormInfo }) => {
  // const TYPE = tempData.type;
  // 点击面板标题进行收缩
  const dom1 = document.getElementsByClassName('expand-active');

  // 展开属性面板
  const [expandPropPanel, setExpandPropPanel] = useState(false);

  // 展开应用套件
  const [expandAppConfigPanel, setExpandAppConfigPanel] = useState(false);

  // 名称
  const [cfiName, setCfiName] = useState('');

  // 图表类型绑定
  const [cfiType, setCfiType] = useState(1);

  // 更新
  const [cfiIsUpdate, setCfiIsUpdate] = useState(1);

  // 数据源绑定
  const [cusDataSource, setCusDataSource] = useState({ cdsOdbcType: 1, cdsOdbcValue: [], cdsRemark: '' });

  // 事件
  const [cfiEvent, setCfiEvent] = useState({ glass: 1, filter: 1, export: 1, detail: 1 });

  useEffect(() => {
    const o = formInfo.find(v => v.tId === selectId);
    if (o) {
      setCfiType(o.type);
      setCfiEvent(JSON.parse(o.cfiEvent));
      setCfiName(o.cfiName);
      setCfiIsUpdate(o.cfiIsUpdate);
      setCusDataSource(JSON.parse(o.cusDataSource));
    }
  }, [formInfo, selectId]);

  return (
    <div className="property-panel" style={{ transform: `translate(${ visible ? 0 : '300px'})`, padding: visible ? '40px 0 8px 0' : '40px 6px 8px 6px' }}>
      <div className="panel-box">
        <div className="property-container" style={{ maxHeight: expandPropPanel ? '40px' : '1000px' }}>
          <PanelTitle label="属性面板" onTitleClick={() => {
            dom1[0].style.paddingTop = !expandPropPanel ? 0 : '8px';
            setTimeout(() => {
              setExpandPropPanel(!expandPropPanel);
            }, 50);
          }} />

          <div className="property-content expand-active">
            <span className="property-content-btn">功能名</span>
            <input value={cfiName } onChange={e => {
              setCfiName(e.target.value);

              const t = _.clone(formInfo);
              const item = t.find(v => v.tId === selectId);
              item.cfiName = e.target.value;
              setFormInfo(t);
            }} />
          </div>

          <div className="property-content">
            <span className="property-content-btn">图表类型</span>
            <input value={cfiType} disabled />
          </div>

          <div className="property-content">
            <span className="property-content-btn">数据更新</span>
            <Select className="select" value={cfiIsUpdate} onChange={e => {
              setCfiIsUpdate(e);
              const t = _.clone(formInfo);
              const item = t.find(v => v.tId === selectId);
              item.cfiIsUpdate = e;
              setFormInfo(t);
            }}>
              <Option value={1}>不更新</Option>
              <Option value={2}>定时更新</Option>
            </Select>
          </div>

          <div className="property-content">
            <span className="property-content-btn">数据源</span>
            <Select className="select" value={cusDataSource.cdsOdbcType} onChange={e => {
              const d = _.assign({}, cusDataSource, { cdsOdbcType: e });
              const item = formInfo.find(v => v.tId === selectId);
              item.cusDataSource = JSON.stringify(d);
              setFormInfo(formInfo);
              setCusDataSource(d);
            }}>
              <Option value={1}>自定义</Option>
              <Option value={2}>URL</Option>
              <Option value={3}>SQL</Option>
            </Select>
          </div>

          <div className="">
            <EditeTable className="property-content-editetable" cusDataSource={cusDataSource } setCusDataSource={setCusDataSource} selectId={selectId} setFormInfo={setFormInfo} formInfo={formInfo} />
          </div>

          <div className="property-content" style={{ display: 'block' }}>
            <span className="property-content-btn">数据源说明</span>
            <TextArea
              className="text-area"
              value={cusDataSource.cdsRemark}
              onChange={e => {
                const d = _.assign({}, cusDataSource, { cdsRemark: e.target.value });
                const item = formInfo.find(v => v.tId === selectId);
                item.cusDataSource = JSON.stringify(d);
                setFormInfo(formInfo);
                setCusDataSource(d);
              }}
              autosize={{ minRows: 5, maxRows: 5 }}
            />
          </div>
        </div>

        <img
          className="img-line"
          src={require('../../assets/images/l-panel.png')}
          alt=""
        />

        <div className="property-container" style={{ maxHeight: expandAppConfigPanel ? '40px' : '1000px' }}>
          <PanelTitle label="应用套件" onTitleClick={() => {
            console.log(dom1);
            dom1[1].style.marginTop = !expandAppConfigPanel ? 0 : '8px';
            setTimeout(() => {
              setExpandAppConfigPanel(!expandAppConfigPanel);
            }, 50);
          }} />

          <div className="application-config expand-active">
            <span className="radio-title">放大</span>
            <Radio.Group onChange={e => {
              const d = _.assign({}, cfiEvent, { glass: e.target.value });
              setCfiEvent(d);

              const item = formInfo.find(v => v.tId === selectId);
              item.cfiEvent = JSON.stringify(d);
              setFormInfo(formInfo);
            }} value={cfiEvent.glass} >
              <Radio className="radio-style" value={1}>启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>

          <div className="application-config">
            <span className="radio-title">过滤</span>
            <Radio.Group onChange={e => {
              const d = _.assign({}, cfiEvent, { filter: e.target.value });
              setCfiEvent(d);

              const item = formInfo.find(v => v.tId === selectId);
              item.cfiEvent = JSON.stringify(d);
              setFormInfo(formInfo);
            }} value={cfiEvent.filter}>
              <Radio className="radio-style" value={1}>启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>

          <div className="application-config">
            <span className="radio-title">导出</span>
            <Radio.Group onChange={e => {
              const d = _.assign({}, cfiEvent, { export: e.target.value });
              setCfiEvent(d);

              const item = formInfo.find(v => v.tId === selectId);
              item.cfiEvent = JSON.stringify(d);
              setFormInfo(formInfo);
            }} value={cfiEvent.export}>
              <Radio className="radio-style" value={1} >启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>

          <div className="application-config">
            <span className="radio-title">明细</span>
            <Radio.Group onChange={e => {
              const d = _.assign({}, cfiEvent, { detail: e.target.value });
              const item = formInfo.find(v => v.tId === selectId);
              item.cfiEvent = JSON.stringify(d);
              setFormInfo(formInfo);
              setCfiEvent(d);
            }} value={cfiEvent.detail}>
              <Radio className="radio-style" value={1}>启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;
