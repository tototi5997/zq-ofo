import React from 'react'
import {Card, Input,Radio,InputNumber,Select,Switch, DatePicker, TimePicker,Upload,message, Checkbox, Button } from 'antd'
import Form from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'
import { UserOutlined, LockOutlined,LoadingOutlined,PlusOutlined } from '@ant-design/icons';
import moment from 'moment'
import TextArea from 'antd/lib/input/TextArea';


const {Option} = Select;
const dateFormat = 'YYYY/MM/DD';
// const { loading, imageUrl } = this.state;
//     const uploadButton = (
//       <div>
//         {loading ? <LoadingOutlined /> : <PlusOutlined />}
//         <div style={{ marginTop: 8 }}>Upload</div>
//       </div>
//     );


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
export default class FormRegister extends React.Component{


    state={
        stu1:'请输入账号',
        stu2:'请输入密码',
        value:1,
        loading:false
    }
    //获取表单的值
    // handleClick=()=>{
    //     let userInfo = this.props.form.getFieldsValue();
    //     console.log(JSON.stringify(userInfo));
    // }
    //性别单选
    handleChange=(e)=>{
        this.setState({
            value:e.target.value
        });
    }
      
    //判断上传的图片的大小
     beforeUpload=(file)=> {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }
    //   handleChange = info => {
    //     if (info.file.status === 'uploading') {
    //       this.setState({ loading: true });
    //       return;
    //     }
    //     if (info.file.status === 'done') {
    //       // Get this url from response in real world.
    //       getBase64(info.file.originFileObj, imageUrl =>
    //         this.setState({
    //           imageUrl,
    //           loading: false,
    //         }),
    //       );
    //     }
    //   };
    uploadChange=(info)=>{
        if(info.file.status === 'uploading'){
            // this.setState({loading:true});
            return;
        }
        if(info.file.status === 'done'){
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                  imageUrl,
                  loading: false,
                }),
              );
        }
    }
    render(){
        const { loading, imageUrl } = this.state;
        const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        );
        const formItemLayout ={
            labelCol:{
                xs:24,
                sm:4
            },
            warpperCol:{
                xs:24,
                sm:16
            }
        }
        //定义一个偏移的栅格布局
        // const offsetLayout={
        //     warpperCol:{
        //         xs:24,
        //         sm:{
        //             span:12,
        //             offset:4
        //         }
        //     }
        // }
        return(
            <div>
                <Card title='注册表单' className='card-warp'>
                    <Form>
                        {/* 账号输入框 */}
                        <FormItem label='用户名' 
                        name='username'
                        rules={[
                            {
                            required:'true',
                            message:'用户名不能为空'
                            },
                            {
                                min:5,max:10,
                                message:'长度在5-10之间'
                            }
                        ]}
                        {...formItemLayout}
                        >
                            <Input style={{width:300}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder={this.state.stu1}></Input>
                        </FormItem>
                        {/* 密码输入框 */}
                        <FormItem label='密&nbsp;&nbsp;&nbsp;码' 
                        name='password'
                        rules={[
                            {
                            required:'true',
                            message:'密码不能为空'
                            },
                            {
                                min:5,max:10,
                                message:'长度在5-10之间'
                            }
                        ]}
                        {...formItemLayout}
                        >
                            <Input type='password' style={{width:300}} prefix={<LockOutlined className="site-form-item-icon" />} placeholder={this.state.stu2}></Input>
                        </FormItem>
                        {/* 性别选择按钮 */}
                        <FormItem
                            // name='sex'
                            label='性&nbsp;&nbsp;&nbsp;别'
                            // initialValue='1'
                            // rules={[
                            //     {
                            //         required:true
                            //     }
                            // ]}
                            {...formItemLayout}
                        >
                            <Radio.Group value={this.state.value} onChange={this.handleChange}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </FormItem>
                        {/* 年龄输入框 */}
                        <FormItem
                            name='age'
                            label='年&nbsp;&nbsp;&nbsp;龄'
                            {...formItemLayout}
                        >
                            <InputNumber min={18} max={100} defaultValue={18}/>
                        </FormItem>
                        {/* 当前状态选择下拉框 */}
                        <FormItem
                            name='role'
                            label='当前状态'
                            {...formItemLayout}
                        >
                            <Select defaultValue='student' style={{width:300}}>
                                <Option value='student'>在读学生</Option>
                                <Option value='leader'>公司白领</Option>
                                <Option value='stuff'>工薪阶级</Option>
                                <Option value='cityzien'>无业游民</Option>
                            </Select>
                        </FormItem>
                        {/* 爱好多选框 */}
                        <FormItem
                            name='gift'
                            label='爱好'
                            {...formItemLayout}
                        >
                            <Select
                                mode='multiple'
                                placeholder='选择你的爱好'
                                optionLabelProp='label'
                                style={{width:300}}
                            >
                                <Option value='sing' label='唱歌'>唱歌</Option>
                                <Option value='dance' label='跳舞'>跳舞</Option>
                                <Option value='study' label='学习'>学习</Option>
                                <Option value='playgame' label='打游戏'>打游戏</Option>
                                <Option value='paint' label='画画'>画画</Option>
                            </Select>
                        </FormItem>
                        {/* 是否已婚 */}
                        <FormItem
                            label='是否已婚'
                            {...formItemLayout}
                        >
                            <Switch checkedChildren='是' unCheckedChildren='否' defaultunChecked></Switch>
                        </FormItem>
                        {/* 生日时间选择框 */}
                        <FormItem label='生日' {...formItemLayout}>
                            <DatePicker defaultValue={moment('2000/02/02',dateFormat)} format={dateFormat}></DatePicker>
                        </FormItem>
                        {/* 家庭地址 */}
                        <FormItem
                            label='家庭地址'
                            {...formItemLayout}
                        >
                            <TextArea placeholder='请输入家庭地址' autoSize={{minRows:2,maxRows:6}} style={{width:300}}></TextArea>
                        </FormItem>
                        {/* 早起时间 */}
                        <FormItem
                            label='早起时间'
                            {...formItemLayout}
                        >
                            <TimePicker ></TimePicker>
                        </FormItem>
                        {/* 上传头像 */}
                        <FormItem
                            label='上传头像'
                            {...formItemLayout}
                        >
                            <Upload
                            name='uploadUser'
                            listType='picture-card'
                            showUploadList={true}
                            onChange={this.uploadChange}
                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </FormItem>
                        {/* 单选框 */}
                        <FormItem style={{marginLeft:110}}>
                            <Checkbox >我已经阅读了<a href='#'>相关条约</a></Checkbox>
                        </FormItem>
                        <FormItem style={{marginLeft:110}}>
                            <Button onClick={this.handleClick}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
