import React from 'react'
import {Link} from 'react-router-dom'

export default class Info extends React.Component{
    render(){
        return(
            <div>
                这里是测试动态路由
                {/* 动态路由的值是：{this.props.match.params.values}     */}
                <Link to ='/main/test'>嵌套中的嵌套路由</Link>
                {this.props.children}
            </div>
            
        )
    }
}