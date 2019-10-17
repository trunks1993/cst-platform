import React, { useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
// import { Progress } from 'antd';
// import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import _ from 'lodash';
// import ReactEcharts from 'echarts-for-react';

const generateDOM = (layout) => {
  // eslint-disable-next-line complexity
  return _.map(layout, (l, i) => {
    // let option;
    // if (l.type === 'bar') {
    //   option = getBarChart();
    // } else if (l.type === 'line') {
    //   option = getLineChart();
    // } else if (l.type === 'pie') {
    //   option = getPieChart();
    // } else if (l.type === 'scatter') {
    //   option = getVisualMap();
    // } else if (l.type === 'gauge') {
    //   option = getGauge();
    // }

    // const component = (
    //   <ReactEcharts
    //     option={option}
    //     notMerge
    //     lazyUpdate
    //     style={{ width: '100%',height: '100%',paddingTop: '30px' }}
    //   />
    // );
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
      <div key={i} className={l.static ? 'static' : ''} style={{ overflow: 'hidden' }} data-grid={l}>
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
        <div className="title-box">{l.title }</div>
        {/* {component} */}
      </div>
    );
  });
};

const ReactGridLayout = WidthProvider(RGL);
export default ({ layout, setLayouts, tempData, tags }) => {
  // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
  const [doing, setDo] = useState(true);

  function onLayoutChange(l) {
    if (doing) return;
    setLayouts(l);
  }

  const onDrop = e => {
    const l = _.assign(e, tempData);
    setLayouts(layout.concat({ ...l }));
    setDo(false);
  };

  return (
    // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
    <div className="grid-box" onDragEnter={() => setDo(true)}>
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        layout={layout}
        onLayoutChange={onLayoutChange}
        onDrop={e => onDrop(e)}
        isDroppable={ tags.length > 0 }
      >
        {generateDOM(layout)}
      </ReactGridLayout>
    </div>
  );

};
