import React, { Component } from 'react'
import ajax from '../../api/ajax'
import { reqdoSQL } from '../../api/functions.js'
import { MyInput, MyCombobox } from '../../api/common.js';

export default class Page1603 extends Component {
  constructor(props) {
    super(props);
    //在这里初始化 state
    this.state = {      
      titleData: [],
      cleanerData:[],
      sweepData: [],
      selectedProduct: {},
    };
  }

  async componentDidMount(){ //页面启动时就会执行执行，必须使用async异步
    let p={};
    p.sqlprocedure = 'demo1603a';    
    var url = '/myServer/doSQL?paramvalues=' + JSON.stringify(p)
    let rs = await ajax(url, {}, 'POST');  //使用与异步配套的await    
    console.log(11,rs.rows);
    //this.setState({titleData: rs.rows});  //无效
    this.titleno.setState({items:rs.rows, value:rs.rows[0].value});  //除items之外，同时必须强制给控件赋初值value
  }

  handleClick = async() => {
    console.log(111,this.titleno.state.value);
    //第一种方法
    let p={};
    p.sqlprocedure = 'demo1603b';
    p.titleno = this.titleno.state.value;
    const rs = await reqdoSQL(p); //调用函数，执行存储过程
    //第二种方法(不推荐)
    // let p={};
    // p.selectsql=`select * from products where titleno="${this.titleno.state.value}"`;
    // const rs = await reqdoSQL(p); //调用函数，执行存储过程
    this.setState({cleanerData:rs.rows});
  }

  // triggerChange = (newValue) => {
  //   console.log(991,this.titleno, newValue);
  //   if (!this.titleno) return;
  //   this.titleno.target.value = newValue; // 更新下拉框的值
  //   const event = new Event('change', { bubbles: true });
  //   this.titleno.target.dispatchEvent(event); // 分发事件
  //   console.log(999,this.titleno, newValue);
  // };
 
  showOrders = async (item) => {  //必须加异步
    let p={};
    p.cleanerno = item.cleanerno;
    p.date1 = this.sweepdate1.state.value;
    p.date2 = this.sweepdate2.state.value;
    p.sqlprocedure='demo1603c';
    let rs = await reqdoSQL(p); //调用函数，执行存储过程。必须加await
    let rows=rs.rows.map((item, index) => {
      return(<li key={"item_"+index}>
        <span style={{display:'inline-block', width:70}}>{item.salvageno}</span>
        <span style={{display:'inline-block', width:170}}>{item.salvagestime}</span>
        <span style={{display:'inline-block', width:70}}>{item.tool}</span>

        <span style={{display:'inline-block', width:100}}>{item.watername}</span>
        <span style={{display:'inline-block', width:70}}>{item.sstate}</span>
      </li>);
    })
    this.setState({sweepData: rows, selectedProduct: item});    
  }

  render() { 
    return (
    <div>
      <div style={{height:30, marginLeft:10, marginTop:10}}>查询员工工作记录<hr/></div>      
        <div style={{height:30, position:'relative'}}>
          <MyCombobox id="titleno" ref={ref=>this.titleno=ref} label="职位类别" labelwidth="75" width="120" className='selectStyle' top="5" left="24" items={this.state.titleData}/>
          <MyInput id="sweepdate1" ref={ref=>this.sweepdate1=ref} type="date" label="日期区间" labelwidth="75" top="5" left="240" height="28" width="110" value="2016-01-01" />
          <MyInput id="sweepdate2" ref={ref=>this.sweepdate2=ref} type="date" label="——" labelwidth="35" top="5" left="435" height="28" width="110" value="2024-12-31" />
          <button id="btnlast" style={{position:'absolute', top:5, left:600, height:28, width:70}} onClick={this.handleClick}>确定</button>
        </div>
        <hr/>
        <div style={{padding:10, marginTop:10, border:'1px solid #95B8E7', height:200, overflow:'auto'}}>
          {this.state.cleanerData.map((item,index) => {
              return (
                <div key={"div_"+index}>
                  <a key={"a_"+index} href="#" onClick={()=> this.showOrders(item)}>{item.cleanerno}&nbsp;{item.cleanername}</a>
                </div>
              )})
          }    
        </div>
        <div style={{padding:10, marginTop:10, border:'1px solid #95B8E7', height:260, overflow:'auto'}}>
          <div><b>{this.state.selectedProduct.cleanername}</b>打捞信息（共***条）</div>
          <hr/>

          <span>序号</span>&nbsp;&nbsp;<span>记录编号</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>打捞时间</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>使用工具</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>水域名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>完成情况</span>

          <ol>
            {this.state.sweepData}
          </ol>
        </div>
      </div>      
    )
  }
}