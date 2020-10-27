import React from 'react'
import {Button, Form,Input,message} from 'antd'
import FormItem from 'antd/lib/form/FormItem';

const FromItem  = Form.Item;
export default class TestForm extends React.Component{
    state={}
    
    //onfinish方法
    onFinish = (values)=>{
        message.info(`用户名：${values.username}`)
        console.log(values)
    }
    //onFinishFailed方法
    onFinishFailed=(errorinfo)=>{
        console.log('errorinfo:'+errorinfo)
    }
    render(){
        return(
            <div>
                <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <FormItem
                    label='账号'
                    name='username'
                    >
                        <Input placeholder='请输入账号'></Input>
                    </FormItem>
                    <FormItem
                    label='密码'
                    name='password'>
                        <Input type='password' placeholder='请输入密码'></Input>
                    </FormItem>
                    <Button htmlType='submit'>登录</Button>
                </Form>
            </div>
        );
    }
}