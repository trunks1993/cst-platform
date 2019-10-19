import React, { useState } from 'react';
import RGL, { WidthProvider } from '@/components/Draggler';
import _ from 'lodash';
// import DragDom from '@/components/DragDom';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import ReactEcharts from 'echarts-for-react';

const ReactGridLayout = WidthProvider(RGL);

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
      <div key={i} style={{ overflow: 'hidden' }} data-grid={nl}>
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

export default ({ curIndex, handleCurIndex, formInfo, setFormInfo, tempData, tags, setSelectId, selectId }) => {
  // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
  const [doing, setDo] = useState(true);

  function onLayoutChange(l) {
    if (doing) return;
    const f = _.map(_.clone(formInfo), v => {
      const item = l.find(lv => lv.i === JSON.parse(v.cfiLayout).i);
      if (item !== undefined) {
        v.cfiLayout = JSON.stringify(item);
      }
      return v;
    });
    setFormInfo(f);
  }

  const onDrop = e => {
    const { datasourceId, layout, name, type, id } = tempData;
    const { w, h } = JSON.parse(layout);
    const { x, y } = e;
    const i = '' + new Date().getTime();
    const cfiLayout = JSON.stringify({ x, y, w, h, i });
    const newInfo = [{ cfiLayout, cfiDatasourceId: datasourceId, cfiName: name, cfiType: type, cfiConfigId: id }, ...formInfo];
    setFormInfo(newInfo);
    setDo(false);
  };

  return (
    // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
    <div className="grid-box" onDragEnter={() => setDo(true)}>
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        onDrop={onDrop}
        isDroppable={!!curIndex}
      >
        { generateDOM(formInfo) }
      </ReactGridLayout>
    </div>
  );

};
