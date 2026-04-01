//0.导入路由组件
//import { Tooltip, FloatButton, Tree, Dropdown, Popconfirm, Drawer, Button, Pagination, message, Watermark, Switch, Form, Table, Layout, Radio, Modal } from 'antd'
import React, { Component } from 'react'
import { myNotice, myDoFiles, myLocalTime, reqdoSQL, reqdoTree } from '../../api/functions';
import { focusTreeNode, AntdTree, AntdCascader, scrollTreeNode, findTreeNode } from '../../api/antdTrees';
import { MyFormComponent } from '../../api/antdFormMethod.js';
import { DownOutlined, PaperClipOutlined, RedoOutlined, FileAddOutlined, FileExcelOutlined, AuditOutlined, WindowsOutlined, FileUnknownOutlined, FormOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, SaveOutlined, PrinterOutlined } from '@ant-design/icons';
import { Tabs, Tooltip, Dropdown, Popconfirm, Drawer, Button, Pagination, message, Watermark, Switch, Form, Table, Layout, Radio, Modal } from 'antd'
import { AntdInputBox, AntdCheckBox, AntdComboBox, AntdRadio, AntdFileUpload, AntdHiddenField, MessageBox } from '../../api/antdClass.js';
import { AntdTable } from '../../api/antdTable.js';
import { ResizableBox, Resizable } from 'react-resizable';

const { Header, Content, Footer, Sider } = Layout;
const sys = { ...React.sys };
const rowheight = 42;
const layoutStyle = {
  height: '100%',
  width: '100%',
  position: 'relative',
  padding: 0,
  margin: 0,
  border: '0px solid #95B8E7',
  overflow: 'hidden'
};

const resizeHandle = {
  position: 'absolute',
  top: '0',
  right: '-3px', /* 使得把手稍微突出以便于拖动 */
  bottom: '0',
  width: '4px', /* 把手宽度 */
  cursor: 'ew-resize',
  backgroundColor: 'rgb(255,236,255)',
  zIndex: '10' /* 确保把手在最前面 */,
  borderRight: '1px solid ' + sys.colors.border,
  borderLeft: '1px solid ' + sys.colors.border
}

export default class Page1602 extends MyFormComponent {
  state = {
    myTable1: {
      rowindex: 0,   //当前页光标位置
      keyfield: 'salvageno',   //主键
      lastrow: {}, //选中的行，返回给父类。网格填充到表单修改之前的数据，旧数据
      treefield: 'waterno',  //表格中树节点列
      columns: [
        { dataIndex: 'cleanername', title: '环卫工人姓名', width: '120px',align: 'center', fixed: 'left', ellipsis: true },
        { dataIndex: 'salvagestime', title: '打捞时间', width: '200px', align: 'center', ellipsis: true },

        { dataIndex: 'tool', title: '打捞工具', width: '100px', align: 'center' },
        { dataIndex: 'sstate', title: '完成状态', width: '90px' , align: 'center',},
        { dataIndex: 'waterno', title: '水域编号', width: '200px', align: 'center' },
        { dataIndex: 'watername', title: '水域名称', width: '130px', ellipsis: true }
      ],
    },
    myTree1: {
      keyfield: 'waterno',
      node: {},  //当前myTree1树中选中的结点
    },
    resizing: false,
    supplierdata: [],
    addoredit: 'update',
    record: {},    //选中的行，返回给父类。网格填充到表单修改之前的数据，旧数据
    myWin1: false,    //子窗体modal初始时为关闭状态
    activetabkey: 'myTab1',
    splitSize: { width: 250 },
  }

  componentDidMount = async () => {
    let node = {};
    node.key = '_root';
    node[this.state.myTable1.treefield] = '';  //网格的存储过程中使用
    this.handleSelectNode(node);
  }

  afterLoadData = () => {
    //直接放在componentDidMount中data值为空
    let { data, rowindex, selectedkeys } = this.myTable1.state;
    //this.handleSelectRow(data[rowindex], rowindex);
    this.myTable1.handleSelectRow(data[rowindex], rowindex);
  }

  handleSelectNode = async (node) => { //选中树节点事件
    //console.log(1188, node)
    this.myTable1?.setState({ pageno: 1, attr: { ...this.myTable1.state.attr, waterno: node[this.state.myTable1.treefield] || '' } }, () => {
      setTimeout(() => {  //建议加
        let d = this.myTable1?.loadTableData();
      });
    });
  }

  // handleSelectRow = (row, index) => {
  //   //if (!row) row = this.myTable1.state.row;
  //   if (!row) return;
  //   //let lastrow = this.setFormValues('myForm1', row);  //放在这里第一次点击上面的“修改”按钮不会触发
  //   this.setState({ row });
  // }

  handleDoubleClick = (row, index) => {
    this.setState({ myWin1: true, addoredit: 'query', row }, () => {
      setTimeout(() => {
        let lastrow = this.setFormValues('myForm1', row);  //赋值到表单后同时返回旧值对象，数据格式有变化，如date，不能写last=row
        this.setFormFields('myForm1', 'readOnly', true);
      })
    });
  }

