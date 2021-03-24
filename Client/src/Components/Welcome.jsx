import React, { Component } from 'react';
import {Link}from 'react-router-dom';
export default class Welcome extends Component {
    render() {
     
        return (
            <>
               <h1>Welcome</h1>
            <div className="container">
          
                   <p style={{color:"white"}}>Welcome To Qwikcilver{this.props.match.params.name}.
                   You can Start Or Stop the Server Here <Link  to="/Chatbot">here</Link> </p>
            </div>
            </>
        )
    }
}
