import React, { Component } from 'react'
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../aws-exports';

import "./googlesign.css";
Amplify.configure(awsconfig);
export default class NewLogin extends Component {
    state = { user: null, customState: null,};

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
           console.log(this.state.user);
          
          break;
        case "signOut":
          this.setState({ user: null });
          break;
       
      }
    });
    

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
      
  }
 
    render() {
        const { user } = this.state;
        return (
            <div className="Center">
            
            <button formAction="https://www.youtube.com/watch?v=1KhZKNZO8mQ" className="googleSignIn googleSignIn--white"  onClick={() => Auth.federatedSignIn({provider: 'Google'})}>
                     <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/G-on-clear.svg" alt="Google logo"/>
                        <span className="googleSignIn__text">Sign in with Google</span>
                   </button>
                 </div> 
        )
    }
}
