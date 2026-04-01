/*
自定义antd组件，antdtable和antdtree、antdcascader除外
*/
import ajax from './ajax'
import React, { Component } from 'react';
import { useEffect, useRef, useImperativeHandle } from 'react';
import axios from "axios";
//import { Resizable } from 'react-resizable';
import { Resizable } from 'react-resizable';

import { Modal, Upload, notification, Form, Input, Select, InputNumber, Checkbox, Radio, DatePicker, Image, Button, ConfigProvider, Cascader, TreeSelect, Divider, QRCode, Rate } from 'antd'
import { FileSearchOutlined, DownloadOutlined, UploadOutlined, SearchOutlined, WindowsOutlined, FormOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, SaveOutlined, PrinterOutlined } from '@ant-design/icons';
import { fileDownload, myFileExtension, myParseAntFormItemProps, myParseTableColumns, myParseTags, myDoFiles, myLocalTime, reqdoTree, reqdoSQL, myStr2JsonArray, myStr2Json, myDatetoStr, myGetTextSize } from './functions.js'
import { MyFormComponent } from './antdFormMethod.js'
import { parseParams, parseData, parseSQLParams } from './antdParseProperty.js'
import { saveAs } from 'file-saver';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import { BlockOutlined, DownOutlined, UpOutlined, FileOutlined, TagOutlined, PaperClipOutlined } from '@ant-design/icons';
import { FloatButton, Tree, Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const sys = { ...React.sys };

export class AntdInputBox extends React.Component {
  constructor(props) { //构造函数  子组件，被调用，参数属性传过来
    super(props);
    let attr = parseParams(props);
    //console.log(555, attr.value)
    if (attr.width < 0) attr.width = 200;
    if (attr.antclass == 'browse') attr.antclass = 'text';
    this.state = {
      attr: attr,  //attr.id  attr.value
      id: attr.id,
      value: attr.value,
      antclass: attr.antclass,
      readOnly: attr.readOnly,
      disabled: attr.disabled,
      visible: attr.visible > 0 ? true : false,
    }
  }

  hideArrow = () => {
    return null; // 返回 null 来隐藏 spinner 箭头
  };

  handleBrowseClick = () => {
    let { id, onSearch, onBrowse } = this.state.attr;
    //console.log(222, id, xonsearch, onBrowse);
    onSearch?.();
  }

  handleDatepickerFocus = (e) => {
    if (e.target.tagName === 'INPUT') {  //选中值之后tagname变为div
      e.target.select();
    }
    this.state.attr.onFocus?.(e);
  }

  InputItem = ($this) => {
    //需要设置ref，在聚焦中使用这个ref，例如this.categoryname.myInputbox.focus()
    let { id, type, height, width, label, top, left, labelwidth, rules, showCount, resize, onChange, onSearch, onBrowse, onFocus, style, position, step } = $this.state.attr;
    let { value, readOnly, disabled, editable, visible } = $this.state;
    const token = 'some-token-value';
    const inputStyle = {
      backgroundColor: readOnly || disabled ? sys.colors.readonly : '',
      color: 'black', //input有效，datepicker无效，datepicker需要在style.css中设置,例如.ant-picker-disabled .ant-picker-input input{ color: black !important; }}
      width: width,
    };
    if (!isNaN(height)) inputStyle.height = height;
    //console.log('height=', $this.state.attr.style);
    const searchStyle = readOnly || disabled ? 'inputDisbledStyle' : '';
    //const customStyle = readOnly || disabled ? {backgroundColor: '#f5f5f5', color: 'black'} : {};
    //console.log(4444444, id, readOnly, type, onSearch)
    if (type === 'browse') {
      return (<div>
        <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }}>
          <Input {...this.state.attr} id={id} ref={ref => this.myInputbox = ref}
            onFocus={(e) => { e.target.select(); onFocus?.(e); }}
            readOnly={readOnly} disabled={disabled}
            className='textboxStyle'
            style={{ width: width - 32, backgroundColor: readOnly || disabled ? sys.colors.readonly : '' }}
            onChange={(e) => { this.setState({ value: e.target.value }); onChange?.(e) }}
          />
        </Form.Item>
        <Form.Item label='' name={id + '_button'} labelCol={{ style: { width: labelwidth + width } }} style={{ ...style, display: visible ? 'block' : 'none' }}>
          <Button icon={<SearchOutlined />} style={{ marginTop: -4, left: labelwidth + width - 32, height: 30, top: 2, width: 32 }}
            readOnly={readOnly} disabled={disabled || readOnly}
            onClick={this.handleBrowseClick}
          />
        </Form.Item>
      </div>
      )
    } if (type === 'search' || type === 'searchbox') {
      return (
        <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }} >
          <Input.Search  {...this.state.attr} id={id} ref={ref => this.myInputbox = ref}
            onFocus={(e) => { e.target.select(); onFocus?.(e); }}
            className={searchStyle}
            //style={{ width: width}}
            //style={customStyle}  //无效
            style={inputStyle} value={this.state.value} readOnly={readOnly} disabled={readOnly || disabled}
            onSearch={(e) => onSearch?.(e)}
            onChange={(e) => { this.setState({ value: e.target.value }); onChange?.(e) }}
            enterButton={this.state.attr.enterButton} size="medium" />
        </Form.Item>
      )
    } else if (type === 'text' || type === 'textbox') {
      //console.log(6666,id,readOnly)
      return (
        <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }} >
          <Input {...this.state.attr} id={id} ref={ref => this.myInputbox = ref}
            onFocus={(e) => { e.target.select(); onFocus?.(e); }}
            readOnly={readOnly} disabled={disabled}
            className='textboxStyle' style={inputStyle}
            //style={{ width: width, backgroundColor: readOnly || disabled ? sys.colors.readonly : '' }}            
            onChange={(e) => { this.setState({ value: e.target.value }); onChange?.(e) }}
          />
        </Form.Item>
      )
    } else if (type === 'password' || type === 'passwordbox') {
      return (
        <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }} >
          <Input.Password {...this.state.attr} id={id} ref={ref => this.myInputbox = ref}
            onFocus={(e) => { e.target.select(); onFocus?.(e); }}
            readOnly={readOnly} disabled={disabled}
            className='textboxStyle'
            //style={{ width: width, backgroundColor: readOnly || disabled ? sys.colors.readonly : '' }}
            style={inputStyle}
            onChange={(e) => { this.setState({ value: e.target.value }); onChange?.(e) }}
          />
        </Form.Item>
      )
    } else if (type === 'date' || type === 'datebox') {
      return (
        <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }} >
          <DatePicker {...this.state.attr} id={id} ref={ref => this.myDatepicker = ref}
            className='dateboxStyle'
            style={inputStyle}
            //onFocus={(e) => { e.target.select(); onFocus?.(e); }} 
            //onFocus={(e) => { this.myInput?.setSelectionRange(0, this.myInput.value?.length); onFocus?.(e); }} 
            onFocus={this.handleDatepickerFocus}
            disabled={readOnly || disabled}
            onChange={(value) => {
              this.setState({ value: value || new Date() }, () => {
                setTimeout(() => {
                  const input = this.myDatepicker;
                  if (input) {
                    input.focus();
                  }
                  onChange?.(value);
                });
              });

            }}
            format={sys.format} />
        </Form.Item>
      )
    } else if (type === 'number' || type === 'numberbox') {
      return (
        <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }} >
          <InputNumber
            controls={false} //去掉箭头
            keyboard
            id={id} ref={ref => this.myInputbox = ref}
            className={step ? 'spinnerboxStyle' : 'numberboxStyle'}
            {...this.state.attr} /*放在classname之后*/
            value={this.state.value}
            readOnly={readOnly} disabled={disabled}
            //style={{ width: width, backgroundColor: readOnly || disabled ? sys.colors.readonly : '' }}
            style={inputStyle}
            //formatter={this.hideArrow} parser={this.hideArrow}  //没有效果
            onFocus={(e) => { e.target.select(); onFocus?.(e); }}
            onChange={(value) => { this.setState({ value: value }); onChange?.(value) }}
          />
        </Form.Item>
      )
    } else if (type === 'textarea') {
      if (showCount === undefined) showCount = true;  //默认显示字数
      if (showCount) height -= 24;
      return (
        <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }} >
          <Input.TextArea {...this.state.attr} id={id} ref={ref => this.myInputbox = ref}
            onFocus={(e) => { e.target.select(); onFocus?.(e); }} readOnly={readOnly} disabled={disabled}
            //autoSize={{ minRows: 4, maxRows: 4 }} 
            onChange={(e) => { this.setState({ value: e.target.value }); onChange?.(e) }}
            showCount={showCount} style={{ resize: resize, height: height, width: width, marginBottom: 24 }} />
        </Form.Item>
      )
    }
  }
  render() {
    let { form, id, type, height, width, label, top, left, labelwidth, showCount, resize, onChange, onSearch, style, position } = this.state.attr;
    let { readOnly, disabled, value, visible } = this.state;
    let { rules } = this.props;
    if (!value || isNaN(value) || value === '') value = '0';
    //console.log(id, visible);
    /*
    return (<div>
        {type === 'search' && 
           <Form.Item label={label} name={id} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={style} >
              <Input.Search  {...this.state.attr} id={id} style={{ width: width }} ref={ref => this.myInput = ref} enterButton={this.state.attr.enterButton} size="medium" onSearch={(e) => onSearch?.(e)} onChange={(e) => onChange?.(e)} />
           </Form.Item>
        }
        {type === 'text' &&
            <Form.Item label={label} {...this.state.attr} name={id} className='labelStyle' labelCol={{ style: { width: labelwidth } }}  style={style} >
              <Input {...this.state.attr} id={id} style={{ width: width }} ref={ref => this.myInput = ref} onChange={(e) => onChange?.(e)} />
            </Form.Item>
        }
        {type === 'date' &&
            <Form.Item label={label} {...this.state.attr} name={id} className='labelStyle' labelCol={{ style: { width: labelwidth } }}  style={style} >
              <DatePicker  {...this.state.attr} id={id} style={{ width: width }} ref={ref => this.myInput = ref} format={sys.format} onChange={(e) => onChange?.(e)} />
            </Form.Item>
        }
        {type === 'textarea' &&
            <Form.Item label={label} {...this.state.attr} name={id} className='labelStyle' labelCol={{ style: { width: labelwidth } }}  style={style} >
              <Input.TextArea {...this.state.attr} id={id} style={{ resize:'none', height:height-24, width: width, marginBottom:24 }} ref={ref => this.myInput = ref}                   
               //autoSize={{ minRows: 4, maxRows: 4 }} 
                showCount
               onChange={(e) => onChange?.(e)} />
            </Form.Item>
        }
    </div>)
   */
    return (<>
      {/* <Form.Item label={label} name={id} rules={rules} className='labelStyle' labelCol={{ style: { width: labelwidth } }} style={{ ...style, display: visible ? 'block' : 'none' }} > */}
      {this.InputItem(this)}
      {/*</Form.Item> */}
    </>)
  }
}

