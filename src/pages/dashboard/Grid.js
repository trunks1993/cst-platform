import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from '@/components/Draggler';
import ReactEcharts from 'echarts-for-react';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
// import { Progress } from 'antd';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ShowcaseLayout extends React.Component {
  static defaultProps = {
    className: 'cst-layout',
    rowHeight: 30,
    onLayoutChange: function() { },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    widgets: []
  };

  state = {
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    widgets: this.props.widgets
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  // generateDOM() {
  //   return _.map(this.state.widgets, function(l, i) {
  //     return (
  //       <div key={i} className={l.static ? 'static' : ''} data-grid={l}>
  //         {l.static ? (
  //           <span
  //             className="text"
  //             title="This item is static and cannot be removed or resized."
  //           >
  //             Static - {i}
  //           </span>
  //         ) : (
  //           <span className="text">{i}</span>
  //         )}
  //       </div>
  //     );
  //   });
  // }
  generateDOM = () => {
    // eslint-disable-next-line complexity
    return _.map(this.state.widgets, (l, i) => {
      console.log(l);
      let option;
      if (l.type === 'bar') {
        option = getBarChart();
      } else if (l.type === 'line') {
        option = getLineChart();
      } else if (l.type === 'pie') {
        option = getPieChart();
      } else if (l.type === 'scatter') {
        option = getVisualMap();
      } else if (l.type === 'gauge') {
        option = getGauge();
      }
      // const option = getVisualMap();

      const component = (
        <ReactEcharts
          option={option}
          notMerge
          lazyUpdate
          style={{ width: '100%',height: '100%',paddingTop: '30px' }}
        />
      );

      return (
        <div key={i} className={l.static ? 'static' : ''} style={{ overflow: 'hidden' }} data-grid={l}>
          {/* <span className="remove" onClick={this.onRemoveItem.bind(this, i)}>x</span> */}
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
          <img className="bg-eGauge" src={require('@/assets/images/temp/切图_10.png')} alt="" />
          <div className="title-box">{l.title }</div>
          {component}
        </div>
      );
    });
  };


  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  onDrop = elemParams => {
    const { tempData } = this.props;
    // const { minW, minH, w, h } = tempData;
    // console.log(elemParams, tempData);
    // console.log(_.assign(elemParams, tempData));
    // tempData.i = new Date().getTime().toString();
    // elemParams.minW = 2;
    // elemParams.minH = 4;
    // elemParams.w = 4;
    // elemParams.h = 8;
    // eslint-disable-next-line no-alert
    ;
    this.addItem(_.assign(elemParams, tempData));
  };

  addItem(elemParams) {
    this.setState({
      widgets: this.state.widgets.concat({
        ...elemParams
      })
    });
  };

  render() {
    return (
      <div className="grid-box" >
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          onDrop={this.onDrop}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
          isDroppable
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
