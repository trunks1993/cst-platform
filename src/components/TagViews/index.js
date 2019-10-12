import React, { useState } from 'react';
import { Icon } from 'antd';
import _ from 'lodash';

export default ({ tags, setTags }) => {

  return (
    <div className="tag-views">
      <ul >
        {
          tags.map((item, index) => {
            return (
              <li className="tag-views-item" key={index}>
                {item.name }
                <Icon type="close"
                  onClick={ () => {
                    const newViews = _.filter(tags, (v, i) => i !== index);
                    setTags(newViews);
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
