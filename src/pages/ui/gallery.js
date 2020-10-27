import React from 'react'
import {Card,Row,Col} from 'antd'
import './ui.less'


export default class Gallery extends React.Component{
    render(){

        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','23.png','14.png','25.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ]
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                cover={<img src={'/gallery/'+item}/>}
                
            >
                <Card.Meta title='React Admin' description='This is a description'></Card.Meta>
            </Card>
        ))
        return(
            <div className='card-warp'>
                <Row>
                    <Col md={6}>
                        { imgList[0]}
                    </Col>
                    <Col md={6}>
                        { imgList[1]}
                    </Col>
                    <Col md={6}>
                        { imgList[2]}
                    </Col>
                    <Col md={6}>
                        { imgList[3]}
                    </Col>
                </Row>
            </div>
        );
    }
}