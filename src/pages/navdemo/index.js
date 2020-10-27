import React from 'react'
// import { Row, Col } from 'antd';
import './index.less'
import { Menu } from 'antd';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import menuConfig from './../../config/menuConfig'

const { SubMenu } = Menu;


export default class Navdemo extends React.Component{
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
        currentKeys:''
      };


      //通过递归的方法来渲染菜单
    componentWillMount(){
        let currentKeys = window.location.hash.replace(/#|\?.*$/g,'');
        const menuTreeNode = this.renderMenu(menuConfig);
        this.setState({
            currentKeys,
            menuTreeNode
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
        <Menu.Item title = {item.title} key = {item.key}>
            {item.title}
        </Menu.Item>
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

      //菜单onclick事件
      handleCilck=(item)=>{
        this.setState({
          currentKeys:item.key
        })
      }
    render(){
        return(
                <div>
                <Menu mode="inline" 
                openKeys={this.state.openKeys} 
                onOpenChange={this.onOpenChange} 
                style={{ width: 256 }}
                onClick={this.handleCilck}
                selectedKeys={[this.state.currentKeys]}
                >
                
                {this.state.menuTreeNode}
                </Menu>   
                 </div>

        );
    }
}