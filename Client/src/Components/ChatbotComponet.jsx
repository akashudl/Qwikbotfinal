import React, { Component } from 'react'
import "../Components/Welcome.css"
export default class ChatbotComponet extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            showme:true,
        }
        this.wisdom=React.createRef()
    }
    componentDidMount=()=>
    {
      //console.log(this.wisdom);
      this.wisdom.current.focus();
    }
    chatBtnheader=()=>
    {
         this.setState({showme:!this.state.showme})
    }
 
    render() {
        const mystyle={
            alignContent:"center",
            marginTop:"10px"
        };
        return (
          <>
          <h1>Infraplats ChatBot</h1>
        <div>
            {this.state.showme ?
            <div className="chatContainer">
            <div className="chatHeader">
                <h3 className="chatHeaderText">Let's Talk</h3>
                <button className="chatHeaderBTN" onClick={()=>this.chatBtnheader()}><i className="material-icons">close</i></button>
            </div>
            <div className="chatBody">
                <div id="conversation" className="scroll"></div>
                <div className="chatInput">
                <form style={mystyle} id="chatform" /*onsubmit="return pushChat();"*/>
                    <input type="text" id="wisdom" ref={this.wisdom}  placeholder="Please give the command here.."></input>
                </form>
                </div>
            </div>
        </div>:null
            }
         
    <div className="chatBtnContainer">
        <button className="chatBtnMenu"onClick={()=>this.chatBtnheader()} >
            <i className="material-icons">chat</i>
            <h3 className="chatHeaderText">Ping Me Here!</h3>
        </button>
    </div>
    
        </div>
    
          </>
        )
}
}

