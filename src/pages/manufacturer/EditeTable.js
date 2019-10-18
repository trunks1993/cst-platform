import React from 'react';

import { Table, Input, Button, Popconfirm, Form, Icon } from 'antd';
import _ from 'lodash';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
      editing: true,
    };

    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    };

    save = e => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    };

    renderCell = form => {
      this.form = form;
      const { children, dataIndex, record, title } = this.props;
      const { editing } = this.state;
      return editing ? (
        <Form.Item style={{ margin: 0 }}>
          {form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: true,
                message: `${title} is required.`,
              },
            ],
            initialValue: record[dataIndex],
          })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
    };

    render() {
      const {
        editable,
        dataIndex,
        title,
        record,
        index,
        handleSave,
        children,
        ...restProps
      } = this.props;
      return (
        <td {...restProps}>
          {editable ? (
            <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
          ) : (
            children
          )}
        </td>
      );
    }
}

export default ({ cusDataSource, setCusDataSource, formInfo, selectId }) => {
  const t = typeof cusDataSource.cdsOdbcValue;
  const ds = t === 'string' ? JSON.parse(cusDataSource.cdsOdbcValue) : cusDataSource.cdsOdbcValue;

  const columnData = [
    {
      title: '键名',
      dataIndex: 'keyName',
      editable: true,
    },
    {
      title: '值',
      dataIndex: 'value',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (text, record) => ds.length >= 1 ? (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <a><Icon type="delete" /></a>
        </Popconfirm>
      ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  const handleSave = row => {
    const newData = [...ds];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    const d = _.assign({}, cusDataSource, { cdsOdbcValue: JSON.stringify(newData) });
    const items = formInfo.find(v => v.tId === selectId);
    items.cusDataSource = d;
    setCusDataSource(d);
    // setFormInfo(d);
  };

  const columns = columnData.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave
      }),
    };
  });

  function handleDelete(key) {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  const handleAdd = () => {
    const d = _.clone(ds);
    d.push({
      key: +new Date().getTime(),
      keyName: '',
      value: ''
    });

    const f = _.assign({}, cusDataSource, { cdsOdbcValue: JSON.stringify(d) });
    setCusDataSource(f);
  };

  return (
    <div>
      <Button onClick={handleAdd} type="primary">新增</Button>
      <Table
        size={'small'}
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={ds}
        columns={columns}
        pagination={ false }
      />
    </div>
  );

};
