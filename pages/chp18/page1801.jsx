import React, { Component } from 'react'
import { Tabs, Dropdown, Popconfirm, Drawer, Button, Pagination, message, Watermark, Switch, Form, Table, Layout, Radio, Modal } from 'antd'
import { myLocalTime, reqdoSQL, reqdoTree, myNotice } from '../../api/functions'
import { AntdInputBox, AntdCheckBox, AntdComboBox, AntdRadio, AntdFileUpload, AntdHiddenField, AntdImage, MessageBox, AntdModal } from '../../api/antdClass.js';
import { AntdTree, AntdCascader } from '../../api/antdTrees.js';
import { MyFormComponent } from '../../api/antdFormMethod.js';
import { FullscreenOutlined, FullscreenExitOutlined, DownOutlined, UpOutlined, RightOutlined, RedoOutlined, FileAddOutlined, FileExcelOutlined, AuditOutlined, WindowsOutlined, FileUnknownOutlined, FormOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, SaveOutlined, PrinterOutlined } from '@ant-design/icons';
//import { Resizable } from 'rc-easyui'; 
import { ResizableBox } from 'react-resizable';

const { Header, Content, Footer, Sider } = Layout;
const sys = { ...React.sys };

//https://ant.design/components/overview-cn/
//https://procomponents.ant.design/components
//https://marketplace.visualstudio.com/items?itemName=WhenSunset.chatgpt-china
//网格+选项卡
const rowheight = 42;

export default class Page902 extends MyFormComponent {
  state = {
    myTable1: {
      data: [],  //某一页数据
      total: 0,  //行总数
      pageno: 1, //当前选中页
      pagesize: 20,  //每页显示行数
      rowindex: 0,   //当前页光标位置
      keyfield: 'monitorno',   //主键
      sortfield: '',   //排序列，只有一列
      row: {},  //当前选中的行
      selectedkeys: [],  //antd中选中打钩的行
    },
    tabcount: 2,   //tabs的选项卡个数
    activetabkey: 'myTab1',
    addoredit: 'update',
    record: {},    //选中的行，返回给父类。网格填充到表单修改之前的数据，旧数据
    formcollapsed: false,
    footerheight: 270,
  }

