import React, { useState, useRef } from 'react';
import Grid from './Grid';
import Panel from './Panel';
import TagViews from '@/components/TagViews';
import { Modal, Form, Input, Message, Icon } from 'antd';
import { addStaticTemp, getStaticTemp, getTempDetail, deleteTemp, saveTempGridData, editTempGridData, shareTempGridData, getPublicTemp } from '@/api/index';
import { getToken } from '@/utils/auth';
import _ from 'lodash';

// const { Option } = Select;
export default Form.create({})(({ form: { getFieldDecorator, validateFields } }) => {
  const [tempData, setTempData] = useState({});
  const [tags, setTags] = useState([]);
  const [showModel, handleShowModel] = useState(false);
  const [InputValue, handleInputValue] = useState('');
  const [curIndex, handleCurIndex] = useState('');// 当前模板id
  const [formInfo, setFormInfo] = useState([]);// formInfo
  const [selectId, setSelectId] = useState('');// formInfo选中Id

  const childRef = useRef();
  const { confirm } = Modal;

  const addNewModule = () => {
    addStaticTemp({ token: getToken(), cucName: InputValue, cucStatus: '1' }).then(res => {
      Message.success(res.msg);
      handleShowModel(false);
      handleInputValue('');
    }).then(() => {
      getStaticTemp({ token: getToken() }).then(res => {
        if (res.data.length) {
          childRef.current.changeVal(res.data);
        }
      }).catch(err => {
        console.error(err);
      });
    }).catch(err => {
      console.error(err);
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-container-header">
        <div className="dashboard-container-header-title">
          <span className="label">个性化工作台</span>
          <img
            src={require('../../assets/images/bg-dashboard-headerl.png')}
            alt=""
          />
        </div>
        <div className="dashboard-container-header-btn">
          <img
            src={require('../../assets/images/bg-dashboard-header.png')}
            alt=""
          />
          <ul>
            <li className="btn-item" onClick={() => { handleShowModel(true); }}> <Icon type="plus" />新建</li>
            <li className="btn-item" onClick={() => {
              console.log(curIndex);
              if (!curIndex) {
                Message.warning('请先选择模块');
              } else {
                if (formInfo.length) {
                  const matchInfo = _.map(formInfo, e => ({
                    configId: curIndex,
                    functionInfoId: e.cfiConfigId,
                    id: e.cufId,
                    deleteFalg: '2',
                    sourceid: e.cfiDatasourceId,
                    layout: e.cfiLayout
                  }));
                  saveTempGridData(matchInfo).then(res => {
                    Message.success(res.msg);
                    if (res.code === '0') {
                      getStaticTemp({ token: getToken() }).then(res => {
                        if (res.data.length) {
                          childRef.current.changeVal(res.data);
                        }
                      });
                    }
                  });
                } else {
                  Message.warning('请添加图表配置');
                }
              }
            }}><Icon type="file-protect" />保存</li>
            <li className="btn-item" onClick={() => {
              console.log(curIndex);
              if (!curIndex) {
                Message.warning('请先选择模块');
              } else {
                confirm({
                  title: '确定是否删除此模块?',
                  // content: '确定是否删除此模块？',\
                  okText: '确认',
                  cancelText: '取消',
                  centered: true,
                  onOk() {
                    deleteTemp({ token: getToken(), cucId: curIndex }).then(res => {
                      Message.success(res.msg);
                    }).then(() => {
                      setTags(tags.filter(ele => {
                        return ele.cucId !== curIndex;
                      }));
                      setFormInfo([]);
                      handleCurIndex('');
                      getStaticTemp({ token: getToken() }).then(res => {
                        if (res.data.length) {
                          childRef.current.changeVal(res.data);
                        }
                      }).catch(err => {
                        console.error(err);
                      });
                    });
                  },
                  onCancel() {},
                });
              }
            }}><Icon type="delete" />删除</li>
            {/* <li className="btn-item">重置</li>
            <li className="btn-item">预览</li> */}
            <li className="btn-item" onClick={() => {
              if (!curIndex) {
                Message.warning('请先选择模块');
              } else {
                editTempGridData('3', curIndex).then(res => {
                  Message.success('发布成功');
                });
              }
            }}><Icon type="cloud-upload" />发布</li>
            <li className="btn-item" onClick={() => {
              if (!curIndex) {
                Message.warning('请先选择模块');
              } else {
                shareTempGridData('1', curIndex).then(res => {
                  Message.success('共享成功');
                }).then(res => {
                  getPublicTemp(getToken()).then(res => {
                    childRef.current.changePublic(res.data);
                  });
                });
              }
            }}><Icon type="retweet" />共享</li>
            <li className="btn-item" onClick={() => {
              if (!curIndex) {
                Message.warning('请先选择模块');
              } else {
                editTempGridData('2', curIndex).then(res => {
                  Message.success('取消共享成功');
                }).then(res => {
                  getPublicTemp(getToken()).then(res => {
                    childRef.current.changePublic(res.data);
                  });
                });
              }
            }}>取消共享</li>
            <li className="btn-item" onClick={() => {
              if (!curIndex) {
                Message.warning('请先选择模块');
              } else {
                getTempDetail(curIndex).then(res => {
                  // _.map(res.data, v => v.cusFunctionInfo)
                  setFormInfo(res.data);
                });
              }
            }}>重置</li>
          </ul>
        </div>
      </div>
      <div className="dashboard-container-body">
        <div className="dashboard-container-body-panel">
          {/* <div className="droppable-element" draggable unselectable="on" /> */}
          <Panel
            cRef={childRef}
            setTempData={setTempData}
            tags={tags}
            setTags={setTags}
            setFormInfo={setFormInfo}
            handleCurIndex={handleCurIndex}
            curIndex={curIndex} />
        </div>
        <div className="dashboard-container-body-content">
          <Modal
            centered
            visible={ showModel}
            closable={false}
            footer={null}
          >
            <Form {...formItemLayout}>
              <Form.Item label="新建模板">
                {/* <Input
                  style={{ width: 200 }}
                  onChange={val => { handleInputValue(val.target.value); }}
                  placeholder="请输入模板名称"
                /> */}
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入模板配置名',
                    },
                  ],
                })(<Input
                  // prefix={<Icon type="user" style={{ color: '#79A8E0' }} />}
                  placeholder="模板配置名"
                  onChange={e => handleInputValue(e.target.value)}
                  value={InputValue}
                  autocomplete="off"
                />)}
              </Form.Item>
              <Form.Item style={{ marginTop: '86px' }}>
                <button className="global-btn" onClick={() => {
                  validateFields(err => {
                    if (!err) {
                      addNewModule();
                    }
                  }); }}>确定</button>
                <button className="global-btn" onClick={() => { handleShowModel(false);handleInputValue(''); }}>取消</button>
              </Form.Item>
            </Form>
          </Modal>
          <TagViews tags={tags} setFormInfo={setFormInfo} setTags={setTags} curIndex={curIndex} handleCurIndex={handleCurIndex} />
          <Grid setSelectId={setSelectId} selectId={selectId} curIndex={curIndex} handleCurIndex={handleCurIndex} tempData={tempData} tags={tags} formInfo={formInfo} setFormInfo={setFormInfo} isDroppable />
        </div>
      </div>
    </div>
  );
}
);
