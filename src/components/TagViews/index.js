import React from 'react';
import { Icon } from 'antd';
import _ from 'lodash';

export default ({ tags, setTags, curIndex, handleCurIndex }) => {

  return (
    <div className="tag-views">
      <ul >
        {
          tags.map((item, index) => {
            return (
              <li className={ curIndex === item.cucId ? 'tag-views-item active-tag-views' : 'tag-views-item' } key={index} onClick={ () => {
                handleCurIndex(item.cucId);
              } }>
                {item.cucName }
                <Icon type="close" style={{ marginLeft: '5px' }}
                  onClick={ (e) => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    const newViews = _.filter(tags, (v, i) => i !== index);
                    setTags(newViews);
                    handleCurIndex('');
                    // if (newViews.length) {
                    //   handleCurIndex(newViews[0].cucId);
                    // } else {
                    //   handleCurIndex('');
                    // }
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
