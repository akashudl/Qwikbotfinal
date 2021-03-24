import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import {Button,Modal} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
export default class Upadateacessrole extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      show:false
    }
  }
  handleonclick=()=>
  {
    this.setState({show:!this.state.show})
  }
  render() {
    return (
      <div>
        <Button onClick={()=>{this.handleonclick()}}>Update</Button>
        <Modal
        show ={this.state.show}>
        <Modal.Header>Edit User Acess Role</Modal.Header>
        <Modal.Body>
          Hi I am react  Model
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.handleonclick()}}>
            Close
          </Button>
          <Button onClick={()=>{this.handleonclick()}}>
             Save
          </Button>
        </Modal.Footer>




        </Modal>
      </div>
    )
  }
}
