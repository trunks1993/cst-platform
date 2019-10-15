import React, { useState } from 'react';
import PanelTitle from '@/components/PanelTitle';

import { Button, Select, Input, Radio } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

// eslint-disable-next-line complexity
const PropertyPanel = ({ visible }) => {

  // 点击面板标题进行收缩
  const dom1 = document.getElementsByClassName('expand-active');

  // 说明
  const [illustrate, setIllustrate] = useState({ value: '' });

  // 展开属性面板
  const [expandPropPanel, setExpandPropPanel] = useState(false);

  // 展开应用套件
  const [expandAppConfigPanel, setExpandAppConfigPanel] = useState(false);



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
            <Button className="button-style">
              分组标题
            </Button>
            <Select
              className="select"
              showSearch
              value="jack"
              optionFilterProp="children"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </div>

          <div className="property-content">
            <Button className="button-style">
              图表类型
            </Button>
            <Select className="select" value="pie">
              <Option value="pie">饼状图</Option>
              <Option value="lucy">柱状图</Option>
              <Option value="tom">散点图</Option>
            </Select>
          </div>

          <div className="property-content">
            <Button className="button-style">
              数据绑定
            </Button>
            <Select className="select" value="jack">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </div>

          <div className="property-content">
            <Button className="button-style">
              数据更新
            </Button>
            <Select className="select" value="update">
              <Option value="noUpdate">不更新</Option>
              <Option value="update">定时更新</Option>
            </Select>
          </div>

          <div className="property-content">
            <Button className="button-style">
              数&nbsp;&nbsp;据&nbsp;&nbsp;源
            </Button>
            <Select className="select" value="self">
              <Option value="self">自定义</Option>
              <Option value="url">URL</Option>
              <Option value="sql">自定义SQL</Option>
            </Select>
          </div>

          <div className="">
            <Button className="button-style">
              说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明
            </Button>
            <TextArea
              className="text-area"
              value={illustrate.value}
              onChange={e => {
                setIllustrate({
                  value: e.target.value
                });
              }}
              placeholder="Controlled autosize"
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
            <Radio.Group>
              <Radio className="radio-style" value={1}>启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>

          <div className="application-config">
            <span className="radio-title">过滤</span>
            <Radio.Group>
              <Radio className="radio-style" value={1}>启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>

          <div className="application-config">
            <span className="radio-title">导出</span>
            <Radio.Group>
              <Radio className="radio-style" value={1}>启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>

          <div className="application-config">
            <span className="radio-title">明细</span>
            <Radio.Group>
              <Radio className="radio-style" value={1}>启用</Radio>
              <Radio className="radio-style" value={2}>禁用</Radio>
            </Radio.Group>
          </div>

          <div className="property-content">
            <Button className="button-style">
              数据绑定
            </Button>
            <Select className="select" value="jack">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;
