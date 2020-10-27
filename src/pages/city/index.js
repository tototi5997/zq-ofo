import React from 'react';
import {Card,Button,Form, Select, Table, Radio,message} from 'antd'
import axios from './../../axios/index'
import utils from './../../utils/utils'
// import { render } from 'less';
import Modal from 'antd/lib/modal/Modal';
// import { render } from 'less';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component{

    
    render(){
        return(
            <div>
                <FilterForm></FilterForm>
                <CityForm></CityForm>
            </div>
        )
    }
}

//表单渲染
class FilterForm extends React.Component{
    render(){
        
        return(
            <Form layout='inline' style={{marginBottom:20,marginLeft:20}}>
                <FormItem label="城市" name='city_id'>
                            <Select placeholder='请选择城市'>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                                <Option value='3'>深圳市</Option>
                            </Select>
                </FormItem>
                <FormItem label="用车模式" name='mode'>
                            <Select placeholder='全部'>
                                <Option value=''>全部</Option>
                                <Option value='1'>指定停车点模式</Option>
                                <Option value='2'>禁停区模式</Option>
                            </Select>
                </FormItem>
                <FormItem label="营运模式" name='op_mode'>
                            <Select placeholder='全部'>
                                <Option value=''>全部</Option>
                                <Option value='1'>自营</Option>
                                <Option value='2'>加盟</Option>
                            </Select>
                </FormItem>
                <FormItem label="加盟商授权状态" name='auth_status'>
                            <Select placeholder='全部'>
                                <Option value=''>全部</Option>
                                <Option value='1'>已授权</Option>
                                <Option value='2'>未授权</Option>
                            </Select>
                </FormItem>
                <FormItem>
                    <Button type='primary' style={{marginLeft:100}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}


//按钮+表格
class CityForm extends React.Component{
    state = {
        list : [],
        isShowOpenCity:false,
    }
    //定义一个Params，默认第一页
    params = {
        page:1
    }
    formRef = React.createRef();

    //城市开通提交
    handSubmit = (e) => {
        // let userInfo = this.formRef.current.getFieldsValue(values);
        // console.log(userInfo);
        message.info(e+"已经被开通！")
        this.setState({
            isShowOpenCity:false
        })

    };
    //
    componentDidMount(){
        this.requestList(); 
    }

    //加载axios接口
    requestList(){
        let _this = this;
        axios.ajax({
            url:'/table/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            this.setState({
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
    
    //点击开通城市
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity:true
        })
    }
    // changeData(e){
    //     console.log(e)
        
    // }
    render(){
        const formItemLayout ={
            labelCol:{
                span:6,
            },
            wrapperCol:{
                span:12,
            }
        }
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            },
            {
                title:'城市名称',
                dataIndex:'name'
            },
            {
                title:'用车模式',
                dataIndex:'mode',
                render(mode){
                    return mode == 1?'指定停车点':'禁停区'
                }
            },
            {
                title:'运营模式',
                dataIndex:'op_mode',
                render(op_mode){
                    return op_mode == 1?'自营':'加盟'
                }
            },
            {
                title:'授权加盟商',
                dataIndex:'franchisee_name'
            },
            {
                title:'城市管理员',
                dataIndex:'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name
                    }).join(',');
                }
            },
            {
                title:'城市开通时间',
                dataIndex:'open_time'
            },
            {
                title:'操作时间',
                dataIndex:'update_time',
                render:utils.formateDate
            },
            {
                title:'操作人',
                dataIndex:'sys_user_name'
            },
        ]
        return(
            <div>
                <Card className='card-warp'>
                    <Button type='primary' onClick={this.handleOpenCity} style={{marginBottom:10}}>开通城市</Button>
                    <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    ></Table>
                </Card>
                <Modal
                    title='开通城市'
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity:false
                        })
                    }}
                    onOk={this.handSubmit}
                >
                    <Form ref={this.formRef}>
                        <FormItem {...formItemLayout} label='选择城市' >
                            <Select onChange={(e)=>{this.handSubmit(e)}}>
                                <Option value=''>全部</Option>
                                <Option value='1'>北京市</Option>
                                <Option value='2'>天津市</Option>
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout} label='运营模式'>
                            <Radio.Group>
                                <Radio value='1'>加盟</Radio>
                                <Radio value='2'>自营</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem label='用车模式' {...formItemLayout}>
                            <Select>
                                <Option value='1'>指定停车点</Option>
                                <Option value='2'>禁停区</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

