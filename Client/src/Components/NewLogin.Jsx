import React, { Component } from 'react'
import {Auth} from 'aws-amplify';
import "./googlesign.css";           
export default class NewLogin extends Component {
    render() {
        return (
            <div className="Center">
          
            <button formAction="https://www.youtube.com/watch?v=1KhZKNZO8mQ" className="googleSignIn googleSignIn--white"onClick={}>
                     <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/G-on-clear.svg" alt="Google logo"/>
                        <span className="googleSignIn__text">Sign in with Google</span>
                   </button>

                 </div> 
        )
    }
}
