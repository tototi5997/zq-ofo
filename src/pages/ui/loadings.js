import React from 'react'
import {Spin,Card,Button,Alert, Switch} from 'antd'
import {LoadingOutlined,RedoOutlined,SyncOutlined} from '@ant-design/icons'
 
export default class Loadings extends React.Component{
    state = {
        loading:false
    }
    //点击加载方法
    handleChange =(value)=>{
        this.setState({
            loading: value
        });
    }
    
    render(){
        const anticon1 = <LoadingOutlined spin/>
        const anticon2 = <RedoOutlined spin/>
        return(
            <div>
                <Card title='Spin用法' className='card-warp'>
                    <Spin size='small' style={{marginRight:30}}/>
                    <Spin size='middle' style={{marginRight:30}}/>
                    <Spin size='large'  style={{marginRight:30}}/>
                    <Spin size = 'small' indicator={anticon1} style={{marginRight:30}}/>
                    <Spin size = 'middle' indicator={anticon1} style={{marginRight:30}}/>
                    <Spin size = 'large' indicator={anticon1} style={{marginRight:30}}/>
                    <Spin size = 'small' indicator={anticon2} style={{marginRight:30}}/>
                    <Spin size = 'middle' indicator={anticon2} style={{marginRight:30}}/>
                    <Spin size = 'large' indicator={anticon2} style={{marginRight:30}}/>
                    <Spin indicator={<SyncOutlined spin/>} />
                </Card>
                <Card title='内容遮罩' className='card-warp'>
                   
                    <Alert message="React"
                    description='欢迎来到zq设计的内容遮罩Loading'
                    type='warning'
                    />
                    <Spin tip='Loading...'>
                        <Alert message="React"
                        description='欢迎来到zq设计的内容遮罩Loading'
                        type='info'
                    />
                    </Spin>

                    <Spin tip='加载中...' spinning={this.state.loading}>
                        <Alert message="React"
                        description='欢迎来到zq设计的内容遮罩Loading'
                        type='info'
                    />
                    </Spin>
                    <div style={{marginTop:20}}>
                        Loading state:
                        <Switch checked={this.state.loading} onChange={this.handleChange}></Switch>
                    </div>
                </Card>
            </div>
        );
    }
}