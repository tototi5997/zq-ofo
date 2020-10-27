import React from 'react'
import {Card,Button,Radio } from 'antd'
import { SearchOutlined,PlusCircleOutlined,EditOutlined,DeleteOutlined,DownloadOutlined,CloseOutlined
,LeftOutlined,RightOutlined } from '@ant-design/icons';
import './ui.less'

export default class Buttons extends React.Component{
    

    state = {
        loading : true,
        size:'default'
    }
    //关闭loading
    handleCloseLoading = ()=>{
        this.setState({
            loading:false
        });
    }
    //单选框改变按钮的大小
    handleChange = (e) =>{
        this.setState({
            size: e.target.value
        });
    }

    render(){
        // const {size} = this.state;
        return(
            <div>
                <Card title='基础按钮' className='card-warp'>
                    <Button type='primary'>Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type='dashed'>Imooc</Button>
                    <Button disabled>Imooc</Button>
                    <Button type='link'>Imooc</Button>
                </Card>
                <Card title='图形按钮' className='card-warp'>
                    <Button icon={<PlusCircleOutlined />}>创建</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button shape='circle' icon={<SearchOutlined />}></Button>
                    <Button icon={<SearchOutlined />} type='primary'>搜索</Button>
                    <Button type='primary' icon={<DownloadOutlined />}>下载</Button>
                </Card>
                <Card title='Loading按钮' className='card-warp'>
                    <Button type='primary' loading={this.state.loading} onClick='this.handleClickLoading'>确定</Button>
                    <Button type='primary' shape='circle' loading></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape='circle' loading></Button>
                    <Button type='primary' onClick={this.handleCloseLoading} shape='circle' icon={<CloseOutlined />}></Button>
                </Card>
                <Card title='按钮组' className='card-warp'>
                    <Button.Group>
                        <Button icon={<LeftOutlined />} style={{marginRight:0}}>返回</Button>
                        <Button icon={<RightOutlined />}>前进</Button>
                    </Button.Group>
                </Card>
                <Card title='按钮尺寸' className='card-warp'>
                    <Radio.Group value={this.state.size} onChange={this.handleChange.bind(this)}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type='primary' size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type='dashed' size={this.state.size}>Imooc</Button>
                    <Button disabled size={this.state.size}>Imooc</Button>   

                </Card>
            </div>
        );
    }
}