import React from 'react'
import {Card,Button,Table,message,Modal,Form, Input,Select,Tree,Transfer} from 'antd'
import Utils from './../../utils/utils'
import axios from './../../axios/index'
import menuConfiger from './../../config/menuConfig'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class Permission extends React.Component{
    userForm = React.createRef();   //创建ref

    state={
        // usetList:[]
        isVisable:false,
        isPromission:false,
        isUserVisable:false,
        detailInfo:{}
    }
    params={
        page:1
    }

    componentDidMount(){
        this.requsetList();
    }

    //申请接口
    requsetList=()=>{
        axios.ajax({
            url:'/table/role/list',     //注意接口完整性
            data:this.params.page       
            
        }).then((res)=>{
            if(res.code == '0'){        //获取成功
                this.setState({
                    //定义一个usetList数组来获取res中的用户信息
                    usetList:res.result.item_list.map((item,index)=>{
                        item.key=index;     //每项数据需要一个key
                        return item;
                    })
                })
            }
        })
        // console.log(this.state.usetList)
    }

    //创建用户
    handleCreate=()=>{
        this.setState({
            isVisable:true      //显示模态框
        })
    }
    //提交创建表单
    handleSubmit=()=>{
        let userInfo = this.userForm.current.getFieldsValue();
        console.log(userInfo)
        message.success(`新用户：${userInfo.role_name} 创建成功！`)
        this.setState({isVisable:false})
        this.userForm.current.resetFields();   //重置表单
    }
    //设置权限按钮
    handlePermission=()=>{
        let item = this.state.selectItem;   //获取选中项
        if(!item){
            message.error('请先选择需要设置权限的用户！')
            return;
        }else{
            this.setState({
                //显示模态框
                isPromission:true,
                detailInfo:item      //把选中项的信息用detailInfo存储起来 
            })
            // console.log(item)
        }
        
    }
    //提交权限表单
    handlePreSubmit=()=>{
        this.setState({
            isPromission:false
        })
        message.success('权限设置成功！')
    }
    //渲染modal框中的Nodetree
    renderTreeNodes=(data)=>{
        return data.map((item)=>{           //返回一个新的进过处理的数组
            if(item.children){              //如果item有子节点
                return <TreeNode title={item.title} key={item.key} >
                    {this.renderTreeNodes(item.children)}        {/*继续遍历子节点*/}
                </TreeNode>
            }else{
                return <TreeNode title={item.title} key={item.key}></TreeNode>
            }
        })
    }

    //权限树中多选框选中事件
    onCheck=(checkedKeys)=>{
        
    } 
    //用户授权
    handleUserAuth=()=>{
        let item  = this.state.selectItem;
        if(!item){
            message.error('请选择一个用户！')
        }else{
            this.getRoleUserList(item.id);
        }
    } 
    //调用接口角色权限列表
    getRoleUserList=(id)=>{
        let item = this.state.selectItem    //获取选中的item
        axios.ajax({
            url:'/table/role/user_list',
            data:{
                params:{id}
            }
        }).then((res)=>{
            if(res.code == '0'){
                this.setState({
                    isUserVisable:true,      //角色权限模态框
                    dataAuthInfo:item
                })
                this.getAuthUserList(res.result);   //传递数据到筛选方法中
                console.log(res)
            }
        })
    }
    //筛选目标用户
    getAuthUserList = (dataSource)=>{
        const mockData = [];        //穿梭框的dataSource
        const targetKeys = [];      //穿梭框的targetkeys
        if(dataSource && dataSource.length>0){
            for(let i=0;i<dataSource.length;i++){
                const data={
                    key:dataSource[i].user_id,              //id作为key
                    title:dataSource[i].user_name,          
                    status:dataSource[i].status
                }            
                if(data.status == "1"){
                targetKeys.push(data.key);           //存到穿梭框的targetkeys，只需要保存key值
                }
                mockData.push(data);         //存到穿梭框的dataSource，需要保存所有的数据
            }
            this.setState({
                mockData,           //循环结束保存这两个值
                targetKeys
            })
        }
    }

    //提交用户授权表单
    handleUserSubmit=()=>{
        let data = {};
        data.user_id = this.state.targetKeys;
        data.role_id = this.state.selectItem.id;
        axios.ajax({
            url:'/table/role/userlist_success',
            data:data
        }).then((res)=>{
            if(res.code == 0){
                message.success('授权成功！')
                this.setState({
                    isUserVisable:false
                })
            }
        })
    }

    render(){
        
        const columns=[
            {
                title:'角色ID',
                dataIndex:'id'
            },
            {
                title:'角色名称',
                dataIndex:'role_name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:Utils.formateDate
            },
            {
                title:'角色状态',
                dataIndex:'status',
                render(status){
                    return status == 1? "启用":"停用"
                }
            },
            {
                title:'授权时间',
                dataIndex:'authorize_time',
                render:Utils.formateDate
            },
            {
                title:'授权人',
                dataIndex:'authorize_user_name'
            }
        ]
        //选择类型为单选
        const rowSelection = {
            type:'radio',
            selectedRowKeys:this.state.selectedRowKeys,
        }
        //模态框表格样式
        const formLayout = {
            labelCol:{span:5},
            wrapperCol:{span:10}
        }
        return(
            <div>
                <Card title='权限设置' className='card-warp'>
                    <Button onClick={this.handleCreate}>创建角色</Button>
                    <Button onClick={this.handlePermission}>设置权限</Button>
                    <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>

                    <Table
                        bordered
                        rowSelection={rowSelection}
                        style={{marginTop:15}}
                        columns={columns}
                        dataSource={this.state.usetList}
                        onRow={(record,index)=>{
                            return{
                                onClick:()=>{
                                    this.setState({
                                        selectedRowKeys:[index],
                                        selectItem:record
                                    })
                                    message.info(`授权人：${record.authorize_user_name} 状态：${record.status}`)
                                }
                            }
                        }}
                    ></Table>
                </Card>
                 {/* 创建员工弹框*/}
                <Modal visible={this.state.isVisable}
                onCancel={()=>{this.setState({isVisable:false})}}
                title='创建员工'
                onOk={this.handleSubmit}
                >
                    <Form ref={this.userForm}>
                        <FormItem label='角色名称'
                        name='role_name'
                        {...formLayout}
                        ><Input placeholder='请输入角色名称'></Input></FormItem>
                        <FormItem label='状态'
                        name='role_status'
                        {...formLayout}
                        >
                            <Select>
                                <Option value='1'>启用</Option>
                                <Option value='0'>停用</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
                 {/* 授权弹框        */}
                <Modal title='角色权限设置' visible={this.state.isPromission}
                onCancel={()=>{this.setState({isPromission:false})}}
                onOk={this.handlePreSubmit}
                >
                    <Form>
                        <FormItem label='角色名称' {...formLayout}><Input disabled placeholder={this.state.detailInfo.role_name}/></FormItem>
                        <FormItem label='状态' {...formLayout} >
                            <Select defaultValue={1}>
                                <Option value={1}>启用</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        </FormItem>
                        <Tree
                        checkable
                        defaultExpandAll
                        onCheck={(checkedKeys)=>{
                            this.onCheck(checkedKeys)
                        }}
                        checkedKeys={this.state.detailInfo.menus}
                        >
                            <TreeNode title='平台权限'>
                                {this.renderTreeNodes(menuConfiger)}
                            </TreeNode>
                        </Tree>
                    </Form>
                </Modal>
                 {/* 用户授权弹框       */}
                 <Modal
                 title='用户授权'
                 visible={this.state.isUserVisable}
                 onCancel={()=>{this.setState({isUserVisable:false})}}
                 onOk={this.handleUserSubmit}
                 >
                <RoleAuthForm ref={this.AuthForm}
                mockData={this.state.mockData}
                targetKeys={this.state.targetKeys}
                dataAuthInfo = {this.state.dataAuthInfo}
                patchUserInfo = {(targetKeys)=>{
                    this.setState({targetKeys})
                }}
                ></RoleAuthForm>     
                </Modal>       
            </div>
        );
    }
}

class RoleAuthForm extends React.Component{

    //过滤方法
    filterOption=(inputValue, option)=>{
        return option.title.indexOf(inputValue) > -1;
    }
    //改变选项框方法
    handleChange=(targetKeys)=>{
        this.props.patchUserInfo(targetKeys);
    }
    render(){
        const dataAuthInfo = this.props.dataAuthInfo;
        return(
            
                <Form>
                    <FormItem
                    label='角色名称'
                    name='rolename'
                    disabled
                    style={{width:400}}
                    ><Input disabled placeholder={dataAuthInfo.role_name}></Input></FormItem>
                    <FormItem>
                    <Transfer
                        dataSource={this.props.mockData}
                        titles={['待选用户', '已选用户']}
                        showSearch
                        searchPlaceholder='请输入用户名'
                        targetKeys={this.props.targetKeys}
                        filterOption={this.filterOption}
                        style={{ marginBottom: 16 }}
                        render={item => item.title}
                        onChange={this.handleChange}
                        />

                    </FormItem>
                </Form>
            
        );
    }
}