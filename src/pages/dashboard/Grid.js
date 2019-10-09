import React from 'react';
import _ from 'lodash';
import { Responsive, WidthProvider } from 'react-grid-layout';
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

  generateDOM() {
    return _.map(this.state.widgets, function(l, i) {
      return (
        <div key={i} className={l.static ? 'static' : ''} data-grid={l}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  onDrop = elemParams => {
    elemParams.i = new Date().getTime().toString();
    elemParams.minW = 2;
    elemParams.minH = 4;
    elemParams.w = 4;
    elemParams.h = 8;
    // eslint-disable-next-line no-alert
    this.addItem(elemParams);
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
