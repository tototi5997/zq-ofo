import React from 'react'
import {Button, Card,message} from 'antd'

export default class Messages extends React.Component{

    showMessage=(type)=>{
        message[type]('This is zq simple message.');
    }
    render(){
        return(
            <div>
                <Card title='全局提示框' className='card-warp'>
                    <Button onClick={()=>this.showMessage('success')}>Success</Button>
                    <Button onClick={()=>this.showMessage('error')}>Error</Button>
                    <Button onClick={()=>this.showMessage('warning')}>Warning</Button>
                    <Button onClick={()=>this.showMessage('loading')}>Loading</Button>
                </Card>
            </div>
        );
    }
}