export class AntdCheckBox extends MyFormComponent { //Component {  
  constructor(props) {
    super(props);
    let attr = { ...this.props };  //this.props不能添加属性e.g.antclass
    //console.log(171,attr)
    attr.antclass = 'checkbox';
    attr = parseParams(attr);
    if (attr.buttontype != 'button') attr.buttontype = 'default';
    attr = parseData(attr);
    if (!attr.checkalltext) attr.checkalltext = '全选';
    if (attr.maxcount === undefined || isNaN(attr.maxcount)) attr.maxcount = 0;
    else attr.maxcount = parseInt(attr.maxcount);
    if (attr.checkall !== undefined && attr.checkall === 'true') attr.checkall = true;
    else attr.checkall = false;
    if (attr.checkall) attr.maxcount = 0;  //有全选时不控制选项个数
    //console.log(181, this.props)
    this.state = {
      attr: attr,
      page: attr.page,
      form: attr.form,
      id: attr.id,
      value: [],
      data: attr.data,
      checkall: attr.checkall,
      antclass: attr.antclass,
      visible: attr.visible > 0 ? true : false,
      disabled: attr.disabled,
      readOnly: attr.readOnly,
      checkallflag: 0,
      checkallvalue: [],
    }
  }

  async componentDidMount() {
    /*
    let attr = this.state.attr;
    let {sqlprocedure, sqlparams} = attr;
    if (sqlprocedure !== undefined && sqlprocedure !== ''){      
      let p={};
      if (sqlparams && typeof sqlparams =='object'){
        p={...sqlparams};
        p.sqlprocedure=sqlprocedure;
      }else{
        for (let key in this.state.attr){
          if (typeof this.state.attr[key] !=='object') p[key]=this.state.attr[key]
        }
      }
    */
    let p = parseSQLParams(this.state.attr);
    if (p != null) {
      let rs = await reqdoSQL(p);
      this.setState({ data: rs.rows });
    }
    //this.setState({checkallflag:2, checkallvalue:'1'});
    //console.log(1444, this.props.xform('myForm1'));
  }

  handleChange_checkall = (value) => {  //全选或全不选
    let { page, form, data, id } = this.state;
    let tmp;
    if (value.length > 0) tmp = data.map((item) => item.value) //全选
    else tmp = [];   //全不选
    this.setState({ value: tmp, checkallflag: (tmp.length > 0 ? 1 : 0) }, () => page[form].setFieldValue(id, tmp));
  };

