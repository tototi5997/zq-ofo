import React from 'react'
import {Card,Tabs,message} from 'antd'
import {AliwangwangOutlined,SmileOutlined,DashboardOutlined} from '@ant-design/icons';

export default class Tab extends React.Component{
    callBack = (key)=>{
        message.info('您选择了页签：'+key)
    }

    componentWillMount(){
        const panes =[
            {
            title:'Tab 1',
            content:'This is zq fixed Tabs1!',
            key:'1',
            },
            {
                title:'Tab 2',
                content:'This is zq fixed Tabs2!',
                key:'2',
                },
            {
            title:'Tab 3',
            content:'This is zq fixed Tabs3!',
            key:'3',
            },    
        ]
        this.setState({
            panes
        });
    }

    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    }
    onEdit = (targetKey,action)=>{
        this[action](targetKey);
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
        message.success('你新增了一个页签!')
      };
    
      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
        message.info('你删除了一个页签!')
      };
    render(){
        const TabPane = Tabs.TabPane
        return(
            <div>
                <Card title='Tab页签' className='card-warp'>
                    <Tabs defaultActiveKey='1' onChange={this.callBack}>
                        <TabPane tab="Tab 1" key="1">
                        学习React
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                        React很受欢迎
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        和zq一起学习React吧！！
                        </TabPane>
                    </Tabs>
                </Card>

                <Card title='指定图标的Tab页签'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab={<span><AliwangwangOutlined/>Tab 1</span>} key="1">
                            这是一个带图标的tab页签1
                        </TabPane>
                        <TabPane tab={<span><SmileOutlined/>Tab2</span>} key="2">
                            这是一个带图标的tab页签2
                        </TabPane>
                        <TabPane tab={<span><DashboardOutlined />Tab3</span>} key="3">
                            这是一个带图标的tab页签2
                        </TabPane>
                    </Tabs>
                </Card>

                <Card title='可以新增和删除的页签'>
                    <Tabs defaultActiveKey='1' type='editable-card' onChange={this.onChange} 
                    onEdit = {this.onEdit}
                    >
                        {
                            this.state.panes.map((panes)=>{
                                return(
                                <TabPane tab={panes.title} key={panes.key}>{panes.content}</TabPane>
                                );
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        );
    }
}