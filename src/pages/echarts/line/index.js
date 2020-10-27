import React from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'
import echartTheme from './../echartTheme'


import 'echarts/lib/chart/line'          //导入折线图
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default class Line extends React.Component{

    componentWillMount(){
        echarts.registerTheme('IMOOC',echartTheme); //前一个参数自己命名，后一个参数是解析后的主题色文件
    }

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
                    type:'line',
                    data:[1000,2000,1520,1200,3522,1400,5200]
                }
            ]

        }
        return option;
    }
    getOption2=()=>{
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
                    name:'摩拜',
                    type:'line',
                    data:[1000,2000,1520,1200,3522,1400,5200]
                },
                {
                    name:'青桔',
                    type:'line',
                    data:[2000,3000,5000,2600,1300,4100,6500]
                },
            ],
            legend:{
                data:['摩拜','青桔']
            }
        }
        return option;
    }
    render(){
        return(
            <div>
                <Card title='折线图' className='card-warp'>
                    <ReactEcharts option={this.getOption()} theme='IMOOC'></ReactEcharts>
                </Card>

                <Card title='折线图2' className='card-warp'>
                    <ReactEcharts option={this.getOption2()} theme='IMOOC'></ReactEcharts>
                </Card>
            </div>
        );
    }
}