  handleChange_check = (values) => {  //单击单个checkbox
    let { page, form, data, id, checkall } = this.state;
    let flag = 0;
    let checkallvalue = 0;
    if (values.length == this.state.data.length) {
      flag = 1;
      checkallvalue = ['1']
    } else if (values.length > 0) {
      flag = 2;
      checkallvalue = [];
    }
    if (checkall) this.setState({ value: values, checkallflag: flag }, () => page[form].setFieldValue(id + '_checkall', checkallvalue));
    else this.setState({ value: values });
  }
  //checkbox.group 之后加上<row><col>可以分行显示选项
  formItems = () => {
    let { id, label, labelwidth, top, left, height, width, style, maxcount, spacing } = this.state.attr;
    let { value, checkallvalue, visible, data, checkall, readOnly, disabled } = this.state;
    //console.log(12345,data);
    if (!data) data = [];
    let html = [];
    //生成多个checkbox
    let options = data.map((item, index) => {
      return (<Checkbox id={id + index} key={id + index} disabled={maxcount > 0 && value.length >= maxcount && !value.includes(item.value)}
        ref={ref => this[id + index] = ref} value={item.value} className={checkall ? 'textdiv' : 'textdiv'} style={{ width: width > 0 ? width : null, marginRight: spacing }}>{item.label}</Checkbox>)
    })
    let hints = '';
    if (maxcount > 0) hints = <label className='labelStyle'>（限{maxcount}项）</label>;
    if (checkall) {
      html.push(<Form.Item label={label} id={id + '_checkall'} key={id + '_checkall'} className={checkall ? 'labelStyle' : 'labelStyle'}
        //valuePropName='checked' 
        labelCol={{ style: { width: labelwidth } }} style={{ ...style, top: top, left: left, display: visible ? 'block' : 'none' }} >
        <Checkbox.Group onChange={this.handleChange_checkall.bind(this)} id={id + '_checkall'} ref={ref => this.checkall = ref} disabled={readOnly} value={checkallvalue}>
          <Checkbox checked={this.state.checkallflag == 1} value="1" indeterminate={this.state.checkallflag == 2}>全选</Checkbox>
        </Checkbox.Group>
      </Form.Item>);
      left += labelwidth + spacing + 60;
      label = '';
      html.push(<Form.Item label={label} name={id} key={id} labelCol={{ style: { width: labelwidth } }}
        className='textdiv' style={{ ...style, top: top, left: left, display: visible ? 'block' : 'none' }} >
        <Checkbox.Group id={id} ref={ref => this.myCheckbox = ref} disabled={readOnly} value={value} onChange={(values) => this.handleChange_check(values)} {...this.props}>
          {options}
          {hints}
        </Checkbox.Group>
      </Form.Item>)
    } else {
      html.push(<Form.Item label={label} id={id + '_label'} key={id + '_label'} labelCol={{ style: { width: labelwidth } }}
        className={checkall ? 'labelStyle' : 'labelStyle'} style={{ ...style, top: top, left: left, display: visible ? 'block' : 'none' }} >
      </Form.Item>)
      html.push(<Form.Item label='' name={id} key={id} labelCol={{ style: { width: labelwidth } }}
        className='textdiv' style={{ ...style, top: top, left: left + labelwidth, display: visible ? 'block' : 'none' }} >
        <Checkbox.Group id={id} ref={ref => this.myCheckbox = ref} {...this.props} disabled={readOnly} value={value} onChange={(values) => this.handleChange_check(values)} {...this.props}>
          {options}
          {hints}
        </Checkbox.Group>
      </Form.Item>)
    }
    //return options;   
    return html;
  }

  render() {
    let { onChange, rules } = this.props;
    let { id, label, labelwidth, top, left, height, width, maxcount, style } = this.state.attr;
    let { visible, value } = this.state;
    return (<>
      {/* <Form.Item label={label} name={id+'_label'}  key={id+'_label'}  labelCol={{style:{ width: labelwidth }}} 
          style={{...style, display:visible? 'block':'none'}} >
          <Checkbox.Group id={id} ref={ref => this.myCheckbox = ref} {...this.props} 
          value={value} 
          onChange={(values)=>this.setState({value:values})} 
          { ...this.props }>
            {this.formItems()}
            {maxcount>0 && <label className='labelStyle'>（限{maxcount}项）</label>}
          </Checkbox.Group>
        </Form.Item>) */}
      {this.formItems()}
    </>)
  }
}

export class AntdRadio extends Component {
  constructor(props) {
    super(props);
    let attr = { ...this.props };  //this.props不能添加属性e.g.antclass
    attr.antclass = 'radio';
    attr = parseParams(attr);
    if (attr.buttontype != 'button') attr.buttontype = 'default';
    attr = parseData(attr);
    //console.log(181, this.props)
    if (attr.optionType == "button") attr.spacing = 0;
    this.state = {
      attr: attr,
      id: attr.id,
      value: [],
      readOnly: attr.readOnly,
      data: attr.data,
      antclass: attr.antclass,
      visible: attr.visible > 0 ? true : false,
    }
  }

  async componentDidMount() {
    let p = parseSQLParams(this.state.attr);
    if (p != null) {
      let rs = await reqdoSQL(p);
      this.setState({ data: rs.rows });
    }
  }

  formItems = () => {
    let { id, label, labelwidth, top, left, height, width, style, spacing, hint } = this.state.attr;
    let { value, visible, data, readOnly } = this.state;
    if (!data) data = [];
    let html = [];
    let options = [];
    for (let i = 0; i < data.length; i++) {
      options[i] = <Radio key={id + '_' + i} style={{ marginRight: spacing }} value={data[i][id]}>{data[i].label}</Radio>
    }
    let hints = '';
    if (hint != '') hints = <label className='labelStyle'>{hint}</label>;
    html.push(<Form.Item label={label} key={id + '_label'} id={id + '_label'} labelCol={{ style: { width: labelwidth } }}
      className='labelStyle' style={{ ...style, top: top, left: left, display: visible ? 'block' : 'none' }} >
    </Form.Item>)
    html.push(<Form.Item label='' key={id} name={id} labelCol={{ style: { width: labelwidth } }} className='textdiv' style={{ ...style, top: top, left: left + labelwidth, display: visible ? 'block' : 'none' }} >
      <Radio.Group id={id} key={id} ref={ref => this[id] = ref} {...this.props} readOnly={readOnly} buttonStyle="solid" style={{ marginLeft: 0 }} >
        {options}
        {hints}
      </Radio.Group>
    </Form.Item>)
    return html;
  }

  render() {
    let { onChange, rules } = this.props;
    let { id, label, labelwidth, top, left, height, width, value, style, hidden, editable, data, labelfield, textfield, message, buttontype } = this.state.attr;
    let { visible } = this.state;
    return (
      <>
        {this.formItems()}
      </>
    )
  }
}

export class AntdComboBox extends React.Component {  //
  // <AntComboBox params='deptname,所属院系,82,0,14,0,260,,信息管理与信息系统;大数据管理与应用;工商管理;计算机科学与技术;会计学' top={16+rowheight*5} ref={ref=>this.deptname=ref}/>
  //供应商编码区分大小写
  constructor(props) {
    super(props);
    let attr = { ...this.props };  //this.props不能添加属性e.g.antclass
    attr.antclass = 'combobox';
    attr = parseParams(attr);
    attr = parseData(attr);
    //if (attr.buttontype!='button') attr.buttontype='default';
    this.state = {
      attr: attr,
      id: attr.id,
      value: [],
      row: [],
      data: attr.data,
      antclass: attr.antclass,
      visible: attr.visible > 0 ? true : false,
      readOnly: attr.readOnly,
      editable: attr.editable,
      disabled: attr.disabled,
      display: 'block',
    }
  }

