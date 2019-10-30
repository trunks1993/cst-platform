import React from 'react';
import { showConfirm } from '@/utils';
import { Skeleton, Icon } from 'antd';

export default ({ getConfigGroup, configGroupState }) => {
  // eslint-disable-next-line no-unused-expressions
  configGroupState.isFetching ? <Skeleton active /> : configGroupState.configGroup.map((group, index) => {
    return (
      <div key={index}>
        <div className="group-btn">
          {group.cfgName}
          <span className="group-btn-del" onClick={e => {
            e.stopPropagation();
            showConfirm(function() {
              console.log(group);
            //   deleteConfig(group.cfgId).then();
            });
          }}>
            <Icon type="delete" />
          </span>
          <span className="group-btn-iconbox">
            <Icon type="caret-down" />
          </span>
        </div>
        <ul className="group-list" style={{
          paddingBottom: !group.visible ? 0 : '10px',
          maxHeight: !group.visible ? 0 : '1000px'
        }}
        >
          {/* {
            // eslint-disable-next-line complexity
            group.children.map((child, idx_) => (<li
              key={idx_}
              onClick={() => {
                addTag(child);
                setSelectTag(child);
                queryByConfigId(child.cfgId).then(res => {
                  if (res.data.length) setSelectId(JSON.parse(res.data[0].cfiLayout).i);
                  setFormInfo(res.data);
                });
              }}
              style={{ color: selectTag.cfgId === child.cfgId ? '#03AFFF' : null }}
            >
              {child.cfgName}{types[child.cfgStatus]}
            </li>)
            )
          } */}
        </ul>
      </div>
    );
  });
};
