import React from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'       //按需加载
import ReactEcharts from 'echarts-for-react'    //导入这个防止每次都需要new
import echartTheme from './../echartTheme'

import 'echarts/lib/chart/bar'          //导入柱形图
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default class Bar extends React.Component{

    componentWillMount(){
        echarts.registerTheme('IMOOC',echartTheme); //前一个参数自己命名，后一个参数是解析后的主题色文件
    }
    
    //表格option    
    getOption=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            //鼠标悬浮展示数据
            tooltip:{
                trigger:'axis'
            },
            //x轴
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周天']
            },
            //y轴,y轴是自己去计算渲染出来的，所以不需要定义什么
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,2000,1520,1200,3522,1400,5200]
                }
            ]

        }
        return option;
    }
    //表格option2
    getOption2=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            //副标题
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            //鼠标悬浮展示数据
            tooltip:{
                trigger:'axis'
            },
            //x轴
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周天']
            },
            //y轴,y轴是自己去计算渲染出来的，所以不需要定义什么
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO',
                    type:'bar',
                    data:[900,2000,1520,1150,3522,1400,5200]
                },
                {
                    name:'摩拜',
                    type:'bar',
                    data:[1000,1800,1550,1200,3200,1600,3600]
                },
                {
                    name:'小蓝',
                    type:'bar',
                    data:[1100,2200,1660,1300,3100,1400,5200]
                }
            ]

        }
        return option;
    }

    render(){
        return(
            <div>
                <Card title='柱形图表之一' className='card-warp'>
                    <ReactEcharts option={this.getOption()} theme='IMOOC'></ReactEcharts>
                </Card>
                <Card title='柱形图表之二' className='card-warp'>
                    <ReactEcharts option={this.getOption2()} theme='IMOOC'></ReactEcharts>
                </Card>
            </div>
        );
    }
}