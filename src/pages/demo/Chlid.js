import React from 'react'
export default class Child extends React.Component{
    constructor(props){
        super(props);
        this.state={
            count :0
        }
        
    }
    //看一下生命周期
    componentWillUnmount(){
        console.log("即将挂载虚拟Dom")
    }
    componentDidMount(){
        console.log("已近完成挂载dom")
    }
    componentWillReceiveProps(newProps){
        console.log("即将接收Props"+newProps.name)
    }
    shouldComponentUpdate(){
        console.log("shouldUpdate")
        return true
    }
    componentWillUpdate(){
        console.log("组件将要更新")
    }
    componentDidUpdate(){
        console.log("组件已经完成更新")
    }
 

    render(){
        return(
            <div>
                <p>{this.props.name}</p>
            </div>
        )
    }
}