  async componentDidMount() {
    let p = parseSQLParams(this.state.attr);
    if (p != null) {
      let rs = await reqdoSQL(p);
      this.setState({ data: rs.rows });
    }
  }

  render() {
    let { onChange, rules } = this.props;
    let { label, labelwidth, top, left, height, width, style, hidden, textfield, message, labelfield, valuefield } = this.state.attr;
    let { id, value, editable, data, visible, readOnly, disabled } = this.state;
    const selectStyle = {
      backgroundColor: readOnly || disabled ? sys.colors.readonly : '',
      color: 'black',
      width: width,
    };

    //console.log(1777,id,textfield,data)
    //console.log(666, id, readOnly, valuefield, labelfield)
    return (
      <Form.Item label={label} name={id} key={id} labelCol={{ style: { width: labelwidth } }} className='labelStyle'
        style={{ ...style, display: visible ? 'block' : 'none' }} >
        <Select id={id} key={id} ref={ref => this[id] = ref}
          fieldNames={{ value: valuefield, label: labelfield }} options={data}
          disabled={readOnly}
          style={{ width: width }}
          //style={selectStyle}  //没有效果，靠style.css中.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector
          //className={readOnly ? 'selectDisabledStyle' : ''}  //设置disabled时的样式
          onChange={(value, row) => { this.setState({ value: value, row: row }); onChange?.(value, row) }}
          {...this.props} />
      </Form.Item>
    )
  }
}

export class AntdImage extends React.Component {  //class的名称必须大写字母开头
  //显示图片，可以是json的多个文件，规定文件名称的属性名为filename，或者由fieldnames指定
  constructor(props) {
    super(props);
    this.refs = {};
    //let p={...this.props};  //this.props不能添加属性e.g.antclass
    let attr = parseParams(props);
    //let attr=myParseAntFormItemProps(p);
    attr.antclass = 'image';  //不同控件参数解析不同
    if (attr.height == 0) attr.height = sys.fontSize;
    if (attr.fieldnames?.url) attr.urlfield = attr.fieldnames.url;
    if (attr.urlfield === undefined || attr.urlfield && attr.urlfield == '') attr.urlfield = 'url';
    if (attr.path === undefined || attr.path === '') attr.path = 'server';
    //console.log(attr.id, attr.preview);
    if (attr.preview === undefined || (attr.preview !== 'false' && attr.preview !== false)) attr.preview = 1;
    if (attr.preview = false || attr.preview == 'false') attr.preview = 0;
    else attr.preview = 1;
    //console.log(attr.id, attr.preview);
    this.state = {
      attr: attr,
      id: attr.id,
      src: attr.src,
      value: attr.src,
      datatype: attr.datatype,
      antclass: attr.antclass,
      display: 'block'
    }
  }
  render() {
    let { id, label, labelwidth, top, left, height, width, style, urlfield, hidden, form, datatype, maxcount, path, preview } = this.state.attr;
    //AntdImage中必须对src属性赋值，里面可以带state变量或动态变换的值
    let src = this.props.src; //703, 704，801, 1102的antdimage直接src赋值而且不变的，用props。src，用this.state.src无效
    //if (src===undefined && this.state.src!='') src = this.state.src; //必须设置ref
    //src = this.state.src;  //801，1102换页不会更新图片。setformvalues不是从state.attr中提取。从数据库中提取图片路径不能使用this.props.src
    /*图片组件应用定义
    1)Page801 <AntdImage id='photopath' ref={ref=>this.photopath=ref} label='图片预览' labelwidth='82' left='14' width='300' datatype='json' top={16+rowheight*9} fieldnames={{url:'filename'}} src={this.photopath?.state.src}  />
    2)Page704 <Image style={{ position: 'absolute', top: 16 + rowheight * 8, left: 96 }} preview={false} width={250} src={"/myServer/mybase/products/" + this.state.product.productid + ".jpg"} />
    3)Page704 <AntdImage id="photopath" ref={this.photopath} top={16 + rowheight * 8} left='396' preview={false} width={250} src={'mybase/products/'+this.state.product.productid + ".jpg"} />
    4)Page703 <AntdImage id="photopath1" top='10' left='400' height='130' src={this.state.student.photopath1} datatype='json' path='server' />
    5)Page904 <AntdImage form='' id={"image_" + index} height={135} ref={ref => this["image_" + index] = ref} src={filenames[0].filename} path="server" preview='false' datatype='xjson' />
    6)Page1102 <AntdImage id="ischeckedflag" src={checkedUrl} ref={ref => this.ischeckedflag = ref} top='32' left='700' path='local' preview='false' width='72' />
    */
    let html = [];
    let elem = [];
    let url = '';
    if (datatype == 'json') src = myStr2JsonArray(src);
    //console.log(1111115, id, datatype, src, form);
    if (src && typeof src === 'object') {
      if (!maxcount || maxcount <= 0) maxcount = src.length;
    } else if (src && src != '') {
      maxcount = 1;
      src = [{ 'url': src }]; //转成json数组，以便一起处理
    } else {  //src==null or src==''
      maxcount = 1;
      src = [{ 'url': require('../icons/image-not-found.png') }];
      path = 'local';
      preview = 0;
    }
    //console.log(116, id, label,labelwidth,maxcount, urlfield, src[0][urlfield], path, preview,typeof src[0][urlfield]);
    for (let i = 0; i < maxcount; i++) {  //多个图片文件,json格式中使用filename属性指定图片文件
      if (src[i][urlfield] != undefined) {
        if (path === 'local') url = src[i][urlfield];
        else url = sys.serverpath + '/' + src[i][urlfield] + '?time=' + myLocalTime('').timestamp;  //加服务器路径
        let key = id + '_' + i;
        //带预览功能
        if (preview > 0) html.push(<Image key={key} {...this.state.attr} style={{ marginRight: 6 }} width={width > 0 ? width : null} height={height > 0 ? height : null} src={url} placeholder={<Image width={width > 0 ? width : null} height={height > 0 ? height : null} preview={false} src={url} />} />)
        //不带预览功能,普通图片刷新速度要快很多
        else html.push(<img key={key} {...this.state.attr} fill='black' style={{ marginRight: 6 }} width={width > 0 ? width : null} height={height > 0 ? height : null} src={url} />)
      }
    }
    if (form === undefined && form != '') {
      return (
        <Form.Item label={label} name={id} labelCol={{ style: { width: labelwidth } }} className='labelStyle' style={{ position: 'absolute', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null, display: hidden ? 'none' : this.state.display }} >
          <div name={id}>{html}</div>
        </Form.Item>
      )
    } else {  //无表单
      return (
        <div style={{ position: (top >= 0 && left >= 0) ? 'absolute' : 'relative', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null, display: hidden ? 'none' : this.state.display }} >
          {label != undefined && label != '' && <span className='labelStyle' style={{ textAlign: 'right', display: 'inline-block', width: labelwidth, marginRight: 2 }}>{label != undefined && label != '' ? label + ':' : ''}</span>}
          {html}
        </div>
      )
    }
  }
}

