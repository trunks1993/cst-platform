import React, { useState, useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
// import { Progress } from 'antd';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';
import { getHomeDetail } from '@/api/index';

const ReactGridLayout = WidthProvider(RGL);

const generateDOM = (layout) => {
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
    const nl = JSON.parse(l.cfiLayout);
    nl.static = true;
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
          l.cfiType === '5' ? <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> : null
        }
        <div className="title-box">{l.title }</div>
        {component}
      </div>
    );
  });
};

export default () => {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    getHomeDetail().then(res => {
      setLayout(res.data);
    });
  }, []);
  return (
    // onDragEnter={() => setDo(true)} fix bug: 拖入一个item还没放置的时候触发onLayoutChange导致页面白板
    <div className="home-grid-box" >
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
      >
        {generateDOM(layout)}
      </ReactGridLayout>
    </div>
  );

};
