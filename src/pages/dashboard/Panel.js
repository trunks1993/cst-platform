import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Input, Skeleton, message } from 'antd';
// eslint-disable-next-line no-unused-vars
import { getPublicTemp, getStaticTemp, getUserDetail, getTempDetail, getEchartsList } from '@/api/index';
import { getToken } from '@/utils/auth';
import { Icon } from 'antd';
import _ from 'lodash';
const { Search } = Input;
// eslint-disable-next-line complexity
export default ({ setTempData, setTags, setFormInfo, tags, handleCurIndex, curIndex, cRef }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [isShowPublicTemp, ShowPublicTemp] = useState(true);// 公共模块骨架屏
  const [isShowSingleTemp, ShowSingleTemp] = useState(true);// 个人模块骨架屏
  const [singleTemp, handleSingleTemp] = useState([]);// 个人模板
  const [publicTemp, handlePublicTemp] = useState([]);// 公共模板
  const [echartsList, handleEchartsList] = useState([]);
  const addTag = tag => {
    const fi = _.findIndex(tags, o => o.cucId === tag.cucId);
    handleCurIndex(tag.cucId);
    if (fi < 0) {
      const t = _.clone(tags);
      t.push(tag);
      setTags(t);
    }
  };
  const isExistCurIndex = (tags, curIndex) => {
    return tags.some(ele => {
      return curIndex === ele.cucId;
    });
  };

  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    changeVal: (newVal) => {
      handleSingleTemp(newVal);
    },
    changePublic: v => {
      handlePublicTemp(v);
    }
  }));

  useEffect(() => {
    // Update the document title using the browser API
    // getStaticTemp();
    getEchartsList(getToken()).then(res => {
      handleEchartsList(res.data);
    });
    // 个人模板
    getStaticTemp({ token: getToken() }).then(res => {
      if (res.data.rows.length) {
        // setTimeout(() => {
        console.log(res.data.rows);
        handleSingleTemp(res.data.rows);
        ShowSingleTemp(false);
        // }, 20000);
      }
    }).catch(err => {
      console.error(err);
    });
    // 公共模板
    getPublicTemp(getToken()).then(res => {
      handlePublicTemp(res.data.rows);
      ShowPublicTemp(false);
    }).catch(err => {
      console.error(err);
    });
    ShowPublicTemp(false);
  }, []);

  return (
    <div className="panel-box" >
      <div className="panel-box-item">
        <div className="btn" onClick={() => setVisible1(!visible1)}>
          <span>工作台模板</span>
          <Icon style={{ marginLeft: '10px' }} type="double-left" />
        </div>
        <div className="content" style={{ paddingTop: visible1 ? 0 : '10px', maxHeight: visible1 ? 0 : '1000px' }}>
          <Search placeholder="请输入模板名称" onSearch={value => console.log(value)} />
          <div className="group-btn" onClick={() => setVisible2(!visible2)}>
            公共模板
            <span className="group-btn-iconbox">
              <Icon type="caret-down" />
            </span>
          </div>
          <ul className="group-list" style={{ paddingBottom: visible2 ? 0 : '10px', maxHeight: visible2 ? 0 : '1000px' }}>
            <Skeleton title={false} loading={ isShowPublicTemp } active>
              {
                // eslint-disable-next-line complexity
                publicTemp.map((tag, index) => (
                  <li key={index} className={ curIndex === tag.cucId ? 'active-tag-views' : '' } onClick={
                    () => {
                      addTag(tag);
                      getTempDetail(tag.cucId).then(res => {
                        setFormInfo(res.data);
                      });;
                    }
                  }>{tag.cucName}{ tag.status === '1' ? '（编辑中）' : (tag.status === '2' ? '（保存）' : '（发布）') }</li>
                ))
              }
            </Skeleton>
          </ul>

          <div className="group-btn" onClick={() => setVisible3(!visible3)}>个人模板<span className="group-btn-iconbox"><Icon type="caret-down" /></span></div>
          <ul className="group-list" style={{ paddingBottom: visible3 ? 0 : '10px', maxHeight: visible3 ? 0 : '1000px' }}>
            <Skeleton key={1} title={false} loading={ isShowSingleTemp } active>
              {
                // eslint-disable-next-line complexity
                singleTemp.map((tag, index) => (
                  <li key={tag.cucId} className={ curIndex === tag.cucId ? 'active-tag-views' : '' } onClick={
                    () => {
                      addTag(tag);
                      getTempDetail(tag.cucId).then(res => {
                        // _.map(res.data, v => v.cusFunctionInfo)
                        setFormInfo(res.data);
                      });
                    }
                  }>{tag.cucName}{ tag.cucStatus === '1' ? '（编辑中）' : (tag.status === '2' ? '（保存）' : '（发布）') }</li>
                ))
              }
            </Skeleton>
          </ul>

        </div>
      </div>
      <img style={{ margin: '10px 0' }} src={require('../../assets/images/l-panel.png')} alt="" />
      <div className="panel-box-item">
        <div className="btn" onClick={() => setVisible4(!visible4)}>应用套件<Icon style={{ marginLeft: '10px' }} type="double-left" /></div>
        <div className="content" style={{ paddingTop: visible4 ? 0 : '10px', maxHeight: visible4 ? 0 : '1000px' }}>
          <div className="temp-btn" onClick={() => setVisible5(!visible5)}>
            <span>大数据平台</span>
            <span className="temp-btn-iconbox">
              <Icon type="caret-down" />
            </span>
          </div>
          <ul className="temp-list" style={{ maxHeight: visible5 ? 0 : '1000px' }}>
            {
              echartsList.map((item,index) => (
                <Skeleton key={index} title={false} loading={ isShowSingleTemp } active>
                  <li key={index} draggable="true" onDragOver={e => e.preventDefault()} onDragStart={() => {
                    if (!isExistCurIndex(tags, curIndex)) {
                      message.warning('请先选择模板');
                    } else {
                      setTempData(item);
                    } }} unselectable="on" >
                    <img src={require('../../assets/images/tempIcons/1.png')} alt="" />
                    <div className="title">{item.name}</div>
                  </li>
                </Skeleton>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};
