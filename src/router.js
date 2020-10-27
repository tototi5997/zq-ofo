// import { FormProvider } from 'antd/lib/form/context';
import React from 'react'
import {HashRouter as Router ,Route , Switch,Redirect} from 'react-router-dom'
import Admin from './admin';
import App from './App'
import Home from './pages/home';
import Login from './pages/login';
import Nomatch from './pages/noMatch';
import Carousels from './pages/ui/carousel';
import Gallery from './pages/ui/gallery';
import Buttons from './pages/ui/index'
import Loadings from './pages/ui/loadings';
import Messages from './pages/ui/messages';
import Modals from './pages/ui/modals';
import Notice from './pages/ui/notice';
import Tab from './pages/ui/tabs';
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register';
import BasicForm from './pages/table/basic';
import HighForm from './pages/table/hightable';
import City from './pages/city';
import Order from './pages/order';
import Comment from './common'
import Detail from './pages/order/detail';
import User from './pages/user/index';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line/index'
import Rich from './pages/rich';
import Permission from './pages/permission';
// import TestForm from './components/BasicForm/test';

export default class IRouter extends React.Component{       //存放路由
    render(){
        return(
            <Router>
                <App>
                    <Route path='/login' component={Login}></Route>
                    
                    <Route path='/admin' render={()=>{
                        return(
                            <Admin>
                                <Switch>
                                <Route path='/admin/home' component={Home}></Route>
                                <Route path='/admin/ui/buttons' component={Buttons}></Route>
                                <Route path='/admin/ui/modals' component={Modals}></Route>
                                <Route path='/admin/ui/loadings' component={Loadings}></Route>
                                <Route path='/admin/ui/notification' component = {Notice}></Route>
                                <Route path='/admin/ui/messages' component={Messages}></Route>
                                <Route path='/admin/ui/tabs' component={Tab}></Route>
                                <Route path='/admin/ui/gallery' component={Gallery}></Route>
                                <Route path='/admin/ui/carousel' component={Carousels}></Route>
                                <Route path='/admin/city' component={City}></Route>
                                <Route path='/admin/order' component={Order}></Route>
                                <Route path='/admin/user' component={User}></Route>
                                <Route path='/admin/bikeMap' component={BikeMap}></Route>
                                <Route path='/admin/charts/bar' component={Bar}></Route>
                                <Route path='/admin/charts/pie' component={Pie}></Route>
                                <Route path='/admin/charts/line' component={Line}></Route>
                                <Route path='/admin/rich' component={Rich}></Route>
                                <Route path='/admin/permission' component={Permission}></Route>
                                {/* <Route path='/admin/rich' component={TestForm}></Route> */}
                                <Route component={Nomatch}></Route>
                                </Switch>
                            </Admin>
                        );
                    }}></Route>

                    <Route path='/form' render={()=>{
                        return(
                            <Admin>
                                <Switch>
                                    <Route path='/form/login' component={FormLogin}></Route>
                                    <Route path='/form/reg' component={FormRegister}></Route>
                                    {/* <Route component={Nomatch}></Route> */}
                                </Switch>
                            </Admin>
                        );
                    }}></Route>

                    <Route path='/table' render={()=>{
                        return(
                            <Admin>
                                <Switch>
                                    <Route path='/table/basic' component={BasicForm}></Route>
                                    <Route path='/table/high' component={HighForm}></Route>
                                    <Route component={Nomatch}></Route>
                                </Switch>
                            </Admin>
                        );
                    }}></Route>

                    <Route path='/common' render={()=>{
                        return(
                            <Comment>
                                <Route path='/common/order/detail/:orderId' component={Detail}></Route>
                            </Comment>
                        );
                    }}>

                    </Route>
                </App>
            </Router>
        );
    }
}