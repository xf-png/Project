import React, { Component } from 'react';  
import * as echarts from 'echarts';  
  
class EChartsDemo extends Component {  
  componentDidMount() {  
  
    var mychart1 = echarts.init(this.mychart1Ref.current);  
  
   
    mychart1.setOption({  
      title: {text: '植被状况查看',
        subtext: 'Fake Data',
        left: 'center'},


      tooltip: {trigger: 'item'
  },
  legend: {orient: 'vertical',
    left: 'left'
  },  
  series: [
    { name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1, name: '较差' },
        { value: 1.2, name: '良好' },
        { value: 2, name: '一般' },
       
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)' } }}]
    });  
  }  
  
  
  mychart1Ref = React.createRef();  
  
  render() {  
    return (  
      <div ref={this.mychart1Ref} style={{ width: '600px', height: '400px' }} />  

    );  
  }  
}  
  
export default EChartsDemo;