import React, { useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';

const generateDOM = (layout, selectId, setSelectId) => {
  // eslint-disable-next-line complexity
  return _.map(layout, (l, i) => {
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
    // const progress = (
    //   <div style={{ width: '100%',padding: '20px', boxSizing: 'border-box' }}>
    //     <div className="progress-label">暴力行为</div>
    //     <Progress type="line" percent={1270}
    //       strokeColor={{
    //         '0%': '#ff6e02',
    //         '100%': '#ffff00',
    //       }}
    //       strokeWidth={10}
    //       format={percent => `${percent * 5} 人`}
    //     />
    //   </div>
    // );
    return (
      <div key={nl.i} className={l.static ? 'static' : ''} style={{ overflow: 'hidden' }} data-grid={nl} data-grid={nl} onClick={() => setSelectId(nl.i)}>
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
        <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
        {/* <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> */}
        {
          l.type === 'gauge' ? <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> : null
        }
        <div className="title-box">{l.cfiName }</div>
        {component}
      </div>
    );
  });
};

const ReactGridLayout = WidthProvider(RGL);
export default ({ curIndex, handleCurIndex, layout, setLayouts, tempData, tags, setSelectId, selectId }) => {
  // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
  const [doing, setDo] = useState(true);

  function onLayoutChange(l) {
    if (doing) return;
    const f = _.map(_.clone(layout), v => {
      const item = l.find(lv => lv.i === JSON.parse(v.cfiLayout).i);
      v.cfiLayout = JSON.stringify(item);
      return v;
    });
    setLayouts(f);
  }

  const onDrop = e => {
    // debugger;
    console.log(tempData);
    // e.i = new Date().getTime() + '';
    // tempData.cfiConfigId = curIndex;
    // const { cfiLayout, cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiConfigId, cfiDatasourceId } = tempData;
    // const l = _.assign(e, JSON.parse(cfiLayout));
    // setSelectId(e.i);
    // setLayouts(layout.concat({ cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiConfigId, cfiDatasourceId, cfiLayout: JSON.stringify({ ...l }) }));
    // setDo(false);
  };

  return (
    // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
    <div className="grid-box" onDragOver={e => e.preventDefault()} onDragEnter={(e) => { setDo(true); }} onDrop={e => onDrop(e)}>
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        // onDragOver={(e) => { console.log(e); }}
        // onDrop={e => onDrop(e)}
        // isDroppable={ !!curIndex }
        isDraggable
      >
        {generateDOM(layout, selectId, setSelectId)}
      </ReactGridLayout>
    </div>
  );

};
