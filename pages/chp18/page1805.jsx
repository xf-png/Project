import React, { Component } from 'react';
import * as echarts from 'echarts';
import { fileDownload, myDoFiles, myFileSize, backupDatabase, restoreDatabase, fileDownLoad, myNotice, myStr2JsonArray, reqdoTree, reqdoSQL, myPreventRightClick, myLocalTime } from '../../api/functions';
import { findTreeNode, addTreeChildrenData, searchTreeNode } from '../../api/antdTrees';
import { MyFormComponent } from '../../api/antdFormMethod.js';
import { AntdCheckBox, BackupOutlined, AntdInputBox, ConfirmModal } from '../../api/antdClass.js'
import { UploadOutlined, ExportOutlined, ZoomOutOutlined, ZoomInOutlined, BlockOutlined, ReadOutlined, FileOutlined, TagOutlined, PaperClipOutlined, FullscreenOutlined, FullscreenExitOutlined, DownOutlined, UpOutlined, RightOutlined, RedoOutlined, FileAddOutlined, FileExcelOutlined, AuditOutlined, WindowsOutlined, FileUnknownOutlined, FormOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, SaveOutlined, PrinterOutlined } from '@ant-design/icons';
import { Drawer, Tooltip, Hint, Form, Button, Upload, Divider, Tree, Popconfirm, Dropdown, Tabs, Layout, Menu, Image, Select } from 'antd';
import { AntdTable } from '../../api/antdTable.js';
import { ResizableBox } from 'react-resizable';
import { saveAs } from 'file-saver';
import axios from 'axios';
//import { type } from '@testing-library/user-event/dist/type';
//import { ReactComponent as BackupOutlined } from '../../icons/backup.svg';
const { Header, Content, Footer, Sider } = Layout;
//https://ant.design/components/overview-cn/ 

const sys = { ...React.sys };
const rowheight = 55;
const spanStyle = {
    position: 'relative',
    //border:'1px solid #95B8E7',
    border: '1px solid #C3C3C3',
    fontSize: 13,
    display: 'inline-block',
    height: 250,
    width: 300,
    padding: '2px 2px 4px 8px',
    margin: '8px 4px 8px 8px'
}

export default class Page1805 extends MyFormComponent {
    constructor(props) {
        super(props);
        this.state = {
            myWin1Visible: false,
            myWin2Visible: false,
            footerheight: 280,
            disabled: true,
            columns: [
                { dataIndex: 'backuptime', title: '历史备份时间', width: '120px', align: 'center', fixed: 'left' },
                { dataIndex: 'filename', title: '历史备份文件名', width: '250px', ellipsis: true },
                { dataIndex: 'username', title: '备份创建人', width: '90px', align: 'center' },
                { dataIndex: 'filesizedesc', title: '文件大小', width: '100px', align: 'center' },
                { dataIndex: 'note', title: '备份描述', width: '250px', ellipsis: true }
            ],
            rowindex: 0,   //当前页光标位置
            row: { filedesc: '绿化业务管理数据库' },  //当前选中的行
        }
    }

    componentDidMount = async () => {  //
        console.log(444, this.myTable1?.state.row)
        //this.setState({ row }
        //console.log(firstDayOfMonth, lastDayOfMonth, lastDayofOrderRequired);
        //this.setColumnRender();
        //初次定位订单
    }

    handleChangeClick = (e) => {
        let s = e.target.value.trim();
        this.setState({ disabled: s == '' });
    }

    handleSelectRow = async (row) => {
        this.setState({ row });
    }

    afterLoadData = () => {
        this.handleSelectRow(this.myTable1.state.row);
    }

    handleAddClick = async (row) => {  //ddddddddddddddelete
        this.setState({ myWin1Visible: true });
    }

    handleDownloadClick = async (row) => {  //ddddddddddddddelete
        this.setState({ myWin2Visible: true });
    }


    handleDownload = async (item) => {  //ssssssss
        //console.log(this.state.row);
        if (!this.state.row) return;
        let { filetitle, filetag } = this.state.row;
        let { filedesc, filename } = item;
        console.log(777, item, filename, filedesc, filetag, filetitle);
        if (!filedesc || filedesc == '') filedesc = '绿化管理数据库';
        let p = {};
        p.filepath = 'mybase\\backups\\' + filetag + '\\';
        p.sourcefilename = filename;
        p.targetfilename = filedesc + '_' + filetitle + '.sql';
        let msg = await fileDownload(p);
        if (msg != '') myNotice(msg, 'info');
    }


