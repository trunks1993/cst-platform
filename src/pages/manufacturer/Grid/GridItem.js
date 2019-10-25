import React from 'react';
import { connect } from 'react-redux';
import DragDom from '@/components/DragDom';

const GridItem = ({ id, entities }) => {
  return (
    <div>
      {/* <DragDom key={id} data={entities.grids[id]} /> */}
    </div>
  );
};

const mapStateToProps = ({ gridState }) => {
  return {
    entities: gridState.currentData.entities
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