export class AntdFile extends React.Component {  //class的名称必须大写字母开头
  //显示图片，可以是json的多个文件，规定文件名称的属性名为filename，或者由fieldnames指定
  constructor(props) {
    super(props);
    this.refs = {};
    //let p={...this.props};  //this.props不能添加属性e.g.antclass
    let attr = parseParams(props);
    //let attr=myParseAntFormItemProps(p);
    attr.antclass = 'file';  //不同控件参数解析不同
    if (attr.height == 0) attr.height = sys.fontSize;
    if (attr.fieldnames?.url) attr.urlfield = attr.fieldnames.url;
    if (attr.urlfield === undefined || attr.urlfield && attr.urlfield == '') attr.urlfield = 'url';
    if (attr.path === undefined || attr.path === '') attr.path = 'server';
    //console.log(attr.id, attr.preview);
    if (attr.preview === undefined || (attr.preview !== 'false' && attr.preview !== false)) attr.preview = 1;
    if (attr.preview = false || attr.preview == 'false') attr.preview = 0;
    else attr.preview = 1;
    //console.log(attr.id, attr.preview);
    this.state = {
      attr: attr,
      id: attr.id,
      src: attr.src,
      value: attr.src,
      datatype: attr.datatype,
      antclass: attr.antclass,
      display: 'block'
    }
  }
  render() {
    let { id, label, labelwidth, top, left, height, width, style, urlfield, hidden, form, datatype, maxcount, path, preview } = this.state.attr;
    //AntdImage中必须对src属性赋值，里面可以带state变量或动态变换的值
    let src = this.props.src; //703, 704，801, 1102的antdimage直接src赋值而且不变的，用props。src，用this.state.src无效
    //if (src===undefined && this.state.src!='') src = this.state.src; //必须设置ref
    //src = this.state.src;  //801，1102换页不会更新图片。setformvalues不是从state.attr中提取。从数据库中提取图片路径不能使用this.props.src
    /*图片组件应用定义
    1)Page801 <AntdImage id='photopath' ref={ref=>this.photopath=ref} label='图片预览' labelwidth='82' left='14' width='300' datatype='json' top={16+rowheight*9} fieldnames={{url:'filename'}} src={this.photopath?.state.src}  />
    2)Page704 <Image style={{ position: 'absolute', top: 16 + rowheight * 8, left: 96 }} preview={false} width={250} src={"/myServer/mybase/products/" + this.state.product.productid + ".jpg"} />
    3)Page704 <AntdImage id="photopath" ref={this.photopath} top={16 + rowheight * 8} left='396' preview={false} width={250} src={'mybase/products/'+this.state.product.productid + ".jpg"} />
    4)Page703 <AntdImage id="photopath1" top='10' left='400' height='130' src={this.state.student.photopath1} datatype='json' path='server' />
    5)Page904 <AntdImage form='' id={"image_" + index} height={135} ref={ref => this["image_" + index] = ref} src={filenames[0].filename} path="server" preview='false' datatype='xjson' />
    6)Page1102 <AntdImage id="ischeckedflag" src={checkedUrl} ref={ref => this.ischeckedflag = ref} top='32' left='700' path='local' preview='false' width='72' />
    */
    let html = [];
    let elem = [];
    let url = '';
    if (datatype == 'json') src = myStr2JsonArray(src);
    //console.log(115, id, datatype, src,form);
    if (src && typeof src === 'object') {
      if (!maxcount || maxcount <= 0) maxcount = src.length;
    } else {
      maxcount = 1;
      src = [{ 'url': src }]; //转成json数组，以便一起处理
    }
    //console.log(116, id, label,labelwidth,maxcount, urlfield, src[0][urlfield], path, preview,typeof src[0][urlfield]);
    for (let i = 0; i < maxcount; i++) {  //多个图片文件,json格式中使用filename属性指定图片文件
      if (src[i][urlfield] != undefined) {
        if (path === 'local') url = src[i][urlfield];
        else url = sys.serverpath + '/' + src[i][urlfield] + '?time=' + myLocalTime('').timestamp;  //加服务器路径
        let key = id + '_' + i;
        //带预览功能
        if (preview > 0) html.push(<Image key={key} {...this.state.attr} style={{ marginRight: 6 }} width={width > 0 ? width : null} height={height > 0 ? height : null} src={url} placeholder={<Image width={width > 0 ? width : null} height={height > 0 ? height : null} preview={false} src={url} />} />)
        //不带预览功能,普通图片刷新速度要快很多
        else html.push(<img key={key} {...this.state.attr} fill='black' style={{ marginRight: 6 }} width={width > 0 ? width : null} height={height > 0 ? height : null} src={url} />)
      }
    }
    if (form === undefined && form != '') {
      return (
        <Form.Item label={label} name={id} labelCol={{ style: { width: labelwidth } }} className='labelStyle' style={{ position: 'absolute', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null, display: hidden ? 'none' : this.state.display }} >
          <div name={id}>{html}</div>
        </Form.Item>
      )
    } else {  //无表单
      return (
        <div style={{ position: (top >= 0 && left >= 0) ? 'absolute' : 'relative', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null, display: hidden ? 'none' : this.state.display }} >
          <span className='labelStyle' style={{ textAlign: 'right', display: 'inline-block', width: labelwidth, marginRight: 2 }}>{label != undefined && label != '' ? label + ':' : ''}</span>
          {html}
        </div>
      )
    }
  }
}

export class AntdFileUpload extends React.Component {  //class的名称必须大写字母开头
  //上传的文件保存在一个json数组中，json格式filename,filetitle, filesize，通过fieldNames可以修改这些属性名称。
  //先上传文件到服务器保存为临时文件，保存记录时根据表中值更改文件名。
  constructor(props) {
    super(props);
    let attr = parseParams(props);
    attr.antclass = 'fileupload';  //不同控件参数解析不同
    if (!attr.fieldNames) attr.fieldNames = {};
    if (!attr.fieldNames.filename || attr.fieldNames.filename == '') attr.fieldNames.filename = 'filename';
    if (!attr.fieldNames.filetitle || attr.fieldNames.filetitle == '') attr.fieldNames.filetitle = 'filetitle';
    if (attr.timeStamp == undefined) attr.timeStamp = true;
    if (attr.tag == undefined) attr.tag = '';
    if (attr.filetag == undefined) attr.filetag = '';  //文件上传文件名标识
    if (attr.filepath == undefined) attr.filepath = 'mybase/';  //文件上传文件名标识
    if (attr.type == undefined) attr.type = '*';
    if (attr.type == 'image') attr.listType = 'picture-card';
    if (attr.listType == 'picture-card') attr.antclass = 'imageupload';
    if (attr.uploadonsave === undefined || attr.uploadonsave === '' || attr.uploadonsave === 'false') attr.uploadonsave = false;
    else if (attr.uploadonsave === 'true') attr.uploadonsave = true;

    if (attr.type === 'pdf') attr.accept = 'application/pdf';
    else if (attr.type === 'image') attr.accept = 'image/*';

    if (!attr.maxCount || isNaN(attr.maxCount)) attr.maxCount = -1;
    if (!isNaN(attr.maxCount)) attr.maxCount = parseInt(attr.maxCount);

    //alert(attr.listType)
    this.state = {
      attr: attr,
      src: attr.src,
      filelist: [],
      readOnly: attr.readOnly,
      disabled: attr.disabled,
      formvalues: {},  //保存表单中其他控件的值
      deletedfiles: [],   //删除的文件
      uploadedfiles: [],   //新上传的文件
      datatype: attr.datatype,
      antclass: attr.antclass,
      flag: false,
      display: 'none',
      uploadonsave: attr.uploadonsave,  //保存记时才上传文件
    }
  }

