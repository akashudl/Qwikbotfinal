import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationService from "../Services/AuthenticationService";
class Authenticatedroute extends Component
{
    render()
    {
    
            if(AuthenticationService.isUserloggedin())
            {
               return  <Route {...this.props}/>
            }
            else{
                return <Redirect to="/login"/>
            }
    
    }
}
export default Authenticatedroute;