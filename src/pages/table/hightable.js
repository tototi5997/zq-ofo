import React from 'react'
import {Button, Card,message,Table} from 'antd'
import axios from './../../axios/index'
import utils from './../../utils/utils'
import { DeleteOutlined,PlusOutlined,CloseOutlined,CheckOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';

export default class HighForm extends  React.Component{
    state={

    }

    //动态获取表格数据
    request =()=>{
        
        axios.ajax({
            url:'/table/high',
            data:{
                params:{
                    page:1
                }
            }
        }).then((res)=>{
            if(res.code == '0'){
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    
                    dataSource2:res.result.list,
                    pagination:utils.pagination(res,(current)=>{
                        //to do
                    })
                })
            }
        })
    }


    componentDidMount(){
        this.request();
    }
    
    //删除方法
   handleDelete=()=>{
   
        // let id = item.id;
        Modal.confirm({
            title:'确认',
            conten:'您确定要删除这条数据吗？',
            onOk:()=>{
                message.success("删除成功")
                this.request();
            }
        });
        
    
   }

    render(){

        const columns = [
            {
                title:'id',
                dataIndex:'id',
                sorter:(a,b)=> a.id-b.id,
            },
            {
                title:'用户名',
                dataIndex:'userName',
                sorter:(a,b)=>a.userName.length-b.userName.length
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return(
                        sex == 1?'男':'女'
                    )
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':"风华浪子",
                        '2':"咸鱼一条",
                        '3':"北大才子",
                        '4':"百度FE",
                        '5':"IT精英"
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1':"划水",
                        '2':"摸鱼",
                        '3':"当混子",
                    }
                    return config[interest]
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
            },
            {
                title:'地址',
                dataIndex:'address',
            },
            {
                title:'早起时间',
                dataIndex:'time',
            }
        ]

        const columns2 = [
            {
                title:'id',
                dataIndex:'id',
                sorter:(a,b)=> a.id-b.id,
                fixed:'left',
                width:120
            },
            {
                title:'用户名',
                dataIndex:'userName',
                sorter:(a,b)=>a.userName.length-b.userName.length,
                fixed:'left',
                width:120
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return(
                        sex == 1?'男':'女'
                    )
                },
                width:120
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':"风华浪子",
                        '2':"咸鱼一条",
                        '3':"北大才子",
                        '4':"百度FE",
                        '5':"IT精英"
                    }
                    return config[state];
                },
                width:120
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1':"划水",
                        '2':"摸鱼",
                        '3':"当混子",
                    }
                    return config[interest]
                },
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'生日',
                dataIndex:'birthday',
                width:120
            },
            {
                title:'地址',
                dataIndex:'address',
                width:120
            },
            {
                title:'早起时间',
                dataIndex:'time',
                width:120
            }
        ]

        const columns3 = [
            {
                title:'id',
                dataIndex:'id',
                sorter:(a,b)=> a.id-b.id,
            },
            {
                title:'用户名',
                dataIndex:'userName',
                sorter:(a,b)=>a.userName.length-b.userName.length
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return(
                        sex == 1?'男':'女'
                    )
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':"风华浪子",
                        '2':"咸鱼一条",
                        '3':"北大才子",
                        '4':"百度FE",
                        '5':"IT精英"
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        '1':"划水",
                        '2':"摸鱼",
                        '3':"当混子",
                    }
                    return config[interest]
                }
            },
            {
                title:'生日',
                dataIndex:'birthday',
            },
            {
                title:'地址',
                dataIndex:'address',
            },
            {
                title:'操作',
                render:(item)=>{
                    return(<div>
                    <Button onClick={(item)=>{this.handleDelete(item)}} style={{marginLeft:10}}><DeleteOutlined /></Button>
                    <Button style={{marginLeft:10}}><PlusOutlined /></Button> 
                    <Button style={{marginLeft:10}}><CloseOutlined /></Button> 
                    <Button style={{marginLeft:10}}><CheckOutlined /></Button> 
                    </div> 
                    )
                }
            }
        ]


        return(
            <div>
                <Card title='头部固定' className='card-warp'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pageination={false}
                        scroll={{y:240}}
                    ></Table>
                </Card>
                <Card title='左侧固定' className='card-warp'>
                    <Table
                    bordered
                    columns={columns2}
                    dataSource={this.state.dataSource2}
                    pageination={false}
                    scroll={{x:1450}}
                    >
                    </Table>
                </Card>
                <Card title='操作表格' className='card-warp'>
                    <Table
                    bordered
                    columns={columns3}
                    dataSource={this.state.dataSource2}
                    pageination={false}
                    >

                    </Table>
                </Card>
            </div>
        )
    }
}