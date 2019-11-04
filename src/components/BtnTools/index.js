import React from 'react';
import _ from 'lodash';
import { Button,Icon } from 'antd';

// const BtnItem = ({ icon, fn, label }) => {
//   return (
//     <Button className="btn-item" icon={icon} onClick={fn}>{label}</Button>);
// };

export default ({ btnList }) => {
  return (<ul>
    {
      _.map(btnList, ({ icon, fn, label, disabled }, key) => <Button className="btn-item" key={key} disabled={disabled} onClick={fn}><span className="scale"><Icon type={icon} /> {label}</span></Button>)
    }
  </ul>);
};
