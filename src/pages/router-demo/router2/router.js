import React from 'react'
import {HashRouter as Router ,Route,Link} from 'react-router-dom'
import Main from './main'
import about from './../router1/about'
import topic from './../router1/topic'
import Home from './home'


    export default class IRouter extends React.Component{
        render(){
            return(
                <Router>
                    <Home>
                        <div>
                            <Route path='/main' render={()=>{
                                return(
                                    <Main>
                                        <Route exact path='/main/a' component={about}></Route>
                                    </Main>
                                );
                            }
                            }></Route>
                            <Route path='/about' component={about}></Route>
                            <Route path='/topic' component={topic}></Route>
                        </div>
                    </Home>
                </Router>
            );
        }
    }