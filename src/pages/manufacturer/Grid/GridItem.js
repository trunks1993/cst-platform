import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge, getProgress7, getProgress6 } from '@/utils/echarts';
import { DOM_TYPE_BAR, DOM_TYPE_LINE, DOM_TYPE_PIE, DOM_TYPE_VIS, DOM_TYPE_GAUGE, DOM_TYPE_PRO6, DOM_TYPE_PRO7 } from '@/utils/const';
import TypeProgress from '@/components/TypeProgress';
import { connect } from 'react-redux';
import { actions as gridActions } from '@/redux/grid';
import _ from 'lodash';

const types = {
  [DOM_TYPE_BAR]: getBarChart,
  [DOM_TYPE_LINE]: getLineChart,
  [DOM_TYPE_PIE]: getPieChart,
  [DOM_TYPE_VIS]: getVisualMap,
  [DOM_TYPE_GAUGE]: getGauge,
  [DOM_TYPE_PRO6]: getProgress6,
  [DOM_TYPE_PRO7]: getProgress7
};

// eslint-disable-next-line complexity
const GridItem = ({ id, currentData, removeLayItem }) => {
  const data = currentData[id] || {};
  const cdsOdbcValue = _.get(data, 'cdsOdbcValue', JSON.stringify(''));
  const optionList = JSON.parse(cdsOdbcValue) || [];

  const option = types[data.cfiType](optionList);
  const component = data.cfiType > DOM_TYPE_GAUGE ? (
    <TypeProgress type={data.cfiType}
      data={optionList} />
  ) : (<ReactEcharts
    option={option}
    notMerge
    lazyUpdate
    style={{ width: '100%',height: '100%',paddingTop: '30px' }}
  />);
  return (
    <>
      <img className="bg-close" src={require('@/assets/images/temp/bg-close.png')} alt="" onClick={e => {
        e.stopPropagation();
        removeLayItem(id);
      }} />
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

const mapStateToProps = ({ gridState: { currentData } }) => {
  // const cdsOdbcValue = _.get(currentData, `${activeLayId}.cdsOdbcValue`, JSON.stringify(''));
  return {
    // optionList: JSON.parse(cdsOdbcValue) || [],
    currentData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeLayItem: layId => dispatch(gridActions.removeLayItem(layId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridItem);
