import React, {Component} from 'react';
import './App.css';
import  LoginComponent from "./Components/LoginComponent";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import GoogleapiSignin from "./Components/GoogleapiSignin";
import GoogleLogin from "./Components/Googlelogin";
import  Welcome from "./Components/Welcome";
import ChatbotComponet from "./Components/ChatbotComponet";
import ErrorComponent from "./Components/ErrorComponent";
import AuthorizedLogin from "./Components/AuthorizedLoging";
import HeaderComponent from "./Components/HeaderComponent";
import "./bootstrap.css";
import Authenticatedroute from "./Components/Authenticatedroute";
import LogoutComponent from "./Components/Logoutcomponet";
import LexChatConfig from  "./Components/LexChartConfig";
import HeadeNew from "./Components/HeadeNew";
import Footer from "./Components/Footer";
import Admin from "./Components/Admin";
import Login from "./Components/LoginCom"
import UserAdmin from "./Components/Useradmin";
import  {UserContextProvider} from "./Contexapi/UserContexapi";
class App extends Component
{ 
  render()
  {
  return (
    <UserContextProvider>
     <div className="App">
      <Router>
      <> 
        <HeaderComponent/>
      <Switch>
        <Route path="/" exact component={GoogleLogin}/>
        <Route path="/Login" component={GoogleLogin}/>
        <Authenticatedroute path="/Welcome/:dispalyname" component={Welcome}/>
        <Authenticatedroute path="/Chatbot" component={LexChatConfig}/>
        <UserAdmin path="/admin" component={Admin}/>
        <Authenticatedroute path="/logout" component={LogoutComponent}/>
        <Route path="/auth" component={AuthorizedLogin}/>
        <Route  component={ErrorComponent}/>
        
        </Switch>
   
        </>
        </Router>     
    </div>
    </UserContextProvider>
    
  );
  }
}

export default App;
