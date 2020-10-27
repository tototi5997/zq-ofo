import React from 'react'
import {Card,Button, notification} from 'antd'
import {
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
  } from '@ant-design/icons';

export default class Notice extends React.Component{
    notifictionOpen = ()=>{
        notification.open({
            message:'提示',
            description:'这里是消息提示！balabala.将在4.5s后关闭!'
        })
    }
    openNotifiction = (type)=>{
        notification[type]({
            message:'提示',
            description:'这里是消息提示，balabalabala'
        })
    }
    //不同方位的notification打开
    openPlaceNotification= (placement)=>{
        notification.info({
            message:'Notification',
            description:'这里是消息提示，balabalabala...',
            placement
        });
    }
    render(){
        return(
            <div>
            <Card title='通知提醒框' className='card-warp'>
                <Button onClick={this.notifictionOpen}>简单的通知提醒框</Button>
                <Button onClick={()=>this.openNotifiction('success')}>Success</Button>
                <Button onClick={()=>this.openNotifiction('info')}>Infp</Button>
                <Button onClick={()=>this.openNotifiction('warning')}>Warning</Button>
                <Button onClick={()=>this.openNotifiction('error')}>Error</Button>
            </Card>

            <Card title='特殊的通知提醒框' className='card-warp'>
                <Button onClick={()=>this.openPlaceNotification('topLeft')}><RadiusUpleftOutlined/>topLeft</Button>
                <Button onClick={()=>this.openPlaceNotification('topRight')}><RadiusUprightOutlined/>topRight</Button>
                <Button onClick={()=>this.openPlaceNotification('bottomLeft')}><RadiusBottomleftOutlined/>buttomLeft</Button>
                <Button onClick={()=>this.openPlaceNotification('bottomRight')}><RadiusBottomrightOutlined/>buttomRight</Button>
            </Card>
            </div>
        );
    }
}