  componentDidMount = async () => {
    window.addEventListener('resize', this.handleWindowResize);
    this.loadTableData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);

  }

  loadTableData = async () => { //加载每页数据
    let { pageno, pagesize, selectedkeys, rowindex } = this.state.myTable1
    let p = {}
    p.sqlprocedure = 'demo1801a'
    p.pageno = pageno;
    p.pagesize = pagesize;
    p.keyvalue = '';
    p.filter = this.filtertext.state.value.trim();
    p.sortfield = this.state.sortfield;
    const rs = await reqdoSQL(p)
    //计算total  可以没有记录total值
    let total = 0;
    if (rs.rows && rs.rows.length > 0 && rs.rows[0]._total) total = parseInt(rs.rows[0]._total);
    else if (rs.rows) total = rs.rows.length;
    if (rowindex < 0 || rowindex >= rs.rows.length) rowindex = 0;
    if (rowindex < rs.rows.length) selectedkeys = [rs.rows[rowindex][this.state.myTable1.keyfield]];
    else selectedkeys = [];
    //console.log(991,selectedkeys);
    //激活选项卡中的控件，可以用forceRender:true替代了
    /*
    let activetabkey=this.state.activetabkey;
    for (let i=1; i<=this.state.tabcount; i++){
      //激活其它选项卡
      if (this.state.activetabkey!='myTab'+i) {
        this.setState({activetabkey:'myTab'+i}, () => { 
          setTimeout(() => {        
             this[this.state.myTable1.keyfield]?.setState({editable: false});
          })
        });
      }
    }
    this.setState({activetabkey: activetabkey}, () => { 
      setTimeout(() => {        
        this[this.state.myTable1.keyfield]?.setState({editable: false});
      })
    });
    //激活选项卡结束
    */
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

  handleTabChange = (activetabkey) => {
    this.setState({ activetabkey });
  }

  selectionChange = (selectedkeys, rows) => {
    //checkbox选中的项,单选功能的实现
    let table = { ...this.state.myTable1 }
    this.setState({ myTable1: { ...table, selectedkeys: selectedkeys, row: rows[0] } })
  }

  handleSelectRow = (row, index) => {
    if (!row || index < 0) return;
    //加载表单数据
    let table = { ...this.state.myTable1 }
    let record = this.setFormValues('myForm1', row);
    this.setState({ addoredit: 'update', record: record, myTable1: { ...table, row: row, rowindex: index, selectedkeys: [row[this.state.myTable1.keyfield]] } }, () => {
      setTimeout(() => {
        //只有点击过选项卡之后，才有表单控件，才可以赋值
        //this.setFormValues('myForm1', row);
        this[this.state.myTable1.keyfield]?.setState({ editable: false });
      })
    });
  }

  handleEditClick = (e) => {
    let row = this.state.myTable1.row;
    this.setState({ addoredit: 'update' }, () => {
      setTimeout(() => {
        //this.setFormValues('myForm1', row);
        //this[this.state.myTable1.keyfield]?.setState({editable: false});
      })
    });
  }

  handleAddClick = (e) => {  //aaaaaaaa
    this.setState({ myWin1: true, addoredit: 'add' }, () => {
      this.resetFormValues('myForm1');
      this[this.state.myTable1.keyfield]?.setState({ editable: true });
    });
  }

  handleDeleteClick = async (e) => {
    this.myDeleteModal.setState({ visible: true, description: '是否确定删除【' + this.state.myTable1.row[this.state.myTable1.keyfield] + '】这个监测器？' });
    return;
  }

  handleDeleteRow = async (e) => {  //ddddddddddddddelete
    let table = { ...this.state.myTable1 }
    let { row, pageno, pagesize, total, rowindex, keyfield } = table;
    //console.log(999,row, rowindex, keyfield)
    let xdata = { ...row };
    //xdata[keyfield] = row[keyfield];
    xdata._action = 'delete';
    xdata._reloadrow = 0;
    let p = {};
    p.sqlprocedure = 'demo901a'; // "demo502c";
    p.data = [];
    p.data.push(xdata);
    //console.log(JSON.stringify(p.data));
    //执行数据库删除
    let rs = await reqdoSQL(p); //调用函数，执行存储过程保存数据。必须加await 
    //删除服务器端上传的文件
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
    //message.info('确认删除'+row.productname+'这个监测器？');
  }

  handleSaveClick = async (e) => {  //sssssssssssave
    //保存数据
    let table = { ...this.state.myTable1 }
    let { pageno, pagesize, total, rowindex, row, keyfield } = table;
    let { record, addoredit } = this.state;
    let data = this.getFormValues('myForm1');  //转换数据内容
    //if (data._action=='add') data[this.state.myTable1.keyfield]=0;  //主键值自动生成
    //console.log(664, data);
    data._action = addoredit;
    data._reloadrow = 1;
    data._treeflag = 0;
    let p = {};
    p.sqlprocedure = 'demo901a';  //"demo504a";
    p.data = [];
    p.data.push(data);
    if (addoredit != 'add') {
      p.data.push(record);  //旧的没有修改过的数据
    }
    console.log(110, p.data);
    //console.log(111,JSON.stringify(p.data));
    let rs = await reqdoSQL(p); //调用函数，执行存储过程保存数据。必须加await
    if (rs.rows.length > 0 && (rs.rows[0]._error == undefined || rs.rows[0]._error == '')) { //数据验证
      //data[keyfield]=rs.rows[0][keyfield];  //提取主键列
      data = Object.assign({}, data, rs.rows[0]);  //合并对象属性，主键可能不止一个列
      let data0 = this.renameUploadedFiles('myForm1', rs.rows[0]);
      console.log(7777, Object.keys(data0), data0);
      if (Object.keys(data0).length > 0){
        data = Object.assign({}, data, data0);  //合并对象属性
        data._action = 'update';
        data._reloadrow = 1;
        data._treeflag = 0;
        let p = {};
        p.sqlprocedure = 'demo901a';  //"demo504a";;
        p.data = [];
        p.data.push(data);  //p.data只有一行时，where修改条件取第一行的值
        //console.log(775, JSON.stringify(p.data));
        let rs1 = await reqdoSQL(p);
      }
      //新增记录或修改记录后可能排序次序发生变化，重新进行分页，计算行号定位到新行的这一页这一行
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
          myNotice('监测器记录已经保存，请刷新数据!', '', 200)
        })
      });
    } else {
      myNotice('监测器编码重复，记录保存失败！', 'error');  //
    }
  }

  handleMyMenu1Click = (e) => {
    //右键菜单程序
    //console.log(444,e);
    let key = e.key;
    if (key == 'menu-delete') this.handleDeleteClick(e);
    else if (key == 'menu-add') this.handleAddClick(e);
    else if (key == 'menu-edit') this.handleEditClick(e);
    else if (key == 'menu-save') this.handleSaveClick(e);
  }

  handleProductChange = (e) => {
    console.log(111111, e, this.monitorno.state.value)
  }

  handleCloseMyWin1 = (row) => {
    this.setState({ myWin1: false })
  }

  showTotal = (total, range) => {
    let { pageno, pagesize } = this.state.myTable1;
    let start = (pageno - 1) * pagesize + 1;
    let limit = Math.min(start + pagesize - 1, total);
    let pagecount = parseInt((total - 1) / pagesize) + 1;
    return `当前第${pageno}页（共${pagecount}页），第${start}~${limit}行（共${total}行）。`;
  }

  /*
  showCellText=(text,align)=>{
    return <div className='textdiv' style={{padding:0,textAlign:align}}>{text}</div>    
  }
  */
  handleContextMenu = (row, index, e) => {
    //右键设置，选中行
    this.handleSelectRow(row, index);
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

  handleRefresh = () => {  //rrrrrrrr 
    this.filtertext.setState({ value: '' });    //不会清空
    let table = { ...this.state.myTable1 }
    this.setState({ myTable1: { ...table, pageno: 1, rowindex: 0, selectedkeys: [] }, addoredit: 'update', activetabkey: 'myTab1' }, () => {
      setTimeout(() => {
        this.loadTableData();
      })
    });
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
    this.myForm1.setFieldValue('streetno', row.supplierid);
  }

  setformCollapsed = () => {
    if (!this.state.formcollapsed) {
      this.setState({ formcollapsed: !this.state.formcollapsed, footerheight: 1 })
    } else {
      this.setState({ formcollapsed: !this.state.formcollapsed, footerheight: 270 }, () => this.loadTableData())
    }
  }

  onFinish = (json) => { //提交时触发
    console.log(661, json);
  }

  handleResize = (event, { element, size }) => {
    //window.requestAnimationFrame(() => this.setState({ siderwidth: size.width }));
    this.setState({
      footerheight: size.height,
      //height: this.state.height, // Keep height fixed
    });
  };

  handleWindowResize = (e) => {
    //window.requestAnimationFrame(() => this.setState({ siderwidth: size.width }));
    this.setState({
      footerheight: this.state.footerheight,
    });
  };


  render() {
    const { data, pagesize, total, addoredit, pageno, footerheight, formcollapsed } = this.state;
    let x;  //计算myForm1的高度，在计算网格的滚动条高度
    //if (document.getElementById('myForm1')) x = document.getElementById('myForm1')?.offsetHeight + 142;
    if (formcollapsed) x = 142;
    else if (document.getElementById('myResizableBox1') && document.getElementById('myResizableBox1')?.offsetHeight > 0) x = document.getElementById('myResizableBox1')?.offsetHeight + 142;
    else x = footerheight + 142;
    let srcollheight = `calc(100vh - ${x}px)`;

    console.log(444, srcollheight, document.getElementById('myForm1')?.offsetHeight, document.getElementById('myResizableBox1')?.offsetHeight);
    const items1 = [{
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
      type: 'divider',
      key: 'menu15',
    }, {
      label: '保存',
      key: 'menu-save',
      icon: <SaveOutlined />
    }];

    const columns = [
 
      { dataIndex: 'monitorno', title: '监测器编码', width: '80px', align: 'center', fixed: 'left' },
      { dataIndex: 'streetname', title: '街道名称', width: '250px', align: 'center', ellipsis: true },
      { dataIndex: 'settime', title: '安装日期', width: '250px', align: 'center', ellipsis: true },
      

     ]

    return (<>
      <Layout style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
        <Header style={{ padding: 0, paddingLeft: 4, height: 35, lineHeight: '30px', backgroundColor: '#E0ECFF', borderBottom: '1px solid #95B8E7', overflow: 'hidden' }}>
          <Form name='filterbar'>
            <div style={{ marginTop: 1, paddingTop: 1, position: 'relative' }}>
              <Button type="text" icon={<PlusCircleOutlined />} style={{ padding: 0, width: 72, height: 30 }} onClick={this.handleAddClick.bind(this)}>新增</Button>
              <Button type="text" icon={<DeleteOutlined />} style={{ padding: 0, width: 72, height: 30 }} onClick={this.handleDeleteClick.bind(this)}>删除</Button>
              <Button type="text" icon={<SaveOutlined />} style={{ padding: 0, width: 72, height: 30 }} onClick={this.handleSaveClick.bind(this)}>保存</Button>
              <Button type="text" icon={<RedoOutlined />} style={{ padding: 0, width: 72, height: 30 }} onClick={this.handleRefresh.bind(this)}>刷新</Button>
            </div>
            <AntdInputBox type='search' id='filtertext' label='快速过滤' labelwidth='72' top='2' left='400' height='30' width='350' ref={ref => this.filtertext = ref} onSearch={this.handleSearchFilter.bind(this)} />
          </Form>
        </Header>

        <Content style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ height: '100%', flex: '1 1 auto', backgroundColor: 'lightblue', borderBottom: '0px solid #95B8E7' }}>
            <Layout style={{ height: '100%' }}>
              <Dropdown menu={{ items: items1, onClick: this.handleMyMenu1Click.bind(this) }} overlayStyle={{ width: 160 }} trigger={['contextMenu']}>
                <Content style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Table id='myTable1' ref={ref => this.myTable1 = ref} sticky={true} size='small'
                    rowKey={this.state.myTable1.keyfield} bordered={true}
                    rowClassName="tableRowStyle"
                    scroll={{ x: '90%', y: srcollheight }}
                    style={{ overflow: 'hidden', position: 'absolute' }}  //不能写height:'100%'否则分页栏不能编辑！！important
                    columns={columns}
                    dataSource={this.state.myTable1.data}
                    pagination={false}
                    onChange={this.handleSorter}
                    rowSelection={{
                      type: 'radio',
                      selectedRowKeys: this.state.myTable1.selectedkeys,
                      onChange: (selectedRowKeys, selectedRows) => { this.selectionChange(selectedRowKeys, selectedRows) }
                    }}
                    onRow={(record, index) => {
                      return {
                        onClick: (e) => { this.handleSelectRow(record, index) }, // 点击行
                        onDoubleClick: (e) => { this.handleEditClick(record, index) },
                        onContextMenu: (e) => { this.handleContextMenu(record, index, e) }
                      };
                    }}
                  />
                </Content>
              </Dropdown>
              <Footer style={{ padding: '5px 16px 0px 16px', height: 36, border: '1px solid #95B8E7', borderLeft: '0px', background: '#efefef' }}>
                <div>
                  <span style={{ float: 'left', marginTop: 2, marginRight: 24 }}>
                    {React.createElement(this.state.formcollapsed ? FullscreenOutlined : FullscreenExitOutlined, { className: 'trigger', onClick: () => this.setformCollapsed() })}
                  </span>
                  <span style={{ float: 'right', textAlign: 'center', marginRight: 8 }}>
                    <Pagination size="small" total={this.state.myTable1.total}
                      showSizeChanger pageSizeOptions={['10', '20', '50', '100']} showQuickJumper className='paginationStyle'
                      current={this.state.myTable1.pageno} defaultPageSize={this.state.myTable1.pagesize}
                      pageSize={this.state.myTable1.pagesize}
                      showTotal={(total, range) => this.showTotal(total, range)}
                      onShowSizeChange={this.handleSizeChange.bind(this)}
                      onChange={this.handlePageChange.bind(this)}
                    />
                  </span>
                </div>
              </Footer>
            </Layout>
          </div>

          <ResizableBox id="myResizableBox1" height={footerheight} width={Infinity} axis="y" style={{ display: this.state.formcollapsed ? 'none' : 'block' }}
            resizeHandles={['n']}
            onResize={this.handleResize}
            minConstraints={[Infinity, 20]}
            maxConstraints={[Infinity, 800]}
            // style={{ backgroundColor: 'lightgrey', cursor: 'row-resize' }}
            handle={
              <span style={{ height: '8px', cursor: 'row-resize', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }} />
            }
          >
            <div style={{ marginTop: 4, height: '100%', borderTop: '1px solid #95B8E7' }}>
              {/* display: this.state.formcollapsed ? 'none' : 'block', */}
              <Dropdown menu={{ items: items1, onClick: this.handleMyMenu1Click.bind(this) }} overlayStyle={{ width: 160 }} trigger={['contextMenu']}>
                <Form id="myForm1" name="myForm1" ref={ref => this.myForm1 = ref} autoComplete="off"
                  style={{ position: 'relative', height: '100%', overflow: 'hidden' }} >
                  <Tabs id="myTab" activeKey={this.state.activetabkey} size="small" tabBarGutter={24}
                    onChange={this.handleTabChange.bind(this)}
                    style={{ marginLeft: 16, padding: 0, paddingRight: 20, height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}
                    items={[
                      {
                        label: '基本信息', key: 'myTab1', forceRender: true, children:
                          <div style={{ padding: 0, margin: 0, position: 'relative', height: '100%', overflow: 'auto' }} >
                            <AntdInputBox type='text' id='monitorno' label='监测器编码' labelwidth='82' left='2' width='140' top={2 + rowheight * 0} ref={ref => this.monitorno = ref} />
                            <AntdComboBox id='streetno' label='街道名称' labelwidth='82' left='237' width='300' top={2 + rowheight * 0} sqlprocedure='demo1801c' onChange={this.handleSupplierChange} textfield='streetname' valuefield='streetno' />
                            <AntdInputBox type='date' id='settime' label='安装日期' labelwidth='82' left='2' width='140' top={2 + rowheight * 1} ref={ref => this.settime = ref} />

                          </div>
                      },
                      {
                        label: '上传图片', key: 'myTab2', forceRender: true, children:
                          <div style={{ padding: 0, margin: 0, position: 'relative', height: '100%', overflow: 'auto' }} >
                            <AntdFileUpload id='photopath' label='图片预览' labelwidth='82' left='2' width='90%' top={2 + rowheight * 0} ref={ref => this.photopath = ref}
                              datatype='json' targetpath='mybase/resources/' type='image' 
                              fieldNames={{ filename: 'filename', filetitle: 'title', filesize: 'size' }} filetag='`p${monitorno}_`' timeStamp={true} 
                              maxCount='5' />
                          </div>
                      },
                    ]}
                  />
                  <AntdHiddenField id='supplieridx' />
                  <AntdHiddenField id='categoryid' />
                </Form>
              </Dropdown>
            </div>
          </ResizableBox>
        </Content>
      </Layout>
      <MessageBox ref={ref => this.myDeleteModal = ref} onConfirm={this.handleDeleteRow.bind(this)} />
    </>)
  }
}