  handleEditRow = (row) => { //eeeeeeee    
    //console.log(777,this.myTable1.state.row,this.myTable1.state.data,this.myTable1.state.rowindex,)
    if (!row) row = this.myTable1.state.row;
    this.setState({ myWin1: true, addoredit: 'update', row }, () => {
      setTimeout(() => {
        let lastrow = this.setFormValues('myForm1', row);  //放在这里第一次点击上面的“修改”按钮不会触发
        this.setFormFields('myForm1', 'readOnly', false);
        this[this.myTable1.state.keyfield].setState({ readOnly: true });
      })
    });
  }

  handleAddRow = () => {  //aaaaaaaa
    this.setState({ myWin1: true, addoredit: 'add' }, () => {
      setTimeout(() => {  //必须加，否则this.myTable1为空
        this.resetFormValues('myForm1');
        this[this.myTable1.state.keyfield].setState({ readOnly: false });
      });
    });
  }

  handleDeleteRow = async () => {  //ddddddddddddddelete
    //调用函数实现删除
    return (await this.deleteTableRow(this.myTable1, 'myForm1', 'demo1602a'));
  }

  handleSaveRow = async () => {  //ssssssssssssss
    //将表单数据保存到数据库,demo1101c存储过程返回的数据中必须有key列值
    let rs = await this.saveTableRow(this.myTable1, 'myForm1', 'demo1602b');
    let { node, loadstyle, root } = this.myTree1.state;
    let data = [...this.myTree1.state.data];
    let { pagesize, pageno, rowindex } = this.myTable1.state;
    let keys = [];
    if (rs && rs.error == '' && rs.rows.length > 0) {
      //存储过程中需要返回商品的类别、祖先节点和在同类中的序号rowno
      let row = rs.rows[0];
      let key = row[this.state.myTable1.treefield];  //商品表中与myTree1的树节点key值对应的waterno列的值
      //计算商品在同类中的行号与页码
      let rowno = row.rowno;
      pageno = Math.floor((rowno - 1) / pagesize) + 1;
      rowindex = rowno - (pageno - 1) * pagesize - 1;
      //逐级展开树节点
      let expandedKeys = [...this.myTree1.AntdTree.state.expandedKeys];  //如果原来展开的结点依然保持展开状态
      keys = row.ancestor.split('#');
      let node = await focusTreeNode(this.myTree1, row, true);
      //加载表格数据
      this.myTable1.setState({ pageno, rowindex, attr: { ...this.myTable1.state.attr, waterno: node[this.state.myTable1.treefield] } }, () => {
        setTimeout(() => {  //必须加，否则this.myTable1为空
          //console.log(111999, node.waterno, this.myTable1)
          //this.myTable1?.loadTableData();
          this.handleSelectNode(node);
        })
      });
    }
    this.setState({ addoredit: 'update', myWin1: false });
  }

  handleProductChange = (e) => {
    console.log(111111, e, this.productid.state.value)
  }

  handleRefresh = () => {

  }

  handleCategoryChange = (value, row) => {
    if (value?.length > 0) {
      this.myForm1.setFieldValue('waterno', value[0]);
      this.myForm1.setFieldValue('watername', row[0].watername);
    }
  }

  handleSupplierChange = (value, row) => {
    //console.log(value,row)
    this.myForm1.setFieldValue('cleanerno', row.cleanerno);
  }
 

