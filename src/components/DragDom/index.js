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
  const handleIsUpdate = (Update = '') => {
    if (Update) {
      const setDate = new Date(Update).getTime();
      const now = new Date().getTime();
      if (setDate === now) {
        applySingleEchartsInfo(data.cufId).then(res => {
          optionSet = res.data;
        });
      }
    }
  };
  const option = types[data.cfiType]();

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
    !isCs && handleIsUpdate(data.cfiIsUpdate === 1);
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
      <div className="title-box">{ data.cfiName }</div>
      {component}
    </>
  );
};
