import React from 'react'
import { Row,Col } from 'antd'
import CommonHeader from './components/CommonHeader'

//通用组件，订单详情，新页面
export default class Common extends React.Component{
    render(){
        return(
            <div>
            <Row className='container'>
                <Col span='24'>
                    <CommonHeader></CommonHeader>
                </Col>
            </Row>
            <Row>
                {this.props.children}
            </Row>
            </div>
        );
    }
}