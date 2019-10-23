import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';

export default ({ type, data = [] }) => {
  // eslint-disable-next-line no-unused-vars
  const [list, setList] = useState([]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (data.length) setList(JSON.parse(data[0].cdsOdbcValue));
  }, [data]);
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
      list.map(ele => (
        <div className="crime-content">
          <div className="crime-content-pro"><span>{ele.label}</span><Slider defaultValue={ele.value} /> <span>{ele.count}人</span></div>
        </div>
      ))
    );
  }
  return (
    <div className="equipment-content">
      {
        list.map(ele => (
          <div className="crime-content-pro" style={{ width: getDefaultWidth(list.length) }}>
            <span className="crime-content-title">{ele.name}</span>
            <div className="crime-content-pro-box">
              <Slider defaultValue={+ele.value} /> <span className="number">{ele.name + ' ' + ele.value}人</span>
              <Slider defaultValue={+ele.value} /> <span className="number">{ele.name + ' ' + ele.value}人</span>
            </div>
          </div>
        ))
      }
    </div>

  );
};
