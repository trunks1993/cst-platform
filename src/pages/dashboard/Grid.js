import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { getBarChart, getLineChart, getPieChart, getVisualMap, getGauge } from '@/utils/echarts';
import _ from 'lodash';
import ReactEcharts from 'echarts-for-react';

const ReactGridLayout = WidthProvider(RGL);
// const originalLayout = getFromLS('layout') || [];
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: 'cst-layout',
    cols: 12,
    rowHeight: 30,
    isDroppable: false,
    layout: [],
    onLayoutChange: function() {}
  };

  state = {
    layout: this.props.layout
  };

  resetLayout = (layout) => {
    this.setState({
      layout
    });
  }

  onLayoutChange = (layout) => {
    this.props.setLayouts(layout);
  }

  generateDOM = () => {
    // eslint-disable-next-line complexity
    return _.map(this.state.layout, (l, i) => {
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

  onDrop = elemParams => {
    const { tempData } = this.props;
    this.addItem(_.assign(elemParams, tempData));
  };

  addItem(elemParams) {
    this.setState({
      layout: this.state.layout.concat({
        ...elemParams
      })
    });
  }

  render() {
    return (
      <div className="grid-box">
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onDrop={this.onDrop}
          isDroppable={this.props.isDroppable && this.props.tags.length > 0}
        >
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
  }
}
