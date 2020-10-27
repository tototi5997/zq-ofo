import React from 'react'
import { Card,Form, Select, DatePicker,Button, message } from 'antd'
import axios from './../../axios/index'

const FormItem = Form.Item;
const SelectItem = Select.Option;
export default class BikeMap extends React.Component{
    state={}
    map = ''        //定义一个map
    params={
        page:1
    }
    componentDidMount(){
        this.requestList();
    }

    //地图渲染请求
    requestList=()=>{
        axios.ajax({
            url:'/table/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res.code == 0){  
                this.setState({
                    total_count:res.result.total_count,
                })
                this.renderMap(res);
            }
        });
    }

    //渲染地图
    renderMap=(res)=>{
        /* 绘制地图 */
        let list = res.result.route_list;      //路线坐标【】
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');      //获取数组中的第一项值为起点
        let startpoint = new window.BMap.Point(gps1[0],gps1[1]);
        let gps2 = list[list.length-1].split(',');      //获取数组中的最后一项为终点
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);   //把终点当做地图的中心点,缩放等级为11级
        this.map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));   //给地图添加方法缩小轴
       this.map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
        
        /* 绘制icon,起始坐标点 */
        //起点icon
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)  //icon偏移量，箭头在icon中点，指向位置
        })
        //通过marker给覆盖点添加icon
        let bikeMarkerStart = new window.BMap.Marker(startpoint,{icon:startPointIcon})
        //通过addoverlay的方法把它显示出来
        this.map.addOverlay(bikeMarkerStart);
        //终点icon
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{icon:endPointIcon})
        this.map.addOverlay(bikeMarkerEnd);

        /* 绘制路线 */
        let routeList = []; //保存起点和重点之间的坐标点【】
        list.forEach((item) => {
            let p = item.split(',')     //遍历list，每项数据以,分割存储到p中
            routeList.push( new window.BMap.Point(p[0],p[1]));   //不能直接把p丢到routelist中，需要转换成百度地图的坐标点
        });
        //调用Polyline方法画折线
        let polyLine = new window.BMap.Polyline(routeList,{         //第一个参数是坐标点，中括号中写相关配置
            strokeColor:'#1869AD',     //线条颜色
            strokeWeight:3,        //线条宽度
            setStrokeOpacity:1        //线条透明度
        })
        this.map.addOverlay(polyLine);  //在地图上添加东西统一都用这个方法

        /* 绘制服务区 */
        let servicePointList = [];  //用来存储百度专用坐标
        let serviceList = res.result.service_list;     //存放获取的服务区坐标
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat));
        })
        let polygon = new window.BMap.Polyline(servicePointList,{
            strokeColor:'#ef4136',
            getStrokeWeight:2,
        })
        this.map.addOverlay(polygon);

        /* 绘制车辆点 */
        let bikeList = [];      //存放百度转码坐标
        let bikePoint = res.result.bike_list;
        bikePoint.forEach((item)=>{
            let p = item.split(',');
            bikeList = new window.BMap.Point(p[0],p[1]);
            //声明bikeicon
            let bikePointIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
            })
            let bikeMarker = new window.BMap.Marker(bikeList,{icon:bikePointIcon})
            this.map.addOverlay(bikeMarker);
        })
        
    }

    render(){
        return(
           <div>
               <BasicForm></BasicForm>
               <Card className='card-warp'>
                <div>共{this.state.total_count}辆车</div>
               <div style={{height:500}} id='container'></div>
               </Card>
           </div>         
        );
    }
}

class BasicForm extends React.Component{
    state={
        
    }
    //提交查询表单
    handleSubmit=(values)=>{
        // console.log(result)
        message.info(`查询城市：${values.city} 起始时间：${values.ordertime_start} 结束时间：${values.ordertime_end} 状态：${values.order_statue}`)
    }
    //清空查询表单
    handleClear=(e)=>{
        this.refs.bikeForm.resetFields();
        message.success('信息已重置！')
    }
    render(){
        return(
            <Card className='card-warp'>
                <Form layout='inline' onFinish={this.handleSubmit} ref='bikeForm'>
                    <FormItem
                    label='城市'
                    name='city'
                    style={{width:140}}
                    >
                        <Select placeholder='选择城市'>
                            <SelectItem value='0'>全部</SelectItem>
                            <SelectItem value='武汉'>武汉</SelectItem>
                            <SelectItem value='北京'>北京</SelectItem>
                            <SelectItem value='上海'>上海</SelectItem>
                        </Select>
                    </FormItem>
                    <FormItem
                    label='订单时间'
                    name='ordertime_start'
                    >
                       <DatePicker showTime format='YYYY-MM-DD HH:MM:SS'></DatePicker>
                    </FormItem>
                    <FormItem
                    label='~'
                    name='ordertime_end'
                    colon={false}
                    >
                       <DatePicker showTime format='YYYY-MM-DD HH:MM:SS'></DatePicker>
                    </FormItem>
                    <FormItem
                    label='订单状态'
                    name='order_statue'
                    >
                        <Select placeholder='选择状态'>
                            <SelectItem value='全部'>全部</SelectItem>
                            <SelectItem value='进行中'>进行中</SelectItem>
                            <SelectItem value='已结束'>已结束</SelectItem>
                        </Select>
                    </FormItem>
                    
                        <Button type='primary' htmlType='submit'>查询</Button>
                        <Button onClick={this.handleClear}>重置</Button>
                    
                </Form>
            </Card>
        );
    }
}