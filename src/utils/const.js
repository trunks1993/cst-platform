// 图表组件类型
export const DOM_TYPE_BAR = '1';

export const DOM_TYPE_LINE = '2';

export const DOM_TYPE_PIE = '3';

export const DOM_TYPE_VIS = '4';

export const DOM_TYPE_GAUGE = '5';

export const DOM_TYPE_PRO6 = '6';

export const DOM_TYPE_PRO7 = '7';

export const domTypes = {
  [DOM_TYPE_BAR]: '基本柱状图',
  [DOM_TYPE_LINE]: '基本折线图',
  [DOM_TYPE_PIE]: '基本饼图',
  [DOM_TYPE_VIS]: '基本散点图',
  [DOM_TYPE_GAUGE]: '单仪表盘',
  [DOM_TYPE_PRO6]: '基本条形图',
  [DOM_TYPE_PRO7]: '堆叠条形图',
};

// 配置状态类型
export const CONF_STATUS_EDITE = 1;
export const CONF_STATUS_SAVED = 2;
export const CONF_STATUS_PUBLISH = 3;

export const types = {
  [CONF_STATUS_EDITE]: '（编辑）',
  [CONF_STATUS_SAVED]: '（已保存）',
  [CONF_STATUS_PUBLISH]: '（已发布）'
};


// 拖动组件类型
export const DRAG_TYPE_ECHART = '1'; // 图表类型

export const dragTypes = {
  [DRAG_TYPE_ECHART]: require('@/config').dragModels
};