  render() {
    let { columns } = this.state.myTable1;
    let siderwidth = this.state.splitSize.width;
    //console.log(99, columns);
    return (<>
      <Layout style={{ height: '100%',  width: '100%',  position: 'relative',  padding: 0,  margin: 0,  border: '0px solid #95B8E7', overflow: 'hidden'}} >
        <Resizable width={siderwidth} minConstraints={[200, Infinity]} maxConstraints={[500, Infinity]} axis="x"
          onResize={this.handleResize}  //定义在antdFormMethod中
          handle={sys.resizeVHandle}  //定义在系统变量中
        >
          <Sider theme='light' width={siderwidth} style={{ height: '100%', position: 'relative', marginLeft: 0, padding: '4px 6px 0px 6px', borderRight: '1px solid #95B8E7' }}>
            <AntdTree ref={ref => this.myTree1 = ref} style={{ overflow: 'hidden' }}
              icon={<PaperClipOutlined />} blockNode={true}
              //switcherIcon={<DownOutlined /> }
              onSelectNode={(key, e) => this.handleSelectNode(e.node)}  /*自定义属性*/
              sqlprocedure="demo1602c" filterprocedure="demo1602d" loadstyle="expand"
              //sqlprocedure="demo803a" filterprocedure="demo804e" loadstyle="full"
              root="全部水域打捞信息" filter='truex' />
          </Sider>
        </Resizable>
        <Content style={{ width: '100%', height: '100%', position: 'relative', marginLeft: 3, borderLeft: '1px solid #95B8E7', overflow: 'auto' }}>
          <AntdTable {...this.state.attr} ref={ref => this.myTable1 = ref} columns={columns} pagesize="20"
            rowbuttons='right' toolbar='-;add;-;edit;-;delete;-;export;-;refresh;-;filter' rowselection='multiple'
            contextmenu='add;edit;delete;-;save;refresh' rownumber
            waterno='' //{this.state.myTree1.node[this.state.myTable1.treefield]}
            keyfield='salvageno' keytitle='商品' sqlprocedure='demo1602e' updateprocedure="demo1602a"
            afterLoadData={this.afterLoadData.bind(this)}
            //onSelectRow={(row, index) => this.handleSelectRow(row, index)}
            onAddRow={(row, index) => this.handleAddRow()}
            onEditRow={(row, index) => this.handleEditRow(row)}
            onDeleteRow={(row, index) => this.handleDeleteRow()}
            onSaveRow={(row, index) => this.handleSaveRow()}
            onDoubleClick={(row, index) => this.handleDoubleClick(row, index)}
          />
        </Content>
      </Layout>
      <Modal name='myWin1' title='打捞记录详细信息' open={this.state.myWin1} width={465} forceRender centered maskClosable={false}
        cancelText='关闭' onCancel={() => { this.setState({ myWin1: false }) }}
        styles={{ position: 'relative', padding: 0, body: { overflowY: 'scroll', height: '450px', width: '430px', padding: 0, margin: 0 } }}
        closable keyboard={false}
        footer={[<Button key='btnok' type='primary' htmltype='submit' disabled={this.state.addoredit === 'query'}
          onClick={this.handleSaveRow}>保存</Button>, <Button key='btnclose' type='primary' onClick={() => { this.setState({ myWin1: false }) }}>关闭</Button>]}>
        <Form name="myForm1" ref={ref => this.myForm1 = ref} autoComplete="off" style={{ padding: 0, margin: 0, position: 'relative', height: '100%', overflow: 'hidden' }} >
          <Tabs id="myTab" activeKey={this.state.activetabkey} size="small" tabBarGutter={24}
            style={{ margin: 0, marginLeft: 0, padding: 0, paddingRight: 20, height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}
            //onChange={this.handleTabChange.bind(this)}
            onChange={(activetabkey) => this.setState({ activetabkey: activetabkey })}
            items={[
              {
                label: '基本信息', key: 'myTab1', forceRender: true, children:
                  <div style={{ padding: 0, margin: 0, position: 'relative', height: '100%', overflow: 'auto' }} >
                    <AntdComboBox id='cleanerno' label='环卫工人姓名' labelwidth='100' left='2' width='280' top={8 + rowheight * 0} sqlprocedure='demo1602i' onChange={this.handleSupplierChange} textfield='cleanername' valuefield='cleanerno' ref={ref => this.cleanerno = ref} />
                    <AntdInputBox type='text' id='salvagestime' label='打捞时间' labelwidth='100' left='2' width='280' top={8 + rowheight * 1} ref={ref => this.salvagetime = ref} />
                    <AntdInputBox type='text' id='tool' label='打捞工具' labelwidth='100' left='2' width='280' top={8 + rowheight * 2} ref={ref => this.englishname = ref} />
                    <AntdInputBox type='text' id='sstate' label='完成状态' labelwidth='100' left='2' width='280' top={8 + rowheight * 3} ref={ref => this.sstate = ref} />
                    <AntdCascader page={this} form='myForm1' id='waterno' label='所属类别' labelwidth='100' left='2' width='280' top={8 + rowheight * 4} ref={ref => this.waterno = ref} textfield='watername' valuefield='waterno' sqlprocedure='demo1602f' treestyle='full' onChange={this.handleCategoryChange.bind(this)} />
                    <AntdInputBox type='text' id='watername' label='水域名称' labelwidth='100' left='2' width='280' readOnly top={8 + rowheight * 5} ref={ref => this.watername = ref} />
                  </div>
              }, {
                label: '上传图片', key: 'myTab2', forceRender: true, children:
                  <div style={{ padding: 0, margin: 0, position: 'relative', height: '100%', overflow: 'auto' }} >
                    <AntdFileUpload id='photopath' label='图片预览' labelwidth='82' left='2' width='390' datatype='json' top={2 + rowheight * 0}
                      ref={ref => this.photopath = ref} targetpath='mybase/resources/'  type='image'
                      fieldNames={{filename:'filename', filetitle:'title'}} filetag='`${salvageno}_`' 
                      maxCount='5' />
                  </div>
              }
            ]}
          />
          <AntdHiddenField id='supplieridx' />
          <AntdHiddenField id='waterno' />
        </Form>
      </Modal>
      <MessageBox ref={ref => this.myDeleteModal = ref} onConfirm={this.handleDeleteRow.bind(this)} />
    </>);
  }
}
