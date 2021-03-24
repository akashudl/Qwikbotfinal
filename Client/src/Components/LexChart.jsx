import React from 'react';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import "./Chatbot.css";
import firebase from "../Services/firebase.js";
import { Redirect, Route } from 'react-router-dom';
import {db} from "../Services/firebase.js";
import AuthenticationService from "../Services/AuthenticationService"
import axios from 'axios';
import Userfinder from '../Api/Userfinder';
class LexChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:new Date().toLocaleDateString(), 
      time:new Date().toLocaleTimeString(),
      data: '',
      mess:"", 
      response:"",
      lexUserId: 'chatbot-demo' + Date.now(), 
      sessionAttributes: {}, show: 'closed'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
   
  }
  componentDidMount() {
    document.getElementById("inputField").focus();
    AWS.config.region = this.props.region || 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.props.IdentityPoolId,
    });
    var lexruntime = new AWS.LexRuntime();
    this.lexruntime = lexruntime;
   console.log("ComponentdidMount");
  }

  handleClick() {
    this.setState({ show: this.state.show ==='open'? 'closed' : 'open' });
    console.log(this.state);
  }
  pushChat(event) {
    event.preventDefault();
    
    var inputFieldText = document.getElementById('inputField');
   if(inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0)
     {
      var inputField = inputFieldText.value.trim();
      console.log(inputField);
      inputFieldText.value = 'Please Wait Bot Responding ...';
    var getuser=AuthenticationService.getuser();
     var  email=getuser;
    var getrole=AuthenticationService.getRole();
    
      
      inputFieldText.locked = true;
     
      // send it to the Lex runtime
      var params = {
        botAlias: '$LATEST',
        botName: this.props.botName,
        inputText: inputField,
        userId: this.state.lexUserId,
        sessionAttributes:{email,getrole},
       
      };
      this.showRequest(inputField);
      var a = function(err, data) {
        if (err) {
          console.log(err, err.stack);
          this.showError('Error:  ' + err.message + ' (see console for details)')
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.setState({sessionAttributes: data.sessionAttributes})
          //sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          this.showResponse(data);
          console.log(data);
          console.log(data.message);
          this.setState({response:data.message});
          var a=",";
          var b=this.state.mess.concat(inputField+",");
           this.setState({mess:b})
           console.log();
          if(data.sessionAttributes.finalresponse=="yes")
          { 
          axios.post("http://localhost:3006/api/v1/userchatdetails",{
          email:email,
              acessrole:getrole,
              command_typed:this.state.mess,
              response_get:this.state.response
             })
           }
        }
        // re-enable input
        inputFieldText.value = '';
        inputFieldText.locked = false;
      };

      this.lexruntime.postText(params, a.bind(this));
    }
    // we always cancel form submission
    return false;
  }

  showRequest(daText) {
    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement("P");
    requestPara.className = 'userRequest';
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  
   
  }

  showError(daText) {

    var conversationDiv = document.getElementById('conversation');
    var errorPara = document.createElement("P");
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showResponse(lexResponse) {

    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("P");
    responsePara.className = 'lexResponse';
    if (lexResponse.message) {
      responsePara.appendChild(document.createTextNode(lexResponse.message));
      responsePara.appendChild(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
      responsePara.appendChild(document.createTextNode(
        'Ready for fulfillment'));
      // TODO:  show slot values
    } else {
      responsePara.appendChild(document.createTextNode(
        ''));
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({data: event.target.value});
  
  }

  render() {
    const getuser=AuthenticationService.getuser1();
    if(getuser===null)
    {
      return <Redirect to="/Login"/>
    }
    console.log("render")
    const inputStyle = {
      padding: '4px',
      fontSize: 20,
      width: '388px',
      height: '40px',
      borderRadius: '1px',
      border: '10px'
    }

    const conversationStyle = {
      width: '400px',
      height: this.props.height,
      border: 'px solid #ccc',
      backgroundColor: this.props.backgroundColor,
      padding: '4px',
      overflow: 'scroll',
      borderBottom: 'thin ridge #bfbfbf',
      
    }

    const headerRectStyle = {
      backgroundColor: '#0080ff', 
      width: '408px', 
      height: '60px',
      textAlign: 'center',
      paddingTop: 12,
      paddingBottom: -12,
      color: '#FFFFFF',
      fontSize: '24px',
      borderRadius: "15px"
    }

    const chatcontainerStyle = {
      backgroundColor: '#FFFFFF',
      width: 408
    }

    const chatFormStyle = {
      margin: '1px', 
      padding: '2px'
    }


    return (   

        <>
        <div>
        <h1>Infraplats Chatbot</h1>
        </div>
      <div id="chatwrapper">
          
        <div id="chat-header-rect" style={headerRectStyle} onClick={this.handleClick} >{this.props.headerText}
              {(this.state.show === 'open') ? <span className='chevron top'></span> : <span className='chevron bottom'></span>}
        </div>
        <div id="chatcontainer" className={this.state.show} style={chatcontainerStyle}>
          <div id="conversation" style={conversationStyle} ></div>
            <form id="chatform" style={chatFormStyle} onSubmit={this.pushChat.bind(this)}>
                <input type="text"
                       id="inputField"
                       size="40"
                       value={this.state.data}
                       placeholder={this.props.placeholder}
                       onChange={this.handleChange.bind(this)}
                       style={inputStyle}
                      />
            </form>
        </div>
      </div>
      </>
    )
  }
}

LexChatBot.propTypes = {
  botName: PropTypes.string,
  IdentityPoolId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  height: PropTypes.string,
  headerText: PropTypes.string
}

export default LexChatBot;
