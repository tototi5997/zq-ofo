import React from 'react'
import {HashRouter as Router , Route , Link,Switch} from 'react-router-dom'
import main from './main'
import about from './about'
import topic from './topic'

export default class Home extends React.Component{
    render(){
        return(
             <Router>
                <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topic">Topic</Link>
                    </li>
                </ul>

                <hr/>
                
                {/* <Router path = '/'><home/></Router>
                <Router path = '/about' component = {about}></Router>
                <Router path = '/topic' component = {topic}></Router> */}

                    {/* <Switch> */}
                        <Route exact path="/" component={main}>
                            {/* <mian /> */}
                        </Route>
                        <Route path="/about" component={about}>
                            {/* <about /> */}
                        </Route>
                        <Route path="/topic" component={topic}>
                            {/* <topic /> */}
                        </Route>
                    {/* </Switch> */}
                </div>
             </Router>

             
        );
    }
}