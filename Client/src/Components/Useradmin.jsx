import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationService from "../Services/AuthenticationService";
class UserAdmin extends Component
{
    render()
    {
    
            if(AuthenticationService.isUserAdmin())
            {
               return  <Route {...this.props}/>
            }
            else{
                return <Redirect to="/Welcome/To QwickSilver"/>
            }
    
    }
}
export default UserAdmin;