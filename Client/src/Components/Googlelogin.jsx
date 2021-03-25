import React, { Component } from 'react'
import GoogleLogin from "react-google-login";
import AuthenticationService from "../Services/AuthenticationService";
import "./googlesign.css";
import axios from "axios";
import Userfinder from '../Api/Userfinder';
export default class Googlelogin extends Component {
    state={
        user:null,
        dispalyname:"",
        username :"",
        photourl:"",
      
    }
    postdata =async()=>{
      try {
        const response = await Userfinder.post("/", {
          email:this.state.username,
         });
         AuthenticationService.registerSucessfullLogin(this.state.username,this.state.photourl,"Employee");
         this.props.history.push(`/chatbot`)
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData = async () => {
      try {
        const response = await Userfinder.get(`/${this.state.username}`);
        console.log(response.data.data);
        console.log(this.state.username);
        const a=response.data.data
           if( JSON.stringify(a) === '{}')
           {
             console.log("Inside the Postblock")

             this.postdata();
            /*axios.post("http://localhost:3006/api/v1/user",{
              email:this.state.username,
                 })
                 AuthenticationService.registerSucessfullLogin(this.state.username,this.state.photourl,"Employee");
                 this.props.history.push(`/chatbot`)  */
           }
        console.log(response.data.data);
        console.log(response.data.data.user.acessrole);
       const acess=response.data.data.user.acessrole;
        AuthenticationService.registerSucessfullLogin(this.state.username,this.state.photourl,acess);
         this.props.history.push(`/chatbot`)  
      } catch (err) {}
    };
    componentDidMount()
    {
      console.log("Componet mounted");
    }
    responseGoogle = (response) => {
        const check="@qwikcilver.com";
        console.log(response);
        this.setState({dispalyname:response.profileObj.givenName})
        this.setState({username:response.profileObj.email})
        this.setState({photourl:response.profileObj.imageUrl})
        const valid=this.state.username.substring(this.state.username.length-15,this.state.username.length);
        console.log(valid);
        if(check===valid)
        {             
          
         // axios.get(`http://localhost:3006/api/v1/userdetails/${this.state.username}`).then(response=>
          //{
           // console.log(response);
            
         //   console.log(response.data.data.user.acessrole);
           //  const acess=response.data.data.user.acessrole;
            
          //})
           this.fetchData();
         
        //this.props.history.push(`/Welcome/${this.state.dispalyname}`);

         
    // This gives you a Google Access Token. You can use it to access the Google API.
        }
        else 
        {
          this.props.history.push("/auth");
        }
      };
    
    render() {
        return (
            <div className="Center">
                <GoogleLogin
                 clientId="245509110223-s5tr34nmrqccfdlbp1ceavjh55294169.apps.googleusercontent.com"
                onSuccess={this.responseGoogle}
                
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
                />
            </div>
        )
    }
}
