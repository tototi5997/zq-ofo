import React from 'react'
import './index.less'

export default class Nomatch extends React.Component{
    render(){
        return(
            <div className='nomatchbox'>
               <p className='nomatch'>404 NO PAGES!!</p> 
            </div>
        );
    }
}