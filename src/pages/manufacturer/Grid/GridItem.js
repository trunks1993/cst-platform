import React from 'react';
import { connect } from 'react-redux';
import { DOM_TYPE_GAUGE } from '@/utils/const';

const GridItem = ({ data }) => {
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
    </>
  );
};

const mapStateToProps = ({ gridState }) => {
  return {
    gridState
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getConfigGroup: cfgName => dispatch(configGroupActions.getConfigGroup(cfgName)),
//     setVisibleIds: id => dispatch(configGroupActions.setVisibleIds(id)),
//     queryByConfigId: id => dispatch(gridActions.queryByConfigId(id))
//   };
// };

export default connect(mapStateToProps, null)(GridItem);
