import React, { useState } from 'react';
import RGL, { WidthProvider } from '@/components/Draggler';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';

const generateDOM = (formInfo, selectId, setSelectId) => {
  // eslint-disable-next-line complexity
  return _.map(formInfo, (l, i) => {
    let option;
    if (l.cfiType === '1') {
      option = getBarChart();
    } else if (l.cfiType === '2') {
      option = getLineChart();
    } else if (l.cfiType === '3') {
      option = getPieChart();
    } else if (l.cfiType === '4') {
      option = getVisualMap();
    } else if (l.cfiType === '5') {
      option = getGauge();
    } else {
      option = getBarChart();
    }

    const component = (
      <ReactEcharts
        option={option}
        notMerge
        lazyUpdate
        style={{ width: '100%',height: '100%',paddingTop: '30px' }}
      />
    );
    const nl = JSON.parse(l.cfiLayout);

    return (
      <div key={nl.i} style={{ overflow: 'hidden', border: nl.i === selectId ? '1px solid #ecdbdb' : '' }} data-grid={nl} onClick={() => setSelectId(nl.i)}>
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
        {/* <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> */}
        {
          l.cfiType === 5 ? <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> : null
        }
        <div className="title-box">{l.cfiName }</div>
        {component}
      </div>
    );
  });
};

const ReactGridLayout = WidthProvider(RGL);
export default ({ formInfo, setFormInfo, tempData, selectTag, tags, setSelectId, selectId }) => {
  // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
  const [doing, setDo] = useState(true);

  function onLayoutChange(l) {
    if (doing) return;
    const f = _.map(_.clone(formInfo), v => {
      const item = l.find(lv => lv.i === JSON.parse(v.cfiLayout).i);
      v.cfiLayout = JSON.stringify(item);
      return v;
    });
    setFormInfo(f);
  }

  const onDrop = e => {
    e.i = new Date().getTime() + '';
    tempData.cfiConfigId = selectTag.cfgId;
    const { cfiLayout, cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiConfigId, cfiDatasourceId } = tempData;
    const l = _.assign(e, JSON.parse(cfiLayout));
    setSelectId(e.i);
    setFormInfo(formInfo.concat({ cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiConfigId, cfiDatasourceId, cfiLayout: JSON.stringify({ ...l }) }));
    setDo(false);
  };

  return (
    // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
    <div className="manufacturer-grid-box" onDragEnter={() => setDo(true)}>
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        onDrop={e => onDrop(e)}
        isDroppable={ !!selectTag.cfgId }
      >
        {generateDOM(formInfo, selectId, setSelectId)}
      </ReactGridLayout>
    </div>
  );

};
