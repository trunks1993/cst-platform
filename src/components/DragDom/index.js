import React from 'react';
// import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import { DOM_TYPE_USER1, DOM_TYPE_USER2, DOM_TYPE_USER3, DOM_TYPE_USER4, DOM_TYPE_USER5, DOM_TYPE_USER6, DOM_TYPE_USER7 } from '@/utils/const';

const map = {
  [DOM_TYPE_USER1]: getBarChart,
  [DOM_TYPE_USER2]: getLineChart,
  [DOM_TYPE_USER3]: getPieChart,
  [DOM_TYPE_USER4]: getVisualMap,
  [DOM_TYPE_USER5]: getGauge,
  [DOM_TYPE_USER6]: getBarChart,
  [DOM_TYPE_USER7]: getBarChart
};

// eslint-disable-next-line complexity
export default ({ data, selectId, setSelectId }) => {

  const option = map[data.cfiType]();

  const component = data.cfiType > DOM_TYPE_USER5 ? (
    <div>
        adasad
    </div>
  ) : (<ReactEcharts
    option={option}
    notMerge
    lazyUpdate
    style={{ width: '100%',height: '100%',paddingTop: '30px' }}
  />);

  return (
    <>
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
      <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
      { data.cfiType === DOM_TYPE_USER5 && <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> }
      <div className="title-box">{data.cfiName }</div>
      {component}
    </>
  );
};