  handleChange = async (e) => {
    //console.log(999,e);
    let { attr, filelist, deletedfiles, uploadedfiles, uploadonsave } = this.state;
    let { filetag, timeStamp, targetpath, fieldNames, maxCount } = attr;
    let file = e.file;
    if (!file) return;
    const fileArray = filelist;
    //上传的都是临时文件
    //console.log(666666661, file.status, e.file);
    let fileno = '';
    if (file.status !== 'removed') {
      //console.log(777777770, filelist, maxCount,file);
      if ((maxCount > 0 && filelist.length < maxCount) || maxCount < 0 || (maxCount == 1 && filelist.length > 0)) {
        //多个文件时或文件个数没有限制时或只有一个文件不断替换时，可以上传文件
        if (!uploadonsave) {
          let formData = new FormData();
          fileno = (filelist.length > 0 ? '_' + (filelist.length) : '');
          let filestamp = myLocalTime('').timestamp;
          let targetfile = 'tmp_' + filestamp;
          //console.log(9922, filetag, e.file, targetpath, targetfile, this.state.attr.timeStamp);
          formData.append("targetpath", targetpath);  //文件路径
          formData.append("targetfile", targetfile);  //目标文件名，与时间戳有关       
          formData.append("file", file.originFileObj);  //上传第一个文件
          const config = { headers: { "Content-Type": "multipart/form-data" } }
          await axios.post("/myServer/doFileUpload", formData, config).then(res => {
            //服务器端返回文件名称，实际文件名。如果文件名为空表示文件上传失败
            let json = res.data;
            file.targetfile = targetfile;
            file.targetpath = targetpath;
            file.filestamp = filestamp;  //文件的时间标记，替换文件名称时需要用到
            //服务器端返回的内容
            file.filename = json.filename;
            file[fieldNames.filename] = json.filename;
            file[fieldNames.filetitle] = myFileExtension(file.originFileObj.name).filename;
            file.url = sys.serverpath + '/' + json.filename;
            file.realfilename = json.realfilename;
            file.uid = attr.id + '_' + filelist.length + '_' + myLocalTime('').timestamp;
            file.status = 'done'
            file.fileno = fileno;
            file.fileext = json.fileext;
            file.newflag = 1;   //新上传的文件标记
            if (maxCount == 1 && filelist.length > 0) {
              //只有一个文件时，用新文件替换旧文件
              let f = filelist[0][fieldNames.filename];
              if (f != json.filename) {  //新旧文件名称不能相同
                deletedfiles.push({ filename: f });  //删除原文件  
              }
              filelist[0] = file;   //输入新文件
            } else {
              filelist.push(file);
            }
            uploadedfiles.push(file);  //临时上传的文件            
          })
        } else {
          if (filelist.findIndex((item) => item.uid == file.uid) < 0) {
            filelist.push({ [fieldNames.filename]: file.name, [fieldNames.filetitle]: file.name, uid: file.uid });
          }
        }
      }
    } else {
      //console.log(771,deletedfiles,e.file.filename);
      deletedfiles.push({ filename: e.file.filename })
      filelist = e.fileList;
    }
    //console.log(777777771, filelist);
    if (maxCount > 0) filelist = filelist.slice(0, maxCount);  //只提取前maxcount个文件
    //console.log(777777772, deletedfiles);
    //console.log(1777, uploadedfiles);
    this.setState({ filelist: filelist, deletedfiles, uploadedfiles });
  }

  handleRemoveFile = async (file) => {
    let { filelist, deletedfiles, uploadedfiles, uploadonsave } = this.state;
    let files = filelist.filter((item) => item.uid === file.uid);
    deletedfiles.push(files[0]);
    filelist = filelist.filter((item) => item.uid !== file.uid);
    this.setState({ filelist, deletedfiles });
  }

  handleDownloadFile = async (file) => {  //下载文件
    //console.log(file);
    let { fieldNames } = this.state.attr;
    if (!file) return;
    let filename = file[fieldNames.filename];
    let filedesc = file[fieldNames.filetitle] || '';
    if (filedesc == '') filedesc = filename;
    let p = {};
    p.filepath = '';
    p.sourcefilename = filename;
    p.targetfilename = filedesc;
    let msg = await fileDownload(p);  //下载文件    
  }

