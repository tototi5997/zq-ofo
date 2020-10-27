import React from 'react'
import {Carousel,Card} from 'antd'
import './ui.less'

export default class Carousels extends React.Component{
    render(){
        return(
            <div>
                <Card title='文字轮播图' className='card-warp'>
                    <Carousel autoplay={true}>
                        <div><h3 className='contentStyle'>Ant Motion Banner</h3></div>
                        <div><h3 className='contentStyle'>Welcome to</h3></div>
                        <div><h3 className='contentStyle'>React Study</h3></div>
                        <div><h3 className='contentStyle'>This is zq react</h3></div>
                    </Carousel>
                </Card>
                <Card title='图片轮播' className='card-warp'>
                    <Carousel autoplay={true} effect={"fade"}>
                        <div><img src='/carousel-img/carousel-1.jpg' alt='' className='img-content'/></div>
                        <div><img src='/carousel-img/carousel-2.jpg' alt='' className='img-content'/></div>
                        <div><img src='/carousel-img/carousel-3.jpg' alt='' className='img-content'/></div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}