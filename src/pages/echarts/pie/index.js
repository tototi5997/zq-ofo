import React from 'react'
import {Card} from 'antd';
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'    //导入这个防止每次都需要new
import echartTheme from './../echartTheme'  //导入主题色

//导入小模块
import 'echarts/lib/chart/pie'          //导入饼状图
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'


export default class Pie extends React.Component{

    componentWillMount(){
        echarts.registerTheme('THEME',echartTheme); //前一个参数自己命名，后一个参数是解析后的主题色文件
    }

    //getOption(饼图)
    getOption=()=>{
        let option ={
            title:{
                text:'用户骑行数据'
            },
            //小标题
            legend:{
                orient:'vertical',  //小标题垂直排列
                right:10,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            //数据源
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            name:'周一',
                            value:1000
                        },
                        {
                            name:'周二',
                            value:1200
                        },
                        {
                            name:'周三',
                            value:1100
                        },
                        {
                            name:'周四',
                            value:1300
                        },
                        {
                            name:'周五',
                            value:1100
                        },
                        {
                            name:'周六',
                            value:1600
                        },
                        {
                            name:'周日',
                            value:1500
                        },
                    ]  
                }
            ],
            //鼠标移上去显示信息
            tooltip:{
                // trigger:'item',
                formatter:'{a}<br/>{b} : {c} ({d}%)'
            }
        }
        return option;
    }
    getOption2=()=>{
        let option ={
            title:{
                text:'用户骑行数据'
            },
            //小标题
            legend:{
                orient:'vertical',  //小标题垂直排列
                right:10,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            //数据源
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    radius:['40%','70%'],
                    data:[
                        {
                            name:'周一',
                            value:1000
                        },
                        {
                            name:'周二',
                            value:1200
                        },
                        {
                            name:'周三',
                            value:1100
                        },
                        {
                            name:'周四',
                            value:1300
                        },
                        {
                            name:'周五',
                            value:1100
                        },
                        {
                            name:'周六',
                            value:1600
                        },
                        {
                            name:'周日',
                            value:1500
                        },
                    ]  
                }
            ],
            //鼠标移上去显示信息
            tooltip:{
                // trigger:'item',
                formatter:'{a}<br/>{b} : {c} ({d}%)'
            }
        }
        return option;
    }
    getOption3=()=>{
        let option ={
            title:{
                text:'用户骑行数据'
            },
            //小标题
            legend:{
                orient:'vertical',  //小标题垂直排列
                right:10,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            //数据源
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    // radius:['40%','70%'],
                    data:[
                        {
                            name:'周一',
                            value:1000
                        },
                        {
                            name:'周二',
                            value:1200
                        },
                        {
                            name:'周三',
                            value:1100
                        },
                        {
                            name:'周四',
                            value:1300
                        },
                        {
                            name:'周五',
                            value:1100
                        },
                        {
                            name:'周六',
                            value:1600
                        },
                        {
                            name:'周日',
                            value:1500
                        },
                    ].sort((a,b)=>a.value-b.value)  
                }
            ],
            //鼠标移上去显示信息
            tooltip:{
                // trigger:'item',
                formatter:'{a}<br/>{b} : {c} ({d}%)'
            },
            roseType:'radius'
        }
        return option;
    }

    render(){
        return(
            <div>
                <Card className='card-warp' title='饼状图'>
                    <ReactEcharts option={this.getOption()} theme='THEME'></ReactEcharts> 
                </Card>

                <Card className='card-warp' title='环形图'>
                    <ReactEcharts option={this.getOption2()} theme='THEME'></ReactEcharts> 
                </Card>

                <Card className='card-warp' title='南丁格尔饼图'>
                    <ReactEcharts option={this.getOption3()} theme='THEME'></ReactEcharts> 
                </Card>
            </div>
        );
    }
}