  handlePreviewFile = async (file) => {  //预览pdf文件    
    //console.log(file);
    let { fieldNames } = this.state.attr;
    if (!file) return;
    let filename = file[fieldNames.filename];
    let filedesc = file[fieldNames.filetitle] || '';
    if (filedesc == '') filedesc = filename;
    if (myFileExtension(filename).fileext === 'pdf') {
      let url = 'http://127.0.0.1:8080/' + sys.serverpath + filename;
      //需要手动设置游览器容许打开pdf文件，无法设置窗体的标题
      //let newWindow = window.open(url, "_blank"); 
      //可以设置窗体标题的方法
      let newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(`
      <html>
        <head>
          <title>${filedesc}</title>
        </head>
        <body style="margin:0;">
          <iframe 
            src="${url}" 
            style="border:none;" 
            width="100%" 
            height="100%">
          </iframe>
        </body>
      </html>
    `);
        // 关闭document的写入操作，刷新新窗口内容
        newWindow.document.close();
      }
    }
  }

  handlePreviewImage = async (file) => {
    let src = file.url;
    this.setState({ src: src, flag: true })
  }

  render() {
    let { attr, readOnly, filelist, disabled, antclass } = this.state;
    let { id, label, labelwidth, top, left, height, width, style, hidden, maxCount, filetag, type, fieldNames, accept, preview } = attr;
    //console.log(5551, id, fieldNames);
    //destroyOnClose使用modal的这个属性，可以每次打开时生成组件
    disabled = readOnly || disabled;
    this.state.attr.tag = '';
    if (filetag != '') {
      let sys = this.state.formvalues;
    }
    let html = [];
    if (antclass == 'imageupload') {
      html.push(<Form.Item label={label} name={id} key={id + '_labelx'} labelCol={{ style: { width: labelwidth } }}
      // style={{ width: width, position: 'absolute', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null }}
      >
        <Upload key={id} listType="picture-card" fileList={filelist} ref={ref => this.imageupload = ref}
          disabled={disabled} accept={accept}
          //className={styles.imageuploadx}
          onPreview={this.handlePreviewImage.bind(this)}
          onChange={this.handleChange.bind(this)}  >
          {maxCount < 0 || filelist?.length < maxCount && '+ 上传'}
        </Upload>
      </Form.Item>)
      html.push(
        <Form.Item key={id + '_labely'} >
          <Image src={this.state.src} key={id + '_image'} style={{ width: '100%', display: this.state.display }}
            preview={{
              visible: this.state.flag, src: this.state.src, onVisibleChange: (value) => { this.setState({ flag: value }) }
            }} />
        </Form.Item>)
    } else if (antclass == 'fileupload') {
      //上传普通文件
      let msg = ''
      if (!isNaN(maxCount) && maxCount > 0 && type !== '*') msg = '最多' + maxCount + '个' + type + '文件';
      else if (type !== '*') msg = type + '文件';
      else if (!isNaN(maxCount) && maxCount > 0) msg = '最多' + maxCount + '个文件';
      if (disabled) msg = '';
      html.push(
        <Form.Item label='' name={id} key={id + '_label'} labelCol={{ style: { width: 0 } }}
        // style={{ width: width, position: 'absolute', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null }}
        >
          <Upload key={id} {...this.state.attr} fileList={filelist} ref={ref => this.fileupload = ref}
            disabled={readOnly || disabled} accept={accept}
            onChange={this.handleChange.bind(this)}
            itemRender={(originNode, file, filelist) => {
              //console.log(1111, maxCount, file, file.uid, width);
              const index = filelist.indexOf(file) + 1;
              let margintop = 0;
              let marginleft = 0;
              if (filelist.length == 1 && maxCount == 1) {
                margintop = -30;
                marginleft = myGetTextSize(msg).width + labelwidth + left + 45;
              }
              return (
                <div key={'file_' + file.uid} style={{ width: width, display: 'flex', marginLeft: marginleft, marginTop: margintop }}>
                  <a className='linkStyle' style={{ flexGrow: 1, padding: '4px 0px 0px 0px' }} onClick={() => this.handlePreviewFile(file)}>
                    {(filelist.length > 1 || maxCount > 1) && <span style={{ fontFamily: 'times new roman', display: 'inline-block', width: 30 }}>{index + '.'}</span>}
                    <span>{file[fieldNames?.filetitle]}</span></a>
                  {!disabled && <Button type='link' style={{ height: 28, width: 28, marginLeft: 0 }} icon={<DeleteOutlined style={{ fontSize: 13 }} />} onClick={() => this.handleRemoveFile(file)} />}
                  {disabled && <Button type='link' style={{ height: 28, width: 28, marginLeft: 0 }} icon={<DownloadOutlined style={{ fontSize: 13 }} />} onClick={() => this.handleDownloadFile(file)} />}
                  {/* {preview && <Button type='link' style={{ height: 28, width: 28, marginLeft: 0 }} icon={<FileSearchOutlined style={{ fontSize: 13 }} />} onClick={() => this.handlePreviewFile(file)} />} */}
                </div>)
            }}
          >
            <Button key={id + '_button'} style={{ width: labelwidth }} icon={<UploadOutlined />}>{label}</Button>
            {msg != '' && <label style={{ marginLeft: 6 }}>{'（限' + msg + '）'}</label>}
          </Upload>
        </Form.Item>);
    }
    return (
      // 需要加一个div否则表单中的第一列无法编辑
      <div style={{ width: width, position: 'absolute', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null }} >
        {html}
      </div>)
  }
}

export class AntdHiddenField extends React.Component {  //class的名称必须大写字母开头
  constructor(props) {
    super(props);
    let attr = { ...this.props };  //this.props不能添加属性e.g.antclass
    attr.antclass = 'textbox';  //不同控件参数解析不同
    //let attr=myParseAntFormItemProps(this.props,'');
    this.state = {
      attr: attr,
      value: attr.value,
      antclass: attr.antclass
    }
  }
  render() {
    let { onChange } = this.props;
    let id = this.state.attr.id;
    return (
      <Form.Item label='' labelCol={{ style: { width: 0 } }} name={id} style={{ position: 'absolute', top: 0, left: 0, display: 'none' }}>
        <Input style={{ width: 0, height: 1 }} id={id} key={id} ref={ref => this[id] = ref} disabled {...this.props} />
      </Form.Item>
    )
  }
}

export class AntdLabel extends React.Component {  //class的名称必须大写字母开头
  constructor(props) {
    super(props);
    //let attr=myParseAntFormItemProps(props);
    let attr = parseParams(props);
    attr.antclass = 'label';  //不同控件参数解析不同
    if (attr.height == 0) attr.height = sys.fontSize;
    this.state = {
      attr: attr,
      antclass: attr.antclass,
      display: 'block'
    }
  }
  render() {
    //<Header style={{height:30,lineHeight:'30px', paddingLeft:12, borderBottom:'1px solid #95B8E7', background:'#E0ECFF', fontSize:14}}>    <WindowsOutlined />    <label style={{marginLeft:8}} className='headerStyle'>学生详细信息</label>    </Header>   
    let { id, label, labelwidth, top, left, height, width, style, hidden, icon } = this.state.attr;
    return (
      <Form.Item label={label} name={id} key={id} labelCol={{ style: { width: labelwidth } }} className='labelStyle' colon={false}
        style={{ fontSize: height, position: 'absolute', top: top, left: left >= 0 ? left : null, right: left < 0 ? -left : null, display: hidden ? 'none' : this.state.display }} />
    )
  }
}


export class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    let attr = { ...this.props };  //this.props不能添加属性e.g.antclass
    attr.antclass = 'confirmmodal';
    this.state = {
      attr: attr,
      id: attr.id,
      visible: false,
      title: attr.title,
      description: attr.description,
      message: attr.message,
      width: attr.width,
      height: attr.height,
      okText: attr.okText,
      cancelText: attr.cancelText,
      type: attr.type,
      onConfirm: attr.onConfirm,
    }
  }
  render() {
    let { id, width, height, okText, cancelText, title, visible, description, message, type, onConfirm } = this.state;
    if (title === undefined) title = '系统提示';
    if (type === undefined) type = 'confirm';
    if (type == 'info' || type == 'alert') {
      okText = '';
      if (cancelText === undefined || cancelText == '') cancelText = (type == 'info' ? '确认' : '关闭');
    } else {
      //type === 'confirm') {
      if (okText === undefined || okText == '') okText = '确定';
      if (cancelText === undefined || cancelText == '') cancelText = '取消';
    }
    if (width === undefined) width = 370;
    if (height === undefined) height = 260;
    width = parseInt(width);
    height = parseInt(height);
    //console.log(11111, message, description);
    if (description === undefined && message != undefined) description = message;
    if (description === undefined) description = '是否确定删除这条记录？';
    //<QuestionCircleOutlined /> <InfoCircleOutlined />
    return (
      <Modal name='myMsg1' key='myMsg1' title={title} open={this.state.visible}
        width={width} height={height}
        centered maskClosable={false}
        style={{ position: 'relative', padding: 0 }} closable keyboard={false}
        styles={{ body: { padding: 0, margin: 0 } }}
        {...this.props}
        onCancel={() => this.setState({ visible: false })}
        footer={[
          okText !== '' && <Button key='_btnok' type='primary' onClick={(e) => { onConfirm?.(e) }}>{okText}</Button>,
          cancelText !== '' && <Button key='_btnclose' type='primary' onClick={() => this.setState({ visible: false })}>{cancelText}</Button>
        ]}>
        <div dangerouslySetInnerHTML={{ __html: description }} />  {/* 可以支持使用html语句  */}
        {/* {description} */}
      </Modal>
    )
  }
}

