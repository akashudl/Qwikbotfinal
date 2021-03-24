import React, { Component } from 'react'
import firebase from "../Services/firebase.js";
import "./googlesign.css";
import {db,auth} from "../Services/firebase";
import HeaderComponent from "./HeaderComponent";
import AuthenticationService from "../Services/AuthenticationService";
export default class LoginComponent extends Component {
  
    state={
        user:null,
        dispalyname:"",
        username :"",
        photourl:"",
        date:new Date().toLocaleDateString(), 
        time:new Date().toLocaleTimeString(),
    }
    componentDidMount()
    {
      auth.onAuthStateChanged((user)=>
      {
        if(user)
        {
          this.setState({user});
        }
      })
    }

    signinuser=()=>
    {
        const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    
            const check="@qwikcilver.com";
       this.setState({dispalyname:firebase.auth().currentUser.displayName})
       this.setState({username:firebase.auth().currentUser.email})
       this.setState({date:new Date().toLocaleDateString()})
       this.setState({time:new Date().toLocaleTimeString()})
       this.setState({photourl:firebase.auth().currentUser.photoURL})
       const valid=this.state.username.substring(this.state.username.length-15,this.state.username.length);
        console.log(valid);
        if(check===valid)
        {    
          db.collection("Userlogininfo").add({
          Name:this.state.dispalyname,
          Email:this.state.username,
          date:this.state.date,
          time:this.state.time,
    
        })
        console.log("DataSaved")
                            
          AuthenticationService.registerSucessfullLogin(this.state.username,this.state.photourl);
        //this.props.history.push(`/Welcome/${this.state.dispalyname}`);

          this.props.history.push(`/chatbot`)
    // This gives you a Google Access Token. You can use it to access the Google API.
        }
        else 
        {
          this.props.history.push("/auth");
        }

   const user = result.user;
   this.setState({user});
    console.log(user)
    // ...
  }).catch((error) => {
    console.log(error)

  });
  
    }
    
    render() {
        return (
           <>
            <div className="Center">
          
            <button formAction="https://www.youtube.com/watch?v=1KhZKNZO8mQ" className="googleSignIn googleSignIn--white"onClick={this.signinuser}>
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/G-on-clear.svg" alt="Google logo"/>
    <span className="googleSignIn__text">Sign in with Google</span>
  </button>

                 </div> 
                 
           </>
        )
    }
}
