
import { DOM_TYPE_BAR, DOM_TYPE_LINE, DOM_TYPE_PIE, DOM_TYPE_VIS, DOM_TYPE_GAUGE, DOM_TYPE_PRO6, DOM_TYPE_PRO7 } from '@/utils/const';

// 组件配置
export const tempArr = [
  {
    name: '基本折线图',
    icon: '2.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_LINE,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: ''
  },
  {
    name: '基本柱状图',
    icon: '1.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_BAR,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: 'test',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: ''
  },
  {
    name: '基本饼图',
    icon: '3.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_PIE,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: ''
  },
  {
    name: '基本散点图',
    icon: '4.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_VIS,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: ''
  },
  {
    name: '基本雷达图',
    icon: '5.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_GAUGE,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: ''
  },
  {
    name: '基本关系图',
    icon: '6.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_PRO6,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: ''
  },
  {
    name: '进度条',
    icon: '7.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_PRO7,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: ''
  }
];
