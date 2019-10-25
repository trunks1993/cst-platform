import React from 'react';
import RGL, { WidthProvider } from '@/components/Draggler';
import _ from 'lodash';
import { connect } from 'react-redux';
import { actions as gridActions } from '@/redux/grid';

import GridItem from './GridItem';

const ReactGridLayout = WidthProvider(RGL);

// const generateDOM = (formInfo, selectId, setSelectId, dsIdOptions) => {
//   // eslint-disable-next-line complexity
//   return _.map(formInfo, (l, i) => {
//     const nl = JSON.parse(l.cfiLayout);
//     return (
//       <div key={nl.i} style={{ overflow: 'hidden', border: nl.i === selectId ? '2px solid #03ccff' : '' }} data-grid={nl} onClick={() => setSelectId(nl.i)}>
//         <DragDom key={nl.i} data={l} isCs optionList={dsIdOptions} />
//       </div>
//     );
//   });
// };

// 获取layout
// const getLayout = ({ entities }, id) => {
//   const { layouts } = entities;
//   return layouts[id];
// };

const Grid = ({ tempData, activeTagId, ids, currentData, addLayout, selectLayout, changeLayouts, activeLayId }) => {
  const onDrop = e => {
    const layoutId = new Date().getTime() + '';
    // selectLayout(layoutId);

    const { cfiLayout, cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiDatasourceId, cfiId, cfiUpdateHz } = tempData;

    const data = {
      currentData: {
        [layoutId]: { cfiLayout: { ...e, ...cfiLayout, i: layoutId }, cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiConfigId: activeTagId, cfiDatasourceId, cfiId, cfiUpdateHz },
      },
      cfiConfigId: activeTagId,
    };
    addLayout(data);
  };

  // 如果布局变化有调用接口则需要函数节流防抖
  const onLayoutChange = e => {
    // 过滤掉正在拖拽时触发的bug
    const index = _.findIndex(e, l => l.i === '__dropping-elem__');
    if (index === -1) changeLayouts(e);
  };

  return (
    <div className="manufacturer-grid-box">
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        onDrop={e => onDrop(e)}
        isDroppable={activeTagId !== ''}
      >
        {
          _.map(ids, id => {
            const layer = currentData[id];
            const { cfiLayout } = layer;
            return (
              <div key={id} data-grid={cfiLayout} style={{ overflow: 'hidden', border: id === activeLayId ? '2px solid #03ccff' : '' }} onClick={() => selectLayout(id)}>
                <GridItem />
              </div>
            );
          })
        }
      </ReactGridLayout>
    </div>
  );

};

const mapStateToProps = ({ gridState, appState }) => {
  return {
    currentData: gridState.currentData,
    // layIds: gridState.layIds,
    activeLayId: gridState.activeLayId,
    activeTagId: appState.activeTagId,
    ids: gridState.byConfigId[appState.activeTagId] || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLayout: layout => dispatch(gridActions.addLayout(layout)),
    changeLayouts: layouts => dispatch(gridActions.changeLayouts(layouts)),
    selectLayout: id => dispatch(gridActions.selectLayout(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
