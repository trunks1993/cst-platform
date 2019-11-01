import React from 'react';
// import RGL, { WidthProvider } from '@/components/Draggler';
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

const Grid = ({ tempData, activeTagId, layIds, currentData, addLayout, selectLayout, changeLayouts, activeLayId }) => {
  const onDrop = e => {
    const layoutId = new Date().getTime() + '';

    const { cfiLayout, cfiType, cfiEvent, cfiName, cfiIsUpdate, cfiDatasourceId, cfiId, cfiUpdateHz, cdsOdbcType } = tempData;

    const data = {
      [layoutId]: { cfiLayout: { ...e, ...cfiLayout, i: layoutId }, cfiType, cfiEvent, cfiName, cfiIsUpdate, cdsOdbcType, cfiConfigId: activeTagId, cfiDatasourceId, cfiId, cfiUpdateHz },
    };
    addLayout(data);
  };

  // 如果布局变化有调用接口则需要函数节流防抖
  const onLayoutChange = e => {
    // 过滤掉正在拖拽时触发的bug
    // const index = _.findIndex(e, l => l.i === '__dropping-elem__');
    const cl = _.filter(e, item => typeof item.i * 1 === 'number');
    changeLayouts(cl);
  };

  return (
    <div className="manufacturer-grid-box" /* style={{ width: activeLayId ? '' : '100%' }}*/ >
      <ReactGridLayout
        className="cst-layout"
        cols={12}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        onDrop={e => onDrop(e)}
        isDroppable={activeTagId !== ''}
      >
        {
          _.map(layIds, id => {
            const data = currentData[id];
            const { cfiLayout } = data;
            return (
              <div key={id} data-grid={cfiLayout} style={{ overflow: 'hidden', border: id === activeLayId ? '2px solid #03ccff' : '' }} onClick={() => selectLayout(id)}>
                {id && <GridItem id={ id } />}
              </div>
            );
          })
        }
      </ReactGridLayout>
    </div>
  );

};

const mapStateToProps = ({ gridState: { byConfigId, currentData, activeLayId }, appState: { activeTagId } }) => {
  return {
    currentData,
    activeLayId,
    activeTagId,
    layIds: byConfigId[activeTagId] || []
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
