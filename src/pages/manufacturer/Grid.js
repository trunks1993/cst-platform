import React, { useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';

const generateDOM = (formInfo, selectId, setSelectId) => {
  // eslint-disable-next-line complexity
  return _.map(formInfo, (l, i) => {
    let option;
    if (l.type === 1) {
      option = getBarChart();
    } else if (l.type === 2) {
      option = getLineChart();
    } else if (l.type === 3) {
      option = getPieChart();
    } else if (l.type === 4) {
      option = getVisualMap();
    } else if (l.type === 5) {
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

    return (
      <div key={l.layout.i} style={{ overflow: 'hidden', border: l.tId === selectId ? '1px solid #ecdbdb' : '' }} data-grid={l.layout} onClick={() => setSelectId(l.tId)}>
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
        {/* <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> */}
        {
          l.type === 5 ? <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> : null
        }
        <div className="title-box">{l.cfiName }</div>
        {component}
      </div>
    );
  });
};

const ReactGridLayout = WidthProvider(RGL);
export default ({ formInfo, setFormInfo, tempData, tags, setSelectId, selectId }) => {
  // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
  const [doing, setDo] = useState(true);

  function onLayoutChange(l) {
    if (doing) return;
    const f = _.map(_.clone(formInfo), v => {
      const item = l.find(lv => lv.i === v.layout.i);
      v.layout = item;
      return v;
    });
    setFormInfo(f);
  }

  const onDrop = e => {
    e.i = new Date().getTime() + '';
    const { layout, type, cfiEvent, cfiName, cfiIsUpdate, cusDataSource } = tempData;
    const l = _.assign(e, layout);
    setSelectId(e.i);
    setFormInfo(formInfo.concat({ type, cfiEvent, cfiName, cfiIsUpdate, cusDataSource, tId: l.i, layout: { ...l } }));
    setDo(false);
  };

  return (
    // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
    <div className="manufacturer-grid-box" onDragEnter={() => setDo(true)}>
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        // layout={layout}
        onLayoutChange={onLayoutChange}
        onDrop={e => onDrop(e)}
        isDroppable={ tags.length > 0 }
      >
        {generateDOM(formInfo, selectId, setSelectId)}
      </ReactGridLayout>
    </div>
  );

};
