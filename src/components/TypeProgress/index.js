import React from 'react';
import { Slider } from 'antd';

export default ({ type, optionLists }) => {
//   const len = optionLists.length;
  const getDefaultWidth = (len) => {
    if (len % 3 === 0) {
      return '33.3%';
    } else if (len % 2 === 0) {
      return '50%';
    }
    return '100%';
  };
  if (type === '6'){
    return (
      optionLists.map(ele => (
        <div className="crime-content">
          <div className="crime-content-pro"><span>{ele.label}</span><Slider defaultValue={ele.value} /> <span>{ele.count}人</span></div>
        </div>
      ))
    );
  }
  return (
    <div className="equipment-content">
      {
        optionLists.map(ele => (
          <div className="crime-content-pro" style={{ width: getDefaultWidth(optionLists.length) }}>
            <span className="crime-content-title">{ele.label}</span>
            <div className="crime-content-pro-box">
              <Slider defaultValue={ele.countVal} /> <span className="number">{ele.countName + ' ' + ele.countVal}人</span>
              <Slider defaultValue={ele.breakVal} /> <span className="number">{ele.breakName + ' ' + ele.breakVal}人</span>
            </div>
          </div>
        ))
      }
    </div>

  );
};