{/* <Popconfirm open={this.state.openConfirm1} arrow title='系统确认' description='是否确定删除这条记录？'
onConfirm={this.handleDeleteClick.bind(this)} onCancel={()=>this.setState({openConfirm1: false})}
okText="确定" cancelText="取消" overlayStyle={{width:350}} placement='bottom' /> */}


export class AntdResizable extends Component {
  constructor(props) {
    super(props);
    let attr = parseParams(props);
    console.log(222, attr);
    if (attr.width == undefined || isNaN(attr.width)) attr.width = -1;
    if (attr.height == undefined || isNaN(attr.height)) attr.height = -1;
    attr.width = parseInt(attr.width);
    attr.height = parseInt(attr.height);
    if (attr.minwidth == undefined) attr.minwidth = attr.width;
    if (attr.maxwidth == undefined) attr.maxwidth = attr.width;
    if (attr.minheight == undefined) attr.minheight = attr.height;
    if (attr.maxheight == undefined) attr.maxheight = attr.height;
    this.state = {
      attr: attr,
      width: attr.width,
      height: attr.height,
      minwidth: attr.minwidth,
      maxwidth: attr.maxwidth,
      maxheight: attr.maxheight,
      minheight: attr.minheight,
    }
  }


  handleResizeStart = (e, direction, ref) => {
    console.log('Resize started', { e, direction, ref });
  };
  // handleResize = (e, direction, ref, d) => {
  //   console.log('Resizing', { e, direction, ref, d });
  //   this.setState({
  //     width: this.state.width + d.width,
  //     height: this.state.height + d.height,
  //   });
  // };

  handleResizeStop = (e, direction, ref, d) => {
    console.log('Resize stopped', { e, direction, ref, d });
    this.setState({
      width: this.state.width + d.width,
      height: this.state.height + d.height,
    });
  };

  handleResize = (event, { element, size }) => {
    //window.requestAnimationFrame(() => this.setState({ siderwidth: size.width }));
    this.setState({
      width: Math.min(400, Math.max(size.width, 100)),
      //height: this.state.height, // Keep height fixed
    });
  };
  render() {
    let { width, height, minwidth, maxwidth, minheight, maxheight } = this.state;
    let { children } = this.props;
    let html = [];
    if (width > 0) {
      html.push(
        <Resizable key='_Resizable1' width={width} height='100vh'
          //minConstraints={[100, height]} // Fixed height
          //maxConstraints={[300, height]} // Fixed height
          axis="x"
          handle={<div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            right: '-4px', /* 使得把手稍微突出以便于拖动 */
            width: '5px', /* 把手宽度 */
            cursor: 'ew-resize',
            backgroundColor: 'rgb(255,236,255)',
            borderRight: '1px solid ' + sys.colors.border,
            borderLeft: '1px solid ' + sys.colors.border,
            zIndex: 10
          }} />}
          //onResizeStart={this.handleResizeStart}
          onResize={this.handleResize}
        //onResizeStop={this.handleResizeStop}
        >
          <div style={{ width: `${width}px`, height: `${height}px`, border: '1px solid #ccc', position: 'relative' }}>
            {children}
          </div>
        </Resizable >
      )
    } else {
      html.push(
        <Resizable key='_Resizable1' height={height} width={100} minheight={minheight} maxheight={maxheight}
          minConstraints={[100, height]} // Fixed height
          maxConstraints={[300, height]} // Fixed height
          axis="y"
          onResizeStart={this.handleResizeStart}
          onResize={this.handleResize}
          onResizeStop={this.handleResizeStop}
        >
          <div style={{ width: '100%', height: '100%' }}></div>
        </Resizable>
      )
    }
    console.log(333, width, html);
    return (html)
  }
}

class AntDSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="1em"
        height="1em"
        {...this.props}
      >
        {/* Your SVG content here */}
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8 9h8v2H8V9zm0 4h8v2H8v-2z" />
      </svg>
    );
  }
}

export class BackupOutlined extends React.Component {
  render() {
    return (
      <svg width="16" height="16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" style={{ marginLeft: -8 }} >
        <path d="M716.16 835.84H497.28c-17.92 0-32-14.08-32-32s14.08-32 32-32h218.88c88.96 0 163.84-70.4 167.04-156.8 1.28-44.8-14.72-87.04-45.44-119.04-30.72-32-72.32-49.92-117.12-49.92-7.68 0-16 0.64-23.68 1.92-25.6 3.84-49.92-13.44-53.76-39.04C627.2 314.24 542.72 247.68 445.44 256c-87.68 7.04-158.08 75.52-167.68 162.56-3.2 30.08 0 59.52 10.88 87.04 3.84 10.24 2.56 21.76-4.48 30.72-6.4 8.96-17.28 13.44-28.16 12.8h-1.28c-2.56 0-4.48-0.64-7.04-0.64-30.72 0-59.52 12.16-80.64 34.56-21.12 22.4-32 51.84-30.72 82.56 2.56 58.24 54.4 106.24 115.2 106.24H339.2c17.92 0 32 14.08 32 32s-14.08 32-32 32H252.16c-96 0-174.72-73.6-179.2-167.04-2.56-48.64 14.72-94.72 48.64-129.92 26.24-27.52 59.52-45.44 96-51.84-5.12-24.96-5.76-49.92-3.2-76.16 12.8-117.12 108.16-209.28 225.92-218.88 122.88-10.24 235.52 72.96 263.04 191.36 5.76-0.64 12.16-0.64 17.92-0.64 62.08 0 119.68 24.32 163.2 69.12 42.88 44.8 65.28 103.68 63.36 165.76-5.12 120.32-108.8 218.24-231.68 218.24z" fill="#2c2c2c" p-id="4261"></path><path d="M496 821.12c-17.92 0-32-14.08-32-32V599.04l-54.4 46.72c-13.44 11.52-33.92 10.24-45.44-3.2-11.52-13.44-10.24-33.92 3.2-45.44l107.52-92.16c9.6-8.32 23.04-10.24 33.92-5.12 11.52 5.12 18.56 16.64 18.56 28.8v260.48c0.64 17.92-13.44 32-31.36 32zM622.72 652.8c-7.04 0-14.08-2.56-20.48-7.04l-42.24-34.56c-13.44-11.52-15.36-31.36-4.48-44.8 11.52-13.44 31.36-15.36 44.8-4.48l42.24 34.56c13.44 11.52 15.36 31.36 4.48 44.8-5.76 7.68-15.36 11.52-24.32 11.52z" fill="#2c2c2c" p-id="4262"></path>
      </svg>
    )
  }
}