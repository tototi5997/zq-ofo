import { Card } from 'antd'
import React from 'react'
import './detail.less'
import axios from './../../axios/index'
import FormItem from 'antd/lib/form/FormItem'

// const FormItem = From.item;

export default class Detail extends React.Component{
    state={}

    componentDidMount(){
        let orderId = this.props.match.params.orderId;          //取页面的id
        if(orderId){
              this.getDetailInfo(orderId);  
            //   alert(orderId)
        }
    }

    //调用接口
    getDetailInfo = (orderId)=>{
        axios.ajax({
            url:'/table/order/detail',
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    orderInfo:res.result
                })
                
            }
            this.renderMap(res.result);
        })
    }

    //初始化地图
   renderMap =(result)=>{
       //绘制地图
      this.map = new window.BMap.Map('orderDetailMap',{enableMapClick:false})
      //添加控件
        this.addMapControl();
        
        //绘制行驶路线图
        this.drawBikeRoute(result.position_list);
        //调用服务区绘制方法
        this.drawServiceArea(result.area);
   }
   //添加地图控件
   addMapControl =()=>{
       let map = this.map;
       map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
       map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}));
   }
   //绘制bike路线图
   drawBikeRoute = (positionList)=>{
    //    let map = this.map;
        let startPoint ='';
        let endPoint = '';
        if(positionList.length>0){
            let first = positionList[0];
            let last = positionList[positionList.length-1]
            startPoint =  new window.BMap.Point(first.lon,first.lat)        //获得经纬度
            //起始位置的图标
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
                 imageSize:new window.BMap.Size(36,42),
                 anchor:new window.BMap.Size(36,42)
             })
            //icon不能直接放到地图里，需要定义一个maker，需要两个值，经纬度和icon
            let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
            //将marker添加到地图上
            this.map.addOverlay(startMarker);

            //终止位置
            endPoint =  new window.BMap.Point(last.lon,last.lat)        //获得经纬度
            //起始位置的图标
            let endIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
                 imageSize:new window.BMap.Size(36,42),
                 anchor:new window.BMap.Size(36,42)
             })
             let endMarker = new window.BMap.Marker(endPoint,{icon:endIcon});
             //将marker添加到地图上
            this.map.addOverlay(endMarker);

            //链接路线图
            let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon,point.lat));
                //保存到trackpoint中开始划线
            }
            let polyline = new window.BMap.Polyline(trackPoint,{
                setStrokeColor:'#1869AD',
                getStrokeWeight:2,
                getStrokeOpacity:1
            })
            this.map.addOverlay(polyline);
            //中心坐标地点
            this.map.centerAndZoom(endPoint,11); 
    
        }   
    }   
    //绘制服务区
    drawServiceArea = (positionList)=>{
        let trackPoint = [];
            for(let i=0;i<positionList.length;i++){
                let point = positionList[i];
                trackPoint.push(new window.BMap.Point(point.lon,point.lat));
                //保存到trackpoint中开始划线
            }
        let polygon = new window.BMap.Polygon(trackPoint,{
                setStrokeColor:'#CE0000',
                getStrokeWeight:2,
                getStrokeOpacity:1,
                fillColor:'#ff8605',
        })
        this.map.addOverlay(polygon);
    } 
   
    render(){
        const formItemLayout = ({
            labelCol:{
                span:4
            },
            contentCol:{
                span:20
            }
        })
        const info = this.state.orderInfo || {};
        return(
            <div>
                <div id='orderDetailMap' className='order-map'></div>
                <Card className='detail-card'>
                <div className='detail-items'>
                    <div className='item-title'>基础信息</div>
                    <FormItem label='用车模式' colon={false} {...formItemLayout}>{info.mode ==1?'服务器':'停车点'}</FormItem>
                    <FormItem label='订单编号' colon={false} {...formItemLayout}>{info.order_sn}</FormItem>
                    <FormItem label='用户姓名' colon={false} {...formItemLayout}>{info.user_name}</FormItem>
                    <FormItem label='手机号码' colon={false} {...formItemLayout}>{info.mobile}</FormItem>
                </div>

                <div className='detail-items'>
                    <div className='item-title'>行驶轨迹</div>
                    <FormItem label='行驶起点' colon={false} {...formItemLayout}>{info.start_location}</FormItem>
                    <FormItem label='行程终点' colon={false} {...formItemLayout}>{info.end_location}</FormItem>
                    <FormItem label='行驶里程' colon={false} {...formItemLayout}>{info.distance}</FormItem>
                </div>
                </Card>
            </div>  
        )
    }
}