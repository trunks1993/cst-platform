import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from '@/components/Draggler';
import ReactEcharts from 'echarts-for-react';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';

const ReactGridLayout = WidthProvider(RGL);

export default class ShowcaseLayout extends React.Component {
  static defaultProps = {
    className: 'cst-layout',
    rowHeight: 30,
    cols: 12,
    onLayoutChange: function() {},
    widgets: [],
    isDroppable: false
  };

  state = {
    compactType: 'vertical',
    mounted: false,
    widgets: this.props.widgets
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM = () => {
    // eslint-disable-next-line complexity
    return _.map(this.state.widgets, (l, i) => {
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
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/1.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
          <img className="bg-icon" src={require('@/assets/images/temp/2.png')} alt="" />
          {/* <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> */}
          {
            l.type === 'gauge' ? <img className="bg-eGauge" src={require('@/assets/images/temp/bg-img.png')} alt="" /> : null
          }
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
    this.addItem(_.assign(elemParams, tempData));
  };

  addItem(elemParams) {
    this.setState({
      widgets: this.state.widgets.concat({
        ...elemParams
      })
    });
  }

  render() {
    return (
      <div className="grid-box">
        <ReactGridLayout
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          {...this.props}
          onDrop={this.onDrop}
          isDroppable={this.props.isDroppable && this.props.tags.length > 0}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
  }
}
