import React from 'react'
import Chlid from './Chlid'
import {Button} from 'antd'
// import 'antd/dist/antd.css'
import './index.less'
 export default class Life extends React.Component{
     constructor(props){
         super(props)
          this.state= {
              count:0
          }
     }

     //创建一个handLeAdd方法
     handleAdd = () =>{
         this.setState({
            count:this.state.count+1
         })
     }
     //创建一个handleClick方法清零
     handleClick = () =>{
         this.setState(
             {
                 count:0
             }
         )
     }
     render(){
         return(
             <div className="content">
                 <p>react生命周期介绍</p>
                 <Button onClick = {this.handleAdd}>AntD点击一下</Button>
                 {/* <button onClick = {this.handleAdd}>点击一下</button> */}
                 <button onClick = {this.handleClick.bind(this)}>点击一下</button>
                 <p>{this.state.count}</p>
                 <Chlid name={this.state.count}></Chlid>
             </div>
            
         )
     }
 }