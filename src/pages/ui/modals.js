import React from 'react' 
import {Card,Button,Modal} from 'antd'

export default class Modals extends React.Component{
    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
    }
    //点击弹窗事件
    handleOpen1 = () =>{
        this.setState({
            showModal1:true
        })
    }
    handleOpen2 = () =>{
        this.setState({
            showModal2:true
        })
    }
    handleOpen3 = () =>{
        this.setState({
            showModal3:true
        })
    }
    handleOpen4 = () =>{
        this.setState({
            showModal4:true
        })
    }

    //信息提示方法
     confirm =()=>{
        Modal.confirm({
            title:'This is confirm message!',
            content:'some message ....balabalabala '
        })
    }
    info = () =>{
        Modal.info({
            title:'This is info message!',
            content:'some message ....balabalabala '
        })
    }
    success=()=>{
        Modal.success({
            title:'This is success message!',
            content:'some message ....balabalabala '
        })
    }
    error = () =>{
        Modal.error({
            title:'This is error message!',
            content:'some message ....balabalabala '
        })
    }
    warming = () =>{
        Modal.warning({
            title:'This is warning message!',
            content:'some message ....balabalabala '
        })
    }
    render(){
        return(
            <div>
                <Card title='基础模态框' className = "card-warp">
                    <Button onClick={this.handleOpen1}>Open</Button>
                    <Button onClick={this.handleOpen2}>自定义页脚</Button>
                    <Button onClick={this.handleOpen3}>顶部20px弹框</Button>
                    <Button onClick={this.handleOpen4}>水平垂直居中弹框</Button>
                </Card>
                <Modal title='React' visible = {this.state.showModal1} onCancel = {()=>{
                    this.setState({
                        showModal1:false
                    })
                }}>
                    <p>这里是zq做的弹窗测试</p>
                </Modal>

                <Modal title='页脚弹窗' visible = {this.state.showModal2} onCancel = {()=>{
                    this.setState({
                        showModal2:false
                    })
                }} okText='确认' cancelText='取消'>
                    <p>这里是zq做的页脚弹窗测试</p>
                </Modal>
                
                <Modal title='顶部20px弹窗' visible = {this.state.showModal3} onCancel = {()=>{
                    this.setState({
                        showModal3:false
                    })
                }} okText='确认' cancelText='取消' style={{top:20}}>
                    <p>这里是zq做的20px弹窗测试</p>
                </Modal>

                <Modal title='水平居中弹窗' visible = {this.state.showModal4} onCancel = {()=>{
                    this.setState({
                        showModal4:false
                    })
                }} okText='确认' cancelText='取消' style={{top:20}} centered>
                    <p>这里是zq做的水平居中弹窗测试</p>
                </Modal>

                <Card title='信息提示' className='card-warp'>
                    <Button onClick={this.confirm}>Confirm</Button>
                    <Button onClick={this.info}>Info</Button>
                    <Button onClick={this.success}>Success</Button>
                    <Button onClick={this.error}>Error</Button>
                    <Button onClick={this.warming}>Warming</Button>
                </Card>
            </div>
        );
    }
}