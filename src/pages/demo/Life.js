import React from 'react'
import Chlid from './Chlid'
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
             <div style={{padding:50}}>
                 <p>react生命周期介绍</p>
                 <button onClick = {this.handleAdd}>点击一下</button>
                 <button onClick = {this.handleClick.bind(this)}>点击一下</button>
                 <p>{this.state.count}</p>
                 <Chlid name={this.state.count}></Chlid>
             </div>
            
         )
     }
 }