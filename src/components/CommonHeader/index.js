import React from 'react'
import {Row,Col} from 'antd'
import './index.less'

export default class CommonHeader extends React.Component{
    state={
        uesrName:'zq'
    }
    render(){
        return(
            <div className='whole'>
                <Row className='com1'>
                    <Col span='1'>
                    <img  src='/assets/logo-ant.svg'/>
                    </Col>
                    <Col span='3'>
                    <span id='txtlog'>IMOOC通用管理系统</span>
                    </Col>
                    <Col span='20'>
                    <span>欢迎，{this.state.uesrName}</span>
                    <a href='#'>退出</a>
                    </Col>
                </Row>
            </div>
        );
    }
}