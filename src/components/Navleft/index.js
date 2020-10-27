import React from 'react'
import menuConfig from './../../config/menuConfig'
import { Menu} from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import '../Navleft/index.less'
// import { render } from 'less';
import MenuItem from 'antd/lib/menu/MenuItem';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from './../../redux/aciton'

const { SubMenu } = Menu;
 
 class Navleft extends React.Component{

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
        currentKeys:''
      };
    //通过递归的方法来渲染菜单
    componentWillMount(){
        let currentKeys = window.location.hash.replace(/#|\?.*$/g,'');      //获取路由
       const menuTreeNode = this.renderMenu(menuConfig);
       this.setState({
           menuTreeNode,
           currentKeys
       })


    }
    //菜单渲染 
    renderMenu = (data) =>{
        return data.map((item)=>{
            if(item.children){
            return(
                <SubMenu title={item.title} key ={item.key}>
                    {this.renderMenu(item.children)}
                </SubMenu>
            )
        }
        return(
        <MenuItem title = {item.title} key = {item.key}>
            <NavLink to={item.key}>{item.title}</NavLink>
            </MenuItem>
        )
        })
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      };

      //菜单点击事件
      handleClick=({item})=>{
          const {dispatch} = this.props;
          dispatch(switchMenu(item.props.title))    //获取对应的值
          console.log(item.props.title)
        this.setState({
            currentKeys:item.key
        })
      }
    render(){
        return(
            <div>
                <div className='logo'>
                    <img src='/assets/logo-ant.svg' alt=''/>
                    <h1>IMOOC MS</h1>
                </div>
                <Menu 
                theme='dark' 
                mode="inline" 
                openKeys={this.state.openKeys} 
                onOpenChange={this.onOpenChange} 
                selectedKeys={this.state.currentKeys}
                onClick={this.handleClick}
                >
                    {this.state.menuTreeNode}
                   
                </Menu>
                
            </div>
        )
    }
}

export default connect()(Navleft);