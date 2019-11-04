import React, { useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import { DOM_TYPE_BAR, DOM_TYPE_LINE, DOM_TYPE_PIE, DOM_TYPE_VIS, DOM_TYPE_GAUGE, DOM_TYPE_PRO6, DOM_TYPE_PRO7 } from '@/utils/const';
import { applySingleEchartsInfo } from '@/api/index';
import TypeProgress from '@/components/TypeProgress';

const types = {
  [DOM_TYPE_BAR]: getBarChart,
  [DOM_TYPE_LINE]: getLineChart,
  [DOM_TYPE_PIE]: getPieChart,
  [DOM_TYPE_VIS]: getVisualMap,
  [DOM_TYPE_GAUGE]: getGauge,
  [DOM_TYPE_PRO6]: getBarChart,
  [DOM_TYPE_PRO7]: getBarChart
};

// eslint-disable-next-line complexity
export default ({ data, optionList, isCs = true }) => {
  let optionSet = [];
  console.log(optionList,21);
  const handleIsUpdate = (UpdateHz) => {
    if (UpdateHz) {
      setInterval(() => {
        applySingleEchartsInfo(data.cufId).then(res => {
          optionSet = res.data;
        });
      }, +UpdateHz * 1000);
    }
  };
  const option = types[data.cfiType](optionSet);

  const component = data.cfiType > DOM_TYPE_GAUGE ? (
    <TypeProgress type={data.cfiType}
      data={optionList} />
  ) : (<ReactEcharts
    option={option}
    notMerge
    lazyUpdate
    style={{ width: '100%',height: '100%',paddingTop: '30px' }}
  />);
  useEffect(() => {
    !isCs && handleIsUpdate(data.cfiUpdateHz);
  });
  return (
    <>
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
      { data.cfiType === DOM_TYPE_GAUGE && <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> }
      <div className="title-box"> <span className="scale">{ data.cfiName }</span></div>
      {component}
    </>
  );
};
