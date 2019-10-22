
import { DOM_TYPE_BAR, DOM_TYPE_LINE, DOM_TYPE_PIE, DOM_TYPE_VIS, DOM_TYPE_GAUGE, DOM_TYPE_PRO6, DOM_TYPE_PRO7 } from '@/utils/const';

// 组件配置
export const tempArr = [
  {
    name: '基本折线图',
    icon: '5.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_LINE,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: '',
    // eslint-disable-next-line no-dupe-keys
    cfiUpdateTime: ''
  },
  {
    name: '基本柱状图',
    icon: '7.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_BAR,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: 'test',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: '',
    // eslint-disable-next-line no-dupe-keys
    cfiUpdateTime: ''
  },
  {
    name: '基本饼图',
    icon: '13.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_PIE,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: '',
    cfiUpdateTime: ''
  },
  {
    name: '基本散点图',
    icon: '9.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_VIS,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: '',
    cfiUpdateTime: ''
  },
  {
    name: '单仪表盘',
    icon: '1.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_GAUGE,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: '',
    cfiUpdateTime: ''
  },
  {
    name: '基本条形图',
    icon: '14.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_PRO6,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: '',
    cfiUpdateTime: ''
  },
  {
    name: '堆叠条形图',
    icon: '16.png',
    cfiLayout: JSON.stringify({ w: 4, h: 8 }),
    cfiType: DOM_TYPE_PRO7,
    cfiEvent: JSON.stringify({ glass: 1, filter: 1, export: 1, detail: 1 }),
    cfiName: '',
    cfiIsUpdate: 1,
    cfiDatasourceId: '0',
    cfiConfigId: '',
    cfiUpdateTime: ''
  }
];
