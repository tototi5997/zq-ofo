import React from 'react'
import {HashRouter as Router ,Route,Switch} from 'react-router-dom'
import Main from './main'
import Info from './info'
import about from './../router1/about'
import topic from './../router1/topic'
import Home from './home'
import NoMatch from './NoMatch'



    export default class IRouter extends React.Component{
        render(){
            return(
                <Router>
                    <Home>
                        <div>
                            <Switch>
                            <Route path='/main' render={()=>{
                                return(
                                    <Main>
                                        {/* <Route exact path='/main/:mianId' component={Info}></Route> */}
                                        <Route path='/main/:values' render={()=>{
                                            return(
                                                <Info>
                                                    <Route path ='/main/test' component={about}></Route>
                                                </Info>
                                            );
                                        }}></Route>
                                    </Main>
                                );
                            }
                            }></Route>
                            <Route path='/about' component={about}></Route>
                            <Route path='/topic' component={topic}></Route>
                            <Route  component={NoMatch}></Route>
                            </Switch>
                        </div>
                    </Home>
                </Router>
            );
        }
    }