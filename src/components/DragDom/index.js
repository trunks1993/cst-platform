import React from 'react';
// import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';

// eslint-disable-next-line complexity
export default ({ data }) => {
  let option;
  if (data.cfiType === '1') {
    option = getBarChart();
  } else if (data.cfiType === '2') {
    option = getLineChart();
  } else if (data.cfiType === '3') {
    option = getPieChart();
  } else if (data.cfiType === '4') {
    option = getVisualMap();
  } else if (data.cfiType === '5') {
    option = getGauge();
  } else {
    option = getBarChart();
  };

  const component = (
    <ReactEcharts
      option={option}
      notMerge
      lazyUpdate
      style={{ width: '100%',height: '100%',paddingTop: '30px' }}
    />
  );
  const nl = JSON.parse(data.cfiLayout);
  debugger;
  return (
    <div key={nl.i} className={data.static ? 'static' : ''} style={{ overflow: 'hidden' }} data-grid={nl} >
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
      {/* <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> */}
      {
        data.cfiType === '5' ? <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> : null
      }
      <div className="title-box">{data.cfiName }</div>
      {/* {component} */}
    </div>
  );
};
