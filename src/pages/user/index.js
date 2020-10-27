import React from 'react'
import { Card,DatePicker,Form, Input,Select,message, Button, Table,Modal, Radio } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group';
import {PlusOutlined,EditOutlined,DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from './../../axios/index'
import utils from './../../utils/utils'
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class User extends React.Component{
    constructor(props){
        super(props)
        this.state={}
        // this.userForm = React.createRef();
    }
    
    
    
    render(){
        return(
            <div>
                <QueryUser/>
                <UserForm />
            </div>
        );
    }
}

//查询表单
class QueryUser extends React.Component{

    //提交表单数据
    formSubmit=(values)=>{
        if(values.username == undefined){message.error('请先输入相关信息')}
        else{
            message.info(`用户名：${values.username} 用户手机号：${values.mobile} 入职日期：${values.datein}`)
        }
    }
    //清空表单数据
    handleClear=(e)=>{
        this.refs.myFrom.resetFields();
    }

    render(){
        return(
            <Card className='card-warp'>
                <Form layout='inline' onFinish={this.formSubmit} ref='myFrom'>
                    <FormItem
                    label='用户名'
                    name='username'
                    >
                        <Input placeholder='请输入用户名'></Input>
                    </FormItem>
                    <FormItem
                    label='用户手机号'
                    name='mobile'
                    >
                        <Input placeholder='请输入用户名'></Input>
                    </FormItem>
                    <FormItem
                    label='请选择入职日期'
                    name='datein'
                    >
                        <DatePicker></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button type='primary' htmlType='submit' style={{marginLeft:15}}>查询</Button>
                        <Button onClick={this.handleClear}>重置</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

//user信息表
class UserForm extends React.Component{
    
    userForm = React.createRef();

    state={
        userInfo:{}
    }
    
    params={ page:1}

    //请求userlist
    requsetUserlist=()=>{
        let _this = this;
        axios.ajax({
            url:'/table/userlist',
            data:this.params.page
        }).then((res)=>{
           this.setState({
               userlist:res.result.list.map((item,index)=>{
                   item.key = index;
                   return item;
               }),
               pagination:utils.pagination(res,(current)=>{
                _this.params.page = current;
                _this.requsetUserlist();
            })
           })
        })
    }

    componentDidMount(){
        this.requsetUserlist();
    }

    传递参数实现增删改查
    handleOperate=(type)=>{
        let item = this.state.selectedItem;
        console.log(type)
        if(type == 'create'){
            this.setState({
                type,
                isVisable:true,
                title:'创建用户'
            })
        }else if(type == 'edit'){
            
            if(!item){
                message.error('请先选择用户！')
                return;
            }else{
            this.setState({
                type,
                isVisable:true,
                title:'修改用户',
                userInfo:item
            })
           console.log(item)
            }
        }else if(type=='detail'){
            if(!item){
                message.error('请先选择用户！')
                return;
            }else{
            this.setState({
                type,
                isVisable2:true,
                title:'用户详情',
                userInfo:item
            })
            }
        }else{if(!item){
            message.error('请先选择用户！')
            return;
        }else{
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'确认删除当前选中用户？',
                onOk(){
                    message.success('删除成功！')
                    _this.setState({
                        isVisable:false
                    })
                    _this.requsetUserlist();
                }
            })
        }
        }
        
    }
    // handleShowModal=()=>{
    //     this.setState({
    //         isVisable:true
    //     })
    // }
    //增加用户中的submit方法
    handleSubmit=()=>{
        let type = this.state.type;
        let data = this.userForm.current.getFieldsValue();
        // console.log(type);
        // console.log(data);
        if(type == 'create'){
            axios.ajax({
                url:'/table/add',
                data:{
                    params:data
                }
            }).then((res)=>{
                if(res.code == 0){
                    this.setState({
                        isVisable:false ,
                    })
                }})
            message.success('用户创建成功！')
            this.userForm.current.resetFields();
            // this.requsetUserlist();
        }else if(type == 'edit'){
            this.userForm.current.resetFields();
            message.success('用户修改成功！')
            this.setState({
                isVisable:false
            })
        }else if(type== 'delete'){
            message.info('用户删除成功！')
        }else{
            this.userForm.current.resetFields();
        }    
    }
    //获取状态
    getState=(state)=>{
        return{
            "1":"咸鱼一条",
            "2":"技术大佬",
            "3":"业界精英"
        }[state]
    }
    render(){
        let userInfo = this.state.userInfo || {};
        const formItemLayout = {
            labelCol : {span:5},
            wrapperCol:{span:15}
        }
        const usercoumns =[
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return(
                        sex == 1?"男":"女"
                    )   
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        "1":"咸鱼一条",
                        "2":"技术大佬",
                        "3":"业界精英"
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest){
                    let config = {
                        "1":"打篮球",
                        "2":"打羽毛球",
                        "3":"打乒乓球"
                    }
                    return config[interest];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'联系地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ]
        const rowSelection ={
            type:"radio",
            selectedRowKeys:this.state.selectedRowKeys
        }

        return(
            <div>
                <Card className='card-warp'>
                    <ButtonGroup style={{marginBottom:10}}>
                    <Button type='default' onClick={()=>this.handleOperate('create')}><PlusOutlined />添加用户</Button>
                    <Button type='default' onClick={()=>this.handleOperate('detail')}><ExclamationCircleOutlined />用户详情</Button>
                    <Button type='default' onClick={()=>this.handleOperate('edit')}><EditOutlined />修改用户</Button>
                    <Button type='danger' onClick={()=>this.handleOperate('delete')}><DeleteOutlined />删除用户</Button>
                    </ButtonGroup>

                    <Table
                    bordered 
                    selectedItem = {this.state.selectedItem}
                    rowSelection={rowSelection}
                    pagination={this.state.pagination}
                    columns={usercoumns}
                    dataSource={this.state.userlist}
                    onRow={(record,index)=>{
                        return{
                            onClick:()=>{
                                this.setState({
                                    selectedRowKeys:[index],
                                    selectedItem:record
                                })
                            
                            }
                        }
                    }}
                    />
                    
                </Card>
                
                    <div>
                        <Modal 
                            title={this.state.title}
                            visible={this.state.isVisable}
                            onOk={this.handleSubmit}
                            onCancel={()=>{
                                this.setState({
                                    isVisable:false 
                                })
                            }}
                            >
                                <Form type={this.state.type}  ref={this.userForm} userInfo={this.state.userInfo}> 
                                    <FormItem name='user_name' label="用户名" {...formItemLayout} initialValue={userInfo.username}>
                                        <Input type='text' placeholder='请输入用户名'/>
                                    </FormItem>
                                    <FormItem name='sex' label="性别" {...formItemLayout} initialValue={userInfo.sex}>
                                        <RadioGroup>
                                            <Radio value={1}>男</Radio>
                                            <Radio value={2}>女</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem name='state' label="状态" {...formItemLayout} initialValue={userInfo.state}>
                                        <Select>
                                            <Option value={1}>咸鱼一条</Option>
                                            <Option value={2}>技术大佬</Option>
                                            <Option value={3}>业界精英</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem name='birthday' label='生日'  {...formItemLayout} initialValue={moment(userInfo.birthday )}>
                                        <DatePicker></DatePicker>
                                    </FormItem>
                                    <FormItem name='address' label='联系地址'  {...formItemLayout} initialValue={userInfo.address}>
                                        <TextArea rows={3} placeholder='请输入联系地址'></TextArea>
                                    </FormItem>
                                </Form>
                        </Modal>
                    </div>

                    <div>
                        <Modal 
                            title={this.state.title}
                            visible={this.state.isVisable2}
                            onOk={this.handleSubmit}
                            onCancel={()=>{
                                this.setState({
                                    isVisable2:false 
                                })
                            }}
                            footer={null}
                            >
                                <Form type={this.state.type}  ref={this.userForm} userInfo={this.state.userInfo}> 
                                    <FormItem name='user_name' label="用户名" {...formItemLayout} initialValue={userInfo.username}>
                                    {userInfo.username}
                                    </FormItem>
                                    <FormItem name='sex' label="性别" {...formItemLayout} initialValue={userInfo.sex}>
                                        {userInfo.sex == 1?'男':'女'}
                                       
                                    </FormItem>
                                    <FormItem name='state' label="状态" {...formItemLayout} initialValue={userInfo.state}>
                                        {this.getState(userInfo.state)}
                                    </FormItem>
                                    <FormItem name='birthday' label='生日'  {...formItemLayout} initialValue={moment(userInfo.birthday )}>
                                    {userInfo.birthday }
                                    </FormItem>
                                    <FormItem name='address' label='联系地址'  {...formItemLayout} initialValue={userInfo.address}>
                                    {userInfo.address}
                                    </FormItem>
                                </Form>
                        </Modal>
                    </div>
            </div>
        );
    }
}