    handleBackupClick = async () => {
        //每个备份按照note和时间戳产生一个文件夹
        let formdata = this.getFormValues('myForm1');  //转换数据内容
        //console.log(9991, formdata.filepath,formdata.tableitems);
        //console.log(9992, formdata);        
        if (formdata.filetitle == '' || formdata.note == '') {
            myNotice('备份文件与标注不能为空', 'error');
            return;
        }
        if (formdata.tableitems.length == 0) formdata.tableitems = '';
        let rs = await backupDatabase(formdata);
        //console.log(9999, formdata.filepath, rs.filepath);
        let data = {};
        if (rs.error == '') {
            data.filetitle = formdata.filetitle;
            data.note = formdata.note;
            data.filesizedesc = myFileSize(rs.filesize);
            data.filename = rs.filename;
            data.filesize = rs.filesize;
            data.filetag = rs.filetag;
            data.backuptime = rs.backuptime; //myLocalTime().datetime;
            data.timeid = rs.timeid;
            data.filelist = rs.filelist;
            data.userid = sys.user.userid;
            data.username = sys.user.username;
            //data.filepath='';   //不是空值的话数据库中的数据会发生乱码，不知道原因
            data._action = 'add';
            //新增数据备份记录，如果note+filename+username不变时，只更新备份记录，不新增记录，但备份文件名称会更新;
            let p = {};
            p.data = [];
            p.data.push(data);
            p.sqlprocedure = 'demo1302b';
            //console.log(333,p.data)
            //console.log(333, JSON.stringify(p.data))
            rs = await reqdoSQL(p);
            //console.log(6666, rs.rows[0]);
            if (rs.rows[0].filetag != '') { //如果只是更新备份文件，其他信息不变，则删除原来的备份文件夹
                myDoFiles('delete', [{ filename: 'mybase/backups/' + rs.rows[0].filetag + '/' }]);
            }
            this.setState({ myWin1Visible: false }, () => {
                this.myTable1.setState({ pageno: 1, rowindex: 0 }, () => {
                    setTimeout(() => {
                        this.myTable1.loadTableData();
                        myNotice('数据库备份在服务器端创建成功!', '', 200)
                    });
                });
            });
        } else {
            myNotice('数据库备份在服务器端创建失败!' + rs.error, '', 200)
        }
        return;
    }


    handleDeleteRow = async (row) => {  //ddddddddddddddelete
        //调用函数实现删除,删除服务器端备份文件
        //console.log(991,row.realfiletitle, row.filetitle)
        let sourcefiles = [{ "filename": "mybase/backups/" + row.filename }];
        let rs = myDoFiles('delete', JSON.stringify(sourcefiles));
        return (await this.deleteTableRow(this.myTable1, 'myForm1', 'demo1302b'));
    }

