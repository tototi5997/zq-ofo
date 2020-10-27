import React from 'react'
import {Button, Card,Checkbox,Form, Input,message} from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class FormLogin extends React.Component{
    state={
        stu1:'请输入账号',
        stu2:'请输入密码'
    }
    handleLogin=()=>{
        message.success('Login success !');
    }
    render(){
        // const {getFieldDecorator} = this.props.from;
        return(
            <div>
                <Card title='登录行内表单' className='card-warp'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={this.state.stu1}></Input>
                        </FormItem>
                        <FormItem>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder={this.state.stu2} type='password'></Input>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleLogin}>Login</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title='登录垂直表单' className='card-warp'>
                    <Form initialValues={{remember:true}}>
                        <FormItem
                            name='username'
                            label='账号:'
                            rules={[
                                {
                                    required:true,
                                    message:'请输入你的账号',
                                    
                                },
                                {
                                    min:5,max:10,
                                    message:'用户账号长度在5-10之间'
                                }
                            ]}
                        >
                           <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{width:300}} placeholder='请输入账号'></Input> 
                        </FormItem>
                        <FormItem
                            name='password'
                            label='密码: '
                            rules={[
                                {
                                    required:true,
                                    message:'请输入你的密码',
                                    
                                }
                            ]}
                        >
                           <Input prefix={<LockOutlined className="site-form-item-icon" />} style={{width:300}} placeholder='请输入密码' type='password'></Input> 
                        </FormItem>
                        <FormItem name='remember' valuePropName='checked'>
                            <Checkbox>Remember me</Checkbox>   
                        </FormItem>
                        <FormItem>
                            <Button type='primary' htmlType='submit'>Login</Button>    
                        </FormItem>
                       
                    </Form>
                </Card>
            </div>
        );
    }
}
