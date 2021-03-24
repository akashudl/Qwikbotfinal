import React, { Component } from 'react'
import {db,auth} from "../Services/firebase";
import "../bootstrap.css";
import Userfinder from '../Api/Userfinder';
import axios from 'axios';
import Upadateacessrole from "./Upadateacessrole";
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Admin extends Component {
    state ={
      userInfo:[],
      count:0,

    }
   
    componentDidMount() 
    { 
      
     axios.get("http://localhost:3006/api/v1/userdetails").then(response=>{
       this.setState({userInfo:response.data.data.user})
       console.log(response);
      });

    }
  
    render() {
        return (
          <div className="list-group">
          <table className="table table-hover  table-dark mt-5 text-center">
            <thead>
              <tr className="bg-primary">
                <th scope="col">Email</th>
                <th scope="col">AcessRole</th>
                <th scope="col">Login Time</th>
                <th scope="col">Edit-AcessRole</th>
 
               
              </tr>
            </thead>
            <tbody>
            {this.state.userInfo &&
          this.state.userInfo.map((user) => {
              return (
                <tr
              
                  key={user.uid}
                >
                  <td>{user.email}</td>
                  <td>{user.acessrole}</td>
                  <td>{user.created_on}</td>
                  
                  <td>
                   <Upadateacessrole />
                  </td>
                
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>
        );
    }
}
