import { Modal } from 'antd';

const { confirm } = Modal;

export function flatTree(tree, flatArr = []) {
  func(tree, flatArr);
  return flatArr;
}

function func(tree, arr) {
  if (!tree.length) return;
  Array.prototype.push.apply(arr, tree);
  tree.map(item => (item.children && item.children.length) && func(item.children, arr));
}


// confirm
export function showConfirm(title, success = function() {}, cancel = function() {}) {
  confirm({
    title: title || '确认删除',
    okText: '确定',
    cancelText: '取消',
    centered: true,
    // content: 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      success();
    },
    onCancel() {
      cancel();
    },
  });
}
