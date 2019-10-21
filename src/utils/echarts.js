import Echarts from 'echarts';

export function getBarChart() {
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['外来人员','外来车辆'],
      right: '10%',
      top: '10%',
      itemWidth: 10, // 图例的宽度
      itemHeight: 10, // 图例的高度
      textStyle: { // 图例文字的样式
        color: '#ccc',
        fontSize: 16
      }
    },
    xAxis: [
      {
        type: 'category',
        data: ['0-6','8','10','12','14','16','18','20','22-0'],
        axisLabel: {
          textStyle: {
            color: '#FFFFFF',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#054792', // X轴及其文字颜色
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#054792'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：辆/人',
        min: 0,
        max: 30,
        interval: 5,
        axisLabel: {
          textStyle: {
            color: '#FFFFFF',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#054792', // Y轴及其文字颜色
          }
        },
        axisTick: {
          show: false
        },
        splitLine: { // 分割线颜色修改
          lineStyle: {
            color: '#054792'
          }
        }
      }
    ],
    series: [
      {
        name: '外来人员',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 30, 30, 11, 28],
        barWidth: 12, // 柱子宽度

        itemStyle: {
          emphasis: {
            barBorderRadius: 30
          },
          normal: {
            barBorderRadius: [10, 10, 10, 10],
          }
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#00FFED'
          },{
            offset: 1,
            color: '#0082EA'
          }],
        }
      },
      {
        name: '外来车辆',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 26.2, 21.6, 27, 30, 11, 28],
        barWidth: 12, // 柱子宽度
        itemStyle: {
          emphasis: {
            barBorderRadius: 30
          },
          normal: {
            barBorderRadius: [10, 10, 10, 10],
          }
        },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#91C50F'
          },{
            offset: 1,
            color: '#F4CB48'
          }],
        }
      }
    ]
  };
  return option;
}

export function getLineChart() {
  // option
  const option = {
    // color: ['#D53A35'],
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return ` ${year}-${month}-${day} <br> 在监警力: ${params[0].value}人`;
      }
    },
    legend: {
      data: ['在监警力','警力配置'],
      right: '10%',
      top: '10%',
      itemWidth: 10, // 图例的宽度
      itemHeight: 10, // 图例的高度
      textStyle: { // 图例文字的样式
        color: '#ccc',
        fontSize: 16
      }
    },
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   containLabel: true
    // },
    xAxis: {
      type: 'category',
      name: '',
      boundaryGap: false,
      axisLabel: {
        textStyle: {
          color: '#FFFFFF',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#054792', // X轴及其文字颜色
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#054792'
        }
      },
      data: ['2', '4', '6', '8', '10', '12', '14','16','18','20','22','24']
    },
    yAxis: {
      type: 'value',
      name: '单位：人',
      min: 0,
      max: 60,
      interval: 10,
      axisLabel: {
        textStyle: {
          color: '#FFFFFF',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#054792', // Y轴及其文字颜色
        }
      },
      splitLine: { // 分割线颜色修改
        lineStyle: {
          color: '#054792'
        }
      }
    },
    series: [{
      name: '在监警力',
      type: 'line',
      // symbol: 'circle',
      smooth: true,
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        normal: {
          color: '#91C50F'
        }
      },
      data: [10, 20, 32, 11, 34, 9, 23, 21, 8, 2, 9, 21, 20]
    },{
      name: '警力配置',
      type: 'line',
      // symbol: 'circle',
      smooth: true,
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        normal: {
          color: '#00BBF4'
        }
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(0,195,255,1)'
          },{
            offset: 1,
            color: 'rgba(0,195,255,0)'
          }],
        }
      },
      data: [12, 32, 9, 23, 21, 8, 21, 10, 12, 21, 8, 20, 9]
    }
    ]
  };
  return option;
}

