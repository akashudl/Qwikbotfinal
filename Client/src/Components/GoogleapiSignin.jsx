import React, { Component } from 'react'

import "./googlesign.css";

export default class GoogleapiSignin extends Component {
    state={
        name:"",
        email:"",
        photourl:"",
        authInstance:""

    }
    insertGapiScript()
    {
        const script=document.createElement('script')
        script.src='https://apis.google.com/js/platform.js';
        script.onload=()=>
        {
            this.intiliazeGoogleLogin()
        }
        document.body.appendChild(script);
    }
    intiliazeGoogleLogin()
    {
        window.gapi.load('auth2',()=>{
            window.gapi.auth2.init({
                client_id:'245509110223-s5tr34nmrqccfdlbp1ceavjh55294169.apps.googleusercontent.com'
            })
            window.gapi.load('signin2',()=>
            {
                const params={
                    onSuccess:()=>
                    {   const authinstance=window.gapi.auth2.getAuthInstance()
                        const user=authinstance.currentUser.get();
                        console.log(user)
                    }
                }
                window.gapi.signin2.render('loginButton',params)
            })
        })
          this.setState({authInstance:window.gapi.auth2.getAuthInstance()})
        const user = this.state.authInstance.currentUser.get()
        const profile = user.getBasicProfile()
        const email = profile.getEmail()
        const imageUrl = profile.getImageUrl()
        console.log(profile);
        console.log(imageUrl);
    }
  
    componentDidMount()
    {  
        this.insertGapiScript()
       
    }
    render() {
        return (
            <>
            <div id="loginButton" className="Center">
            
            </div>
            
            </>
        )
    }
}
