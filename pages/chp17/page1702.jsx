import React, { Component } from 'react'
import { Divider, Tooltip, FloatButton, Dropdown, Popconfirm, Drawer, Button, Pagination, message, Watermark, Switch, Form, Table, Layout, Radio, Modal } from 'antd'
import { myDoFiles, myLocalTime, reqdoSQL, reqdoTree, myNotice } from '../../api/functions.js';
import { MyFormComponent } from '../../api/antdFormMethod.js';
import { AntdInputBox, AntdCheckBox, AntdComboBox, AntdRadio, AntdFileUpload, AntdHiddenField, AntdImage, MessageBox, AntdModal } from '../../api/antdClass.js';
import { AntdTree, AntdCascader } from '../../api/antdTrees.js';
import { RedoOutlined, FileAddOutlined, FileExcelOutlined, AuditOutlined, WindowsOutlined, FileUnknownOutlined, FormOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, SaveOutlined, PrinterOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const components = {
  body: {
    row: props => <tr className="tableRowStyle" {...props} />,
  },
};
//myTableStyle在style.css中
//https://ant.design/components/overview-cn/
//https://blog.csdn.net/weixin_45991188/article/details/108050424 
const sys = { ...React.sys };
const rowheight = 42;

export default class Page1702 extends MyFormComponent {
  state = {
    myTable1: {
      data: [],  //某一页数据
      total: 0,  //行总数
      pageno: 1, //当前选中页
      pagesize: 20,  //每页显示行数
      rowindex: 0,   //当前页光标位置
      keyfield: 'mowno',   //主键
      sortfield: '',   //排序列，只有一列
      row: {},  //当前选中的行
      selectedkeys: [],  //antd中选中打钩的行
      reloadflag: 1
    },
    supplierdata: [],
    addoredit: 'update',
    record: {},    //选中的行，返回给父类。网格填充到表单修改之前的数据，旧数据
    myWin1: false    //子窗体modal初始时为关闭状态
  }

  componentDidMount = async () => {
    this.loadTableData();
  }

  loadTableData = async () => { //加载每页数据
    let { pageno, pagesize, selectedkeys, rowindex } = this.state.myTable1
    let p = {}
    p.sqlprocedure = 'demo1702a'
    p.pageno = pageno;
    p.pagesize = pagesize;
    p.keyvalue = '';
    p.filter = this.filtertext.state.value.trim();
    p.sortfield = this.state.sortfield;
    const rs = await reqdoSQL(p)
    //计算total  可以没有记录total值
    console.log(991, rs.rows);
    let total = 0;
    if (rs.rows && rs.rows.length > 0 && rs.rows[0]._total) total = parseInt(rs.rows[0]._total);
    else if (rs.rows) total = rs.rows.length;
    if (rowindex < 0 || rowindex >= rs.rows.length) rowindex = 0;
    if (rowindex < rs.rows.length) {
      selectedkeys = [rs.rows[rowindex][this.state.myTable1.keyfield]];
    } else {
      selectedkeys = [];
    }
    //console.log(991,JSON.stringify(rs));
    let table = { ...this.state.myTable1 }
    this.setState({ myTable1: { ...table, data: rs.rows, pageno: pageno, pagesize, total, rowindex, selectedkeys: selectedkeys } }, () => {
      setTimeout(() => {
        this.handleSelectRow(rs.rows[rowindex], rowindex);
      })
    });
  }

  handleSearchFilter = async () => {
    let table = { ...this.state.myTable1 }
    this.setState({ myTable1: { ...table, pageno: 1, rowindex: 0 } }, () => {
      setTimeout(() => {
        this.loadTableData();
      })
    });
  }

  handlePageChange = (pageno, pagesize) => { //换页事件
    //alert(pageno+'----'+pagesize)    
    let table = { ...this.state.myTable1 }
    this.setState({ myTable1: { ...table, pagesize, pageno } }, () => {
      setTimeout(() => {
        this.loadTableData();
      })
    });
  }

  selectionChange = (selectedkeys, rows) => {
    //checkbox选中的项,单选功能的实现
    let table = { ...this.state.myTable1 }
    this.setState({ myTable1: { ...table, selectedkeys: selectedkeys, row: rows[0] } })
  }

  handleMyMenu1Click = (e) => {
    //右键菜单程序
    let key = e.key;
    if (key == 'menu-delete') this.handleDeleteClick();
    else if (key == 'menu-add') this.handleAddClick();
    else if (key == 'menu-edit') this.handleEditRow(this.state.myTable1.row);
    else if (key == 'menu-refresh') this.handleRefreshRow(e);
  }

  handleSelectRow = (row, index) => {
    if (!row) return;
    let table = { ...this.state.myTable1 }
    let record = this.setFormValues('myForm1', row);
    this.setState({ addoredit: 'query', record: record, myTable1: { ...table, row: row, rowindex: index, selectedkeys: [row[this.state.myTable1.keyfield]] } }, () => {
      setTimeout(() => {
        if (this.state.myWin1) {
          //this[this.state.myTable1.keyfield].setState({ editable: false });
        }
      })
    });
  }

  handleQueryRow = (row) => { //eeeeeeee
    this.setState({ myWin1: true, addoredit: 'query' }, () => {
      this.setFormFields('myForm1', 'readOnly', true)
    });
  }

  handleEditRow = (row) => { //eeeeeeee
    //console.log(117,this.state.myTable1.data);
    //console.log(118, row);
    this.setState({ myWin1: true, addoredit: 'update' }, () => {
      setTimeout(() => {
        this.setFormFields('myForm1', 'readOnly', false);
        //this.setFormValues('myForm1', row);
        this[this.state.myTable1.keyfield].setState({ readOnly: true });
      })
    });
  }

  handleAddClick = () => {  //aaaaaaaa
    this.setState({ myWin1: true, addoredit: 'add' }, () => {
      setTimeout(() => {
        this.resetFormValues('myForm1');
        //this.setFormFields('myForm1', 'readOnly', false)
        this[this.state.myTable1.keyfield].setState({ readOnly: false, disabled: false });
      })
    });
  }

  handleDeleteClick = async (e) => {
    let { row, keyfield } = this.state.myTable1;
    this.myDeleteModal.setState({ visible: true, description: '是否确定删除【' + row[keyfield] + '】这个绿化记录？' });
    return;
  }

  handleDeleteRow = async (row, rowindex) => {  //ddddddddddddddelete   
    let table = { ...this.state.myTable1 }
    let { pageno, pagesize, total, keyfield } = table;
    //row=this.state.myTable1.row;
    let xdata = { ...row };
    //xdata[keyfield] = row[keyfield];
    xdata._action = 'delete';
    xdata._reloadrow = 0;
    let p = {};
    p.sqlprocedure = 'demo1702b'; // "demo502c";
    p.data = [];
    p.data.push(xdata);
    //console.log(JSON.stringify(p.data));
    let rs = await reqdoSQL(p); //调用函数，执行存储过程保存数据。必须加await 
    this.deleteUploadedFiles('myForm1', p.data);
    //删除记录后，重新定位到下一行。计算下一行的行号。
    let rowno = (pageno - 1) * pagesize + rowindex + 1;  //实际行号
    if (rowno >= total) rowindex--;
    //console.log(333, rowindex, rowno, total, pageno);
    if (rowindex < 0) {
      pageno--;
      rowindex = 0;   //定位到上一页第一行
    }
    if (pageno > 0) {
      this.myDeleteModal.setState({ visible: false });
      this.setState({ myTable1: { ...table, pageno, rowindex } }, () => { //自动触发1次，先清空data
        setTimeout(() => {
          this.loadTableData();
        })
      });
    }
  }

  handleSaveClick = async () => {  //sssssssssssave
    //保存数据
    let table = { ...this.state.myTable1 }
    let { pageno, pagesize, total, rowindex, row, keyfield } = table;
    let { record, addoredit } = this.state;
    let data = this.getFormValues('myForm1');  //转换数据内容
    //if (data._action=='add') data[this.state.myTable1.keyfield]=0;  //主键值自动生成
    console.log(664, addoredit, data);
    data._action = addoredit;
    data._reloadrow = 1;
    data._treeflag = 0;
    let p = {};
    p.sqlprocedure = 'demo1702b';  //"demo504a";
    p.data = [];
    p.data.push(data);
    if (addoredit != 'add') {
      p.data.push(record);  //旧的没有修改过的数据
    }
    //console.log(p.data);
    //console.log(JSON.stringify(p.data));
    let rs = await reqdoSQL(p); //调用函数，执行存储过程保存数据。必须加await
    if (rs.rows.length > 0 && (rs.rows[0]._error == undefined || rs.rows[0]._error == '')) { //数据验证
      //替换数组中的这个元素
      //console.log(665,rs.rows);
      //data[keyfield]=rs.rows[0][keyfield];  //提取主键列
      data = Object.assign({}, data, rs.rows[0]);  //合并对象属性，主键可能不止一个列
      //先上传的文件，再保存记录到数据库。修改新增时上传文件的名称，可能需要把临时文件改成与主键列相关的文件名
      let data0 = this.renameUploadedFiles('myForm1', rs.rows[0]);
      console.log(7777, Object.keys(data0), data0);
      //if (this.state.addoredit=='add'){
      if (Object.keys(data0).length > 0) {
        data = Object.assign({}, data, data0);  //合并对象属性
        data._action = 'update';
        data._reloadrow = 1;
        data._treeflag = 0;
        let p = {};
        p.sqlprocedure = 'demo1702b';  //"demo504a";;
        p.data = [];
        p.data.push(data);  //p.data只有一行时，where修改条件取第一行的值
        //console.log(775,JSON.stringify(p.data));
        let rs1 = await reqdoSQL(p);
      }
      //新增记录或修改记录后可能排序次序发生变化，重新进行分页，计算行号定位到新行的这一页这一行
      //console.log(776, rs.rows[0]);
      let rowno = parseInt(rs.rows[0]._rowno);
      if (pagesize > 0) {  //分页时计算页码和行号
        //console.log(666,rowno);
        pageno = parseInt((rowno - 1) / pagesize) + 1;
        rowindex = rowno - (pageno - 1) * pagesize - 1;
        total++;
      } else { //不分页不计算行号
        rowindex = rowno - 1;
      }
      this.setState({ addoredit: 'update', myWin1: false, myTable1: { ...table, total, rowindex, pageno } }, () => {
        setTimeout(() => {
          this.loadTableData();
          myNotice('除草记录已经保存，请刷新数据!', '', 200)
        })
      });
    } else {
      myNotice('除草记录编码重复，记录保存失败！', 'error');  //
    }
  }

  handleProductChange = (e) => {
    console.log(111111, e, this.productid.state.value)
  }

  showTotal = (total, range) => {
    let { pageno, pagesize } = this.state.myTable1;
    let start = (pageno - 1) * pagesize + 1;
    let limit = Math.min(start + pagesize - 1, total);
    let pagecount = parseInt((total - 1) / pagesize) + 1;
    return `当前第${pageno}页（共${pagecount}页），第${start}~${limit}行（共${total}行）。`;
  }

  handleContextMenu = (row, index, e) => {
    //右键设置，使用原生js，第一次记录击时会显示默认菜单
    this.handleSelectRow(row, index);
    let id = document.getElementById('myTable1');
    id.oncontextmenu = function (e) {
      e.preventDefault();
    }
  }

  handleSizeChange = (current, pagesize) => {
    let table = { ...this.state.myTable1 }
    this.setState({ myTable1: { ...table, pagesize } }, () => {
      setTimeout(() => {
        //this.loadTableData();
      })
    });
  }

  handleSorter = (v1, v2, sorter) => {
    console.log(111, sorter)
    let f = sorter.field;
    let d = sorter.order;
  }

  handleRefresh = () => {

  }

  handleCategoryChange = (value, row) => {
    //console.log(666,value[0],row[0])
    if (value?.length > 0) {
      this.myForm1.setFieldValue('categoryid', value[0]);
      this.myForm1.setFieldValue('categoryname', row[0].categoryname);
    }
  }

  handleSupplierChange = (value, row) => {
    //console.log(value,row)
    this.myForm1.setFieldValue('cleanerno', row.cleanerno);
  }

  handleSpotChange = (value, row) => {
    //console.log(value,row)
    this.myForm1.setFieldValue('spotno', row.spotno);
  }

  onFinish = (json) => { //提交时触发
    console.log(661, json);
  }

  render() {
    const { data, pagesize, total, addoredit, pageno } = this.state;
    const menuitems = [{
      label: '新增',
      key: 'menu-add',
      icon: <PlusCircleOutlined />
    }, {
      label: '修改',
      key: 'menu-edit',
      icon: <EditOutlined />
    }, {
      type: 'divider',
      key: 'menu13',
    }, {
      label: '删除',
      key: 'menu-delete',
      icon: <DeleteOutlined />
    }, {
      label: '刷新',
      key: 'menu-refresh',
      icon: <RedoOutlined />
    }];

    const columns = [
      {
        title: '序号', dataIndex: 'xrowno', width: '50px', fixed: 'left', className: 'rownumberStyle',
        render: (text, record, index) => (this.state.myTable1.pageno - 1) * this.state.myTable1.pagesize + index + 1
      },
      { dataIndex: 'mowno', title: '除草记录编号', width: '100px', align: 'center', fixed: 'left',ellipsis: true },
      { dataIndex: 'spotname', title: '绿化点名称', width: '120px', align: 'center', ellipsis: true },
      { dataIndex: 'cleanername', title: '环卫工人名称', width: '100px',align: 'center',fixed: 'left', ellipsis: true },
      { dataIndex: 'mowdate', title: '除草日期', width: '100px', align: 'center', ellipsis: true },
      { dataIndex: 'mowtime', title: '除草时间', width: '100px', align: 'center', ellipsis: true },
      { dataIndex: 'mowlong', title: '用时', width: '100px', align: 'center', ellipsis: true },
      { dataIndex: 'mowtools', title: '使用工具', width: '100px', align: 'center', ellipsis: true },
      { dataIndex: 'mowcondition', title: '植被状况', width: '100px', align: 'center', ellipsis: true },


      {
        title: '操作', dataIndex: '_operation', key: '_operation', fixed: 'right', width: '66px',
        //record对应的是render里的对象 ，dataindex对应的值
        render: (text, record, index) => <>
          <Tooltip title="修改记录" placement="bottom"><Button size='small' type="text" icon={<EditOutlined style={{ fontSize: '10px', textAlign: 'center' }} />} style={{ height: 24, width: 20, marginRight: 2 }} onClick={() => this.handleEditRow(record)} /></Tooltip>
          <Popconfirm okText='确定' cancelText='取消' overlayStyle={{ width: 350 }} title='系统提示' description={`是否确定删除"${record.productname}"的这个除草记录？`}
            onConfirm={() => { this.handleDeleteRow(record, index) }} placement="topLeft">
            <Tooltip title="删除记录" placement="bottom"><Button size='small' type="text" icon={<DeleteOutlined style={{ fontSize: '10px', align: 'cmiddle', marginBottom: 3 }} />} style={{ height: 24, width: 20 }} /></Tooltip>
          </Popconfirm>
        </>
      }]

    return (<>
      <Layout style={{ overflow: 'hidden' }}>
        <Header style={{ padding: 0, paddingLeft: 4, height: 35, lineHeight: '30px', backgroundColor: '#E0ECFF', borderBottom: '1px solid #95B8E7', overflow: 'hidden' }}>
          <Form name='filterbar'>
            <div style={{ marginTop: 1, paddingTop: 1 }}>
              <Divider type='vertical' />
              <Button type="text" icon={<PlusCircleOutlined />} style={{ padding: 0, width: 66, height: 30 }} onClick={this.handleAddClick.bind(this)}>新增</Button>
              <Divider type='vertical' />
              <Button type="text" icon={<EditOutlined />} style={{ padding: 0, width: 66, height: 30 }} onClick={this.handleEditRow.bind(this)}>修改</Button>
              <Divider type='vertical' />
              <Button type="text" icon={<DeleteOutlined />} style={{ padding: 0, width: 66, height: 30 }} onClick={this.handleDeleteClick.bind(this)}>删除</Button>
              <Divider type='vertical' />
              <Button type="text" icon={<FileExcelOutlined />} style={{ padding: 0, width: 66, height: 30 }} onClick={this.handleAddClick.bind(this)}>导出</Button>
              <Divider type='vertical' />
              <Button type="text" icon={<RedoOutlined />} style={{ padding: 0, width: 66, height: 30 }} onClick={this.handleRefresh.bind(this)}>刷新</Button>
              <Divider type='vertical' />
            </div>
            <AntdInputBox type='search' id='filtertext' label='快速过滤' labelwidth='72' top='1' left='440' width='350' ref={ref => this.filtertext = ref} onSearch={this.handleSearchFilter.bind(this)} />
          </Form>
        </Header>
        <Dropdown menu={{ items: menuitems, onClick: this.handleMyMenu1Click.bind(this) }} overlayStyle={{ width: 160 }} trigger={['contextMenu']}>
          <Content style={{ overflow: 'hidden', position: 'relative', width: '100%', overflowX: 'auto' }}>
            <Table className="myTableStyle" sticky={true} size='small' rowKey={this.state.myTable1.keyfield} id='myTable1' ref={ref => this.myTable1 = ref} bordered={true}
              //scroll={{x:'80%'}}  //滚动条用外层的方法
              //style={{overflow:'auto', position:'absolute', height:'100%'}}
              scroll={{ x: '90%', y: 'calc(100vh - 142px)' }}
              style={{ overflow: 'hidden', position: 'absolute', height: '100%', maxHeight: '100%' }}
              columns={columns} dataSource={this.state.myTable1.data} pagination={false}
              onChange={this.handleSorter}
              rowSelection={{
                type: 'radio',
                selectedRowKeys: this.state.myTable1.selectedkeys,
                onChange: (selectedRowKeys, selectedRows) => { this.selectionChange(selectedRowKeys, selectedRows) }
              }}
              onRow={(record, index) => {
                return {
                  onClick: (e) => { this.handleSelectRow(record, index) }, // 记录击行
                  //onDoubleClick: (e) => { this.handleEditRow(record, index) },
                  onDoubleClick: (e) => { this.handleQueryRow(record, index) },
                  //onDoubleClick: (e) => { this.setState({ myWin1: true, addoredit: 'query' }, () => () => this.setFormFields('myForm1', 'readOnly', true)  )},
                  onContextMenu: (e) => { this.handleContextMenu(record, index, e) }
                };
              }}
            />
          </Content>
        </Dropdown>
        <Footer style={{ padding: '5px 16px 0px 16px', height: 36, borderTop: '1px solid #95B8E7', borderLeft: '0px', background: '#efefef' }}>
          <Pagination size="small" total={this.state.myTable1.total} style={{ textAlign: 'center' }}
            showSizeChanger pageSizeOptions={['10', '20', '50', '100']} showQuickJumper className='paginationStyle'
            current={this.state.myTable1.pageno} defaultPageSize={this.state.myTable1.pagesize}
            pageSize={this.state.myTable1.pagesize}
            showTotal={(total, range) => this.showTotal(total, range)}
            onShowSizeChange={this.handleSizeChange.bind(this)}
            onChange={this.handlePageChange.bind(this)}
          />
        </Footer>
      </Layout>
      <Modal name='myWin1' title='除草记录详细信息' open={this.state.myWin1} width={480} forceRender centered maskClosable={false}
        cancelText='关闭' onCancel={() => { this.setState({ myWin1: false }) }}
        styles={{ position: 'relative', padding: 0, body: { overflowY: 'scroll', height: '340px', width: '450px', padding: 0, margin: 0 } }}
        closable keyboard={false}
        //bodyStyle={{overflowY: 'scroll', height:'500px', width:'450px', padding:0, margin:0 }} 
        footer={[<Button key='btnok' type='primary' htmltype='submit' disabled={this.state.addoredit == 'query'} onClick={this.handleSaveClick}>保存</Button>, <Button key='btnclose' type='primary' onClick={() => { this.setState({ myWin1: false }) }}>关闭</Button>]}>
        <div style={{ position: 'relative' }}>  {/* 添加一个层，否则文本框需要大于30px才能输入 */}
          <Form name="myForm1" ref={ref => this.myForm1 = ref} autoComplete="off" onFinish={this.onFinish} initialValues={this.state.row}
            style={{ padding: 0, margin: 0, position: 'absolute', height: '100%', width: '430px' }} >
            {/* 注意top值太小无法编辑控件，例如top={8 + rowheight * 0}不能编辑而top={8 + rowheight * 0} */}
            <AntdInputBox type='text' id='mowno' ref={ref => this.mowno = ref} label='记录编码' labelwidth='100' left='2' width='140' top={8 + rowheight * 0} />
            <AntdComboBox id='spotno' label='绿化点名称' labelwidth='100' left='2' width='300' top={2 + rowheight * 1} sqlprocedure='demo1702d' onChange={this.handleSpotChange} textfield='spotname' valuefield='spotno' />
            <AntdComboBox id='cleanerno' label='环卫工人名称' labelwidth='100' left='2' width='300' top={2 + rowheight * 2} sqlprocedure='demo1702c' onChange={this.handleSupplierChange} textfield='cleanername' valuefield='cleanerno' />


            <AntdInputBox type='date' id='mowdate' ref={ref => this.mowdate = ref} label='绿化日期' labelwidth='100' left='2' width='300' top={8 + rowheight * 3} />
            <AntdInputBox type='text' id='mowtime' ref={ref => this.mowtime = ref} label='绿化时间' labelwidth='100' left='2' width='300' top={8 + rowheight * 4} />
            <AntdInputBox type='text' id='mowlong' ref={ref => this.mowlong = ref} label='绿化用时' labelwidth='100' left='2' width='300' top={8 + rowheight * 5} />
            <AntdInputBox type='text' id='mowtools' ref={ref => this.mowtools = ref} label='绿化工具' labelwidth='100' left='2' width='300' top={8 + rowheight * 6} />
            <AntdComboBox id='cleanerno' label='环卫工人名称' labelwidth='100' left='2' width='300' top={2 + rowheight * 2} sqlprocedure='demo1702c' onChange={this.handleSupplierChange} textfield='cleanername' valuefield='cleanerno' />

            <AntdInputBox type='text' id='mowcondition' ref={ref => this.mowcondition = ref} label='植被状况' labelwidth='100' left='2' width='300' top={8 + rowheight * 7} />

          </Form>
        </div>
      </Modal>
      <MessageBox ref={ref => this.myDeleteModal = ref} onConfirm={(e) => this.handleDeleteRow(this.state.myTable1.row, this.state.myTable1.rowindex)} />
    </>)
  }
}
