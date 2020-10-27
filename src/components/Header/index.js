import { Row,Col } from 'antd'
import React from 'react'
import './../Header/index.less'
import utils from './../../utils/utils'
import axious from './../../axios'
import { connect } from 'react-redux'


 class Header extends React.Component{
    state = {}
    componentWillMount(){
        this.setState({
            uesrName:'zq'
        })
        //实现日期的更新
        setInterval(() => {
            let sysTime = utils.formateDate(new Date());
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherApi();
    }
    getWeatherApi=()=>{
        let city = '武汉'; 
        axious.jsonp({
            //注意对中文进行编码
            url:"http://api.map.baidu.com/telematics/v3/weather?location="+encodeURIComponent(city)+"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
        }).then((res)=>{
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0];
                //alert(data.dayPictureUrl)
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather : data.weather
                })
            }
        })
    }
    render(){
        return(
            <div className="header">
                <Row className = 'header-top'>
                    <Col span='24'>
                        <span>欢迎，{this.state.uesrName}！</span>
                        <a href='#'>退出</a>
                    </Col> 
                </Row>
                <Row className='breadcrumb'>
                    <Col span='4' className='breadcrumb-title'>
                    {this.props.menuName}
                    </Col>
                    <Col span='20' className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                            
                        <span className='weather-detial'>
                            <img src={this.state.dayPictureUrl} alt=''  id='weathericon'/>
                            <span className='weather-text'>{this.state.weather}</span>
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        menuName:state.menuName
    }
}
export default connect(mapStateToProps)(Header);