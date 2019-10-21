import React from 'react';
import { Icon } from 'antd';
import _ from 'lodash';
import { getTempDetail } from '@/api/index';
export default ({ tags, setTags, curIndex, handleCurIndex, setFormInfo }) => {

  return (
    <div className="tag-views">
      <ul >
        {
          tags.map((item, index) => {
            return (
              <li className={ curIndex === item.cucId ? 'tag-views-item active-tag-views' : 'tag-views-item' } style={{ cursor: 'pointer' }} key={index} onClick={ () => {
                handleCurIndex(item.cucId);
                getTempDetail(item.cucId).then(res => {
                  setFormInfo(res.data);
                });
              } }>
                {item.cucName }
                <Icon type="close" style={{ marginLeft: '5px' }}
                  onClick={ (e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    const newViews = _.filter(tags, (v, i) => i !== index);
                    setTags(newViews);
                    handleCurIndex('');
                    setFormInfo([]);
                  }
                  } />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};
