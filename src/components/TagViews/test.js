import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import _ from 'lodash';

export default ({ selectTag, setSelectTag, setFormInfo }) => {

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const index = _.findIndex(tags, v => v.cfgId === selectTag.cfgId);
    if (index === -1 && selectTag.cfgId) setTags([...tags, selectTag]);
  }, [selectTag, tags]);

  return (
    <div className="tag-views">
      <ul >
        {
          tags.map((item, index) => {
            return (
              <li className={ selectTag.cfgId === item.cfgId ? 'tag-views-item active-tag-views' : 'tag-views-item' } key={index} onClick={() => setSelectTag(item) } >
                {item.cfgName }
                <Icon type="close" style={{ marginLeft: '5px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newViews = _.filter(tags, v => item.cfgId !== v.cfgId);
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
