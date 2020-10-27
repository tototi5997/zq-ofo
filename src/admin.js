import React from 'react'
import { Row, Col,} from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import Navleft from './components/Navleft'
import './components/style/common.less'
// import Home from './pages/home'

export default class Admin extends React.Component{
    render(){
        return(
            <Row className='container'>
                <Col span={4} className='nav-left'>
                    <Navleft></Navleft>
                </Col>
                <Col span={20} className='main'>
                    <Header className='header'></Header>
                    <Row className='content'>
                        {this.props.children}
                    </Row>
                    <Footer></Footer>
                </Col>
        </Row>
        )
    }
}