    render() {
        let { row, footerheight } = this.state;
        let { filelist, filetag } = row;
        //console.log(110, filelist);
        filelist = myStr2JsonArray(filelist);
        //console.log(111, filelist);
        let x;
        // // if (document.getElementById('myFormFooter1') && document.getElementById('myFormFooter1')?.offsetHeight > 0) {
        // //     x = document.getElementById('myFormFooter1')?.offsetHeight + 141;
        // //     //console.log(1777, x, document.getElementById('myForm1')?.offsetHeight, document.getElementById('myTable1')?.offsetHeight);
        // // }
        // else x = footerheight + 80;
        x = 141;
        let srcollheight = `calc(100vh - ${x}px)`;
        //console.log(1778, x);
        let imagepath = require('../../icons/mysql64.png');
        return (
            <div style={{ height: '100%', overflow: 'hidden' }}>
                <AntdTable id='myTable1' {...this.state.attr} ref={ref => this.myTable1 = ref} columns={this.state.columns}
                    rowbuttons='right' toolbar='-;add;-;delete;-;download;-;refresh;-;' rowselection='single'
                    paginationAlign='center' showQuickJumper={true}
                    addText='创建备份' deleteText='删除备份' downloadText='下载备份'
                    scroll={{ x: '90%', y: srcollheight }}
                    contextmenu='' rownumber modal={false}
                    rowkeyfield='rowid' keyfield='filename' keytitle='数据库备份' sqlprocedure='demo1302a'
                    onSelectRow={this.handleSelectRow}
                    afterLoadData={this.afterLoadData}
                    onDeleteRow={(row, index) => this.handleDeleteRow(row)}
                    onAddRow={(row, index) => this.handleAddClick()}
                    onDoubleClick={(row, index) => this.handleDownloadClick(row, index)}
                    onDownload={(row, index) => this.handleDownloadClick(row, index)}
                />
                <Drawer name='myWin1' title='&nbsp;创建服务器端的数据库备份' open={this.state.myWin1Visible} width={420} forceRender centered maskClosable={false} keyboard={false}
                    placement='right' size='small' onClose={() => { this.setState({ myWin1Visible: false }) }} style={{ position: 'relative', padding: 0, margin: 0 }} closable
                    styles={{ body: { padding: 0, margin: 0 }, header: { height: 45 } }}>
                    <div style={{ padding: 0, marginTop: 0, position: 'relative', height: '100%', overflow: 'auto' }} >
                        <Form id="myForm1" ref={ref => this.myForm1 = ref} autoComplete="off" style={{ height: '100%', width: '100%', overflow: 'auto' }} >
                            <AntdInputBox type='text' id='note' label='备份描述' labelwidth='72' left='20' width='300' top={22 + rowheight * 0} ref={ref => this.note = ref} />
                            <AntdInputBox type='text' id='filetitle' label='文件名称' labelwidth='72' left='20' width='300' top={22 + rowheight * 1} ref={ref => this.filetitle = ref} onChange={this.handleChangeClick} />
                            <div style={{ position: 'absolute', top: 22 + rowheight * 2, left: 24 }}>
                                <Button
                                    type="primary" style={{ width: 145 }}
                                    onClick={this.handleBackupClick}
                                    disabled={this.state.disabled}
                                    icon={<BackupOutlined />}
                                >
                                    开始备份数据库
                                </Button>
                            </div>
                            <AntdCheckBox id="tableitems" label="" items="同时创建单个数据表备份" labelwidth='0' left='125' top={22 + rowheight * 2} ref={ref => this.tableitems = ref} />
                        </Form>
                    </div>
                </Drawer>

                <Drawer name='myWin2' title='&nbsp;下载服务器端的数据库备份到本地' open={this.state.myWin2Visible} width={440} forceRender centered maskClosable={false} keyboard={true}
                    placement='right' size='small' onClose={() => { this.setState({ myWin2Visible: false }) }} style={{ position: 'relative', padding: 0, margin: 0 }} closable
                    styles={{ body: { padding: 0, margin: 0 }, header: { height: 45 } }}>
                    <div style={{ padding: 0, marginTop: 0, paddingLeft: 12, position: 'relative', height: '100%', overflow: 'auto' }} >
                        <Divider style={{ height: 8 }} orientation="center" plain><b>点击文件下载完整的备份</b></Divider>
                        <div style={{ width: '100%', padding: 0, margin: 0, position: 'relative', overflow: 'hidden' }} >
                            <Tooltip title="下载完整备份到本地" placement="topLeft">
                                <a onClick={() => this.handleDownload(row)} className='linkStyle'>
                                    <img id="image1" height={32} src={imagepath} style={{ marginTop: 0, marginLeft: 0 }} />
                                    {row && <div className="textdiv" style={{ margin: '-30px 0px 0px 60px' }}><font face="times new Roman">{row.filename}</font></div>}
                                    {row && <div className="textdiv" style={{ margin: '5px 0px 0px 60px' }}>{row.note}</div>}
                                </a>
                            </Tooltip>
                        </div>
                        {filelist?.length > 0 && <Divider style={{ height: 8 }} orientation="center" plain><b>点击下载独立的数据表备份</b></Divider>}
                        <ol style={{ fontFamily: 'times new roman' }}>
                            {filelist?.map((item, index) => <li key={'filelist_' + index} style={{ margin: '6px 0px 0px -10px' }}><a onClick={() => this.handleDownload(item)} className='linkStyle'>{item.filedesc}(<font face="times new Roman">{item.filename}</font>)</a></li>)}
                        </ol>
                    </div>
                </Drawer>
            </div>
        )
    }
}

// 如何将屏幕垂直分成左右两部分，中间用resizable插件分隔，可以左右拉伸，一开始右边的宽度时固定的，左边自动根据屏幕大小自适应