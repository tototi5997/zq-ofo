import React from 'react'
import {Card,Button,Form, Select, Table, DatePicker,message} from 'antd'
import axios from './../../axios/index'
import utils from './../../utils/utils'
import Modal from 'antd/lib/modal/Modal'

const FormItem = Form.Item;
const Option = Select.Option;


export default class Order extends React.Component{
    state={
        orderInfo:{},
        orderConfirmVisable:false
    }

    params ={
        page:1
    }


    //加载ajax请求调用mock数据
    requestList(){
        let _this = this;
        axios.ajax({
            url:'/table/order',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            this.setState({             //res返回的数据通过处理保存在list和pagination中，方便组件中调取
                list:res.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                }) , 
                pagination:utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    //点击提示modal弹框，并获取相关行程信息
    handleShowModal=()=>{
        let item = this.state.selecedItem;
        console.log(this.state.selecedItem)
        if(!item){
            Modal.error({
                title:'提示信息',
                content:'请先选择一条信息'
            })
        }else{
            axios.ajax({
                url:'/table/order/bike_info',
                data:{
                    params:1
                }
            }).then((res)=>{
                if(res.code == 0){
                    this.setState({
                        orderInfo:res.result,
                        orderConfirmVisable:true
                        
                    })
                    console.log(this.state.orderInfo)
                }
            })
        }
        
        
    }
    //onok事件
    handleFinishOrder=()=>{
        this.setState({
            orderConfirmVisable:false,
            selectedRowKeys:''
        })
        message.success('订单已结束！')
        this.requestList();
    }
    //订单详情跳转
    openOrderDetail = ()=>{
        let item = this.state.selecedItem;
        if(!item){
            Modal.error({
                title:'提示信息',
                content:'请先选择一条信息'
            })
        }else{
            window.open(`/#/common/order/detail/${item.id}`,'_blank')
        }

        
    }


    componentDidMount(){                
        this.requestList();
    }


    
    render(){
        //定义选中行
        const rowSelection = {
            type:'radio',
            selectedRowKeys:this.state.selectedRowKeys,
        }



        //结束行程表单样式
        const endLayout = {
            labelCol:{
                span:6
            }
        }
                //订单表表头
        const columns =[
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title:'车辆编号',
                dataIndex:'bike_sn'
            },
            {
                title:'用户名',
                dataIndex:'user_name'
            },
            {
                title:'手机号',
                dataIndex:'mobile'
            },
            {
                title:'里程',
                dataIndex:'distance'
            },
            {
                title:'行驶时长',
                dataIndex:'total_time'
            },
            {
                title:'状态',
                dataIndex:'status'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'订单金额',
                dataIndex:'total_free'
            },
            {
                title:'实付金额',
                dataIndex:'user_pay'
            },
        ]
        return(
            <div>
                <FilterForm></FilterForm>
                <Card className='card-warp'>
                    <div style={{marginBottom:15,marginRight:15}}>
                    <Button onClick={this.openOrderDetail}>订单详情</Button>
                    <Button onClick={this.handleShowModal}>结束订单</Button>
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.setState({
                                        selectedRowKeys:[index],
                                        selecedItem:record
                                    })
                                }
                            }
                        }}
                    ></Table>
                </Card>
                <Modal
                title='结束订单'
                visible={this.state.orderConfirmVisable}
                onCancel={()=>{
                    this.setState({
                        orderConfirmVisable:false 
                    })
                }}
                onOk={this.handleFinishOrder}
                >
                    <Form>
                        <FormItem {...endLayout} label='车辆编号'>{this.state.orderInfo.bike_sn}</FormItem>
                        <FormItem {...endLayout} label='剩余电量'>{this.state.orderInfo.battery+'%'}</FormItem>
                        <FormItem {...endLayout} label='形程开始时间'>{this.state.orderInfo.start_time}</FormItem>
                        <FormItem {...endLayout} label='当前位置'>{this.state.orderInfo.location}</FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

//表单渲染
class FilterForm extends React.Component{
    render(){
        
        return(
            <Form layout='inline' style={{marginBottom:20,marginLeft:20}} >
                <FormItem label="城市" name='city_id'>
                            <Select placeholder='请选择城市'>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                                <Option value='3'>深圳市</Option>
                            </Select>
                </FormItem>
                <FormItem label="订单时间" name='start_time'>
                            <DatePicker showTime format='YYYY-MM-DD HH:MM:SS'></DatePicker>
                </FormItem>
                
                <FormItem label='~' colon={false} name='end_time'>
                            <DatePicker showTime format='YYYY-MM-DD HH:MM:SS'></DatePicker>
                </FormItem>
                <FormItem label="订单状态" name='auth_status'>
                            <Select placeholder='全部'>
                                <Option value=''>全部</Option>
                                <Option value='1'>进行中</Option>
                                <Option value='2'>行程结束</Option>
                            </Select>
                </FormItem>
                <FormItem>
                    <Button type='primary' style={{marginLeft:20}} >查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
            
        );
    }
}