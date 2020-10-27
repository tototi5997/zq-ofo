import React from 'react'
import {Button, Card,message,Table} from 'antd'
import axios from './../../axios/index'
import Modal from 'antd/lib/modal/Modal'
import utils from './../../utils/utils'

export default class BasicForm extends React.Component{
    state={
        dataSource2:[]
    }

    componentDidMount(){
        const dataSource =[
            {
                id:'0',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2020-10-05',
                address:'湖北省武汉市洪山区',
                time:'08:00'
            },
            {
                id:'1',
                userName:'Marry',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2020-10-06',
                address:'湖北省武汉市洪山区',
                time:'08:00'
            },
            {
                id:'2',
                userName:'Tom',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2020-10-07',
                address:'湖北省武汉市洪山区',
                time:'08:00'
            },
        ]
        dataSource.map((item,index)=>{
            item.key = index;
        })
        this.setState({ dataSource:dataSource})
        this.request();
    }
    //动态获取表格数据
    request =()=>{
        
        axios.ajax({
            url:'/table/table',
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
   
    //删除多选表单信息
    handleDelete=(()=>{
        let rows= this.state.selectedRows; 
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{message.success('删除成功！')}
        })
        this.setState({
            selectedRowKeys:[],
            selectedRows:null
        })
    })
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
        const {selectedRowKeys} = this.state;
        //rowSelection是一个对象,单选对象
        const rowSelection={
            type:"radio",
            selectedRowKeys
        }
        //多选
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                    
                })
            }
        }
        return(
            <div>
                <Card title='基础表格' className='card-warp'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pageination={false}
                    ></Table>
                </Card>
                <Card title='动态表格' className='card-warp'>
                    <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pageination={false}
                    >
                    </Table>
                </Card>
                <Card title='MOCK-单选' className='card-warp'>
                    <Table
                    rowSelection={rowSelection}         //单选or多选？
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pageination={false}
                    // onRow={(record,index) => {          //传递当前项的信息和key值
                        // return {
                        //   onClick: () => {
                        //       let selectkey = [index];      //用selectkey保存当前key值
                        //       Modal.info({
                        //           title:'UserInfo',
                        //           content:`用户名：${record.userName} 用户爱好：${record.interest}`
                        //       })
                        //       this.setState({
                        //           selectedRowKeys:selectkey,    //selectedRowKeys为选中项key值
                        //           selectedItem : record
                        //       })
                        //   }, // 点击行
                        // };
                    //   }}
                    >

                    </Table>
                </Card>

                <Card title='MOCI-多选' className='card-warp'>
                    <div><Button onClick={this.handleDelete} style={{margin:15}}>删除</Button></div>
                      <Table
                      columns={columns}
                      dataSource={this.state.dataSource2}
                      rowSelection={rowCheckSelection}
                      pageination={false}
                      >

                      </Table>
                </Card>
                <Card title='MOCI-分页' className='card-warp'>

                      <Table
                      columns={columns}
                      dataSource={this.state.dataSource2}
                    //   rowSelection={rowCheckSelection}
                      pagination={this.state.pagination}
                      >

                      </Table>
                </Card>
            </div>
        );
    }
}