export function getPieChart() {
  // option
  const option = {
    color: ['#00FFFF', '#556FB5', '#FACD89', '#0068B7', '#F29B76', '#22AC38', '#AA89BD', '#004986'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: [{
      orient: 'vertical',
      icon: 'circle',
      x: '50%',
      y: '20%',
      align: 'left',
      data: ['在册人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },{
      orient: 'vertical',
      icon: 'circle',
      x: '70%',
      y: '20%',
      align: 'left',
      data: ['释放人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },{
      orient: 'vertical',
      icon: 'circle',
      x: '50%',
      y: '30%',
      align: 'left',
      data: ['监内人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },{
      orient: 'vertical',
      icon: 'circle',
      x: '70%',
      y: '30%',
      align: 'left',
      data: ['销册人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },{
      orient: 'vertical',
      icon: 'circle',
      x: '50%',
      y: '40%',
      align: 'left',
      data: ['监外人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },{
      orient: 'vertical',
      icon: 'circle',
      x: '70%',
      y: '40%',
      align: 'left',
      data: ['死亡人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },{
      orient: 'vertical',
      icon: 'circle',
      x: '50%',
      y: '50%',
      align: 'left',
      data: ['调动人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },{
      orient: 'vertical',
      icon: 'circle',
      x: '70%',
      y: '50%',
      align: 'left',
      data: ['假释人数'],
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    }],
    calculable: true,
    series: [
      {
        name: '半径模式',
        type: 'pie',
        radius: [20, 110],
        center: ['25%', '50%'],
        roseType: 'radius',
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        data: [
          { value: 10, name: '在册人数' },
          { value: 5, name: '释放人数' },
          { value: 15, name: '监内人数' },
          { value: 25, name: '销册人数' },
          { value: 20, name: '监外人数' },
          { value: 35, name: '死亡人数' },
          { value: 30, name: '调动人数' },
          { value: 40, name: '假释人数' }
        ]
      },
      // {
      //   name: '面积模式',
      //   type: 'pie',
      //   radius: [30, 110],
      //   center: ['75%', '50%'],
      //   roseType: 'area',
      //   data: [
      //     { value: 10, name: 'rose1' },
      //     { value: 5, name: 'rose2' },
      //     { value: 15, name: 'rose3' },
      //     { value: 25, name: 'rose4' },
      //     { value: 20, name: 'rose5' },
      //     { value: 35, name: 'rose6' },
      //     { value: 30, name: 'rose7' },
      //     { value: 40, name: 'rose8' }
      //   ]
      // }
    ]
  };
  return option;
}

export function getVisualMap() {
  const data = [
    [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
    [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
  ];
  const option = {
    legend: {
      data: ['一级', '二级'],
      right: '10%',
      top: '10%',
      itemWidth: 10, // 图例的宽度
      itemHeight: 10, // 图例的高度
      textStyle: { // 图例文字的样式
        color: '#ccc',
        fontSize: 16
      }
    },
    xAxis: {
      type: 'value',
      name: '',
      axisLabel: {
        textStyle: {
          color: '#FFFFFF',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#054792', // Y轴及其文字颜色
        }
      },
      splitLine: { // 分割线颜色修改
        lineStyle: {
          color: '#054792'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '单位：次',
      axisLabel: {
        textStyle: {
          color: '#FFFFFF',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#054792', // Y轴及其文字颜色
        }
      },
      splitLine: { // 分割线颜色修改
        lineStyle: {
          color: '#054792'
        }
      }
    },
    series: [{
      name: '一级',
      data: data[0],
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            return '设备报警类别：\n'
            + param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: 'rgba(120, 36, 50, 0.5)',
          shadowOffsetY: 5,
          color: '#F86AC8'
        }
      }
    }, {
      name: '二级',
      data: data[1],
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2;
      },
      label: {
        emphasis: {
          show: true,
          formatter: function(param) {
            return '设备报警类别：\n'
            + param.data[3];
          },
          position: 'top'
        }
      },
      itemStyle: {
        normal: {
          shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
          color: '#F3BA0B'
        }
      }
    }]
  };
  return option;
}

export function getGauge(){
  const option = {
    title: {
      text: '安全指数',
      left: 'center', // 标题位置
      bottom: '35%',
      textStyle: {
        color: '#fff',
        fontSize: 10
      }
    },
    // backgroundColor: '#1b1b1b',
    tooltip: {
      formatter: '{a} <br/>{c} {b}'
    },
    series: [
      {
        name: '安全指数',
        type: 'gauge',
        min: 0,
        max: 100,
        splitNumber: 10,
        radius: '50%',
        center: ['49.5%', '48%'],
        axisLine: {// 坐标轴线
          lineStyle: {// 属性lineStyle控制线条样式
            color: [[1,new Echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0.1,
                color: '#08C7FB'
              },
              {
                offset: 0.4,
                color: '#00FF2A'
              },
              {
                offset: 0.7,
                color: '#FFCD05'
              },{
                offset: 1,
                color: '#FF2400'
              }
            ])]],
            width: 8,
            // shadowColor : '#fff', //默认透明
            shadowBlur: 10
          }
        },
        axisLabel: { // 坐标轴小标记
          textStyle: {// 属性lineStyle控制线条样式
            // fontWeight: 'bolder',
            color: '#fff',
            // shadowColor: '#fff', // 默认透明
            shadowBlur: 10
          }
        },
        axisTick: {// 坐标轴小标记
          length: 15, // 属性length控制线长
          lineStyle: {// 属性lineStyle控制线条样式
            color: 'auto',
            // shadowColor: '#fff', // 默认透明
            shadowBlur: 10
          }
        },
        splitLine: {// 分隔线
          length: 20,// 属性length控制线长
          lineStyle: {// 属性lineStyle（详见lineStyle）控制线条样式
            width: 1,
            color: '#08C7FB',
            // shadowColor: '#fff', // 默认透明
            shadowBlur: 10
          }
        },
        pointer: {// 分隔线
          // shadowColor: '#fff',// 默认透明
          shadowBlur: 5
        },
        detail: {
          width: 40,
          height: 18,
          rich: {

          },
          backgroundColor: [[1,new Echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0.1,
              color: '#08C7FB'
            },
            {
              offset: 0.4,
              color: '#00FF2A'
            },
            {
              offset: 0.7,
              color: '#FFCD05'
            },{
              offset: 1,
              color: '#FF2400'
            }
          ])]],
          borderWidth: 1,
          borderColor: '#07A6FF',
          fontSize: 15,
          color: '#fff',
          offsetCenter: [0, '50%'], // x, y，单位px
          formatter: '{value}%'
        },
        data: [ { value: 40 } ]
      }
    ]
  };
  return option;
}

