import React from 'react';
import { Icon } from 'antd';
import _ from 'lodash';
// import { queryByConfigId } from '@/api/cs_api';
import { connect } from 'react-redux';
import { actions as appActions } from '@/redux/app';

const TagViews = ({ deleteTag, changeActiveTag, ids, tagById, activeTagId }) => {

  return (
    <div className="tag-views">
      <ul >
        {
          ids.map(id => {
            return (
              <li className={ activeTagId === id ? 'tag-views-item active-tag-views' : 'tag-views-item' } key={id} onClick={() => {
                changeActiveTag(id);
              }} >
                {tagById[id].cfgName }
                <Icon type="close" style={{ marginLeft: '5px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // e.nativeEvent.stopImmediatePropagation();
                    deleteTag(id);
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

const mapStateToProps = ({ appState }) => {
  return {
    tagById: appState.tagViews.byId,
    ids: appState.tagViews.ids,
    activeTagId: appState.activeTagId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeActiveTag: id => dispatch(appActions.changeActiveTag(id)),
    deleteTag: id => dispatch(appActions.deleteTag(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagViews);
