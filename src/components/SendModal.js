import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Modal, Button} from 'react-bootstrap'

class SendModal extends Component {

  state = {
    username: '',
    noUser: false
  }

  onSubmit = e => {
    e.preventDefault()
    let reqObj = {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        sender_id: this.props.currentUser.id,
        note_id: this.props.note.id,
        recipient: this.state.username
      })
    }
    this.postMessage(reqObj)
  }



  postMessage = reqObj => {
    fetch(`http://localhost:3000/messages`, reqObj)
    .then(resp => resp.json())
    .then(message => {
      if(message.error){
        this.setState({
          noUser: true
        })     
      } else {
        this.props.history.push(`/notes`)
        alert('Message sent!')
      }
    })
  }



  handleChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  onHide = () => {
    this.props.history.push('/notes')
  }



  render() {
    return(
      <Modal onHide={this.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" 
      centered show={true}>
        <Form style={{'padding':'50px'}} onSubmit={this.onSubmit} id="sendForm">
        <p style={{'color': 'red'}}>{this.state.noUser? "User not found!" : null}</p>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Enter a user to send this note to!</Form.Label>
            <Form.Control onChange={this.handleChange} type="text" name="username" placeholder="Username" />
          </Form.Group>
          <Button onClick={this.handleClick} variant="primary" type="submit">Send Note</Button>
        </Form>
      </Modal>

    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    note: state.note,
  }
}

 
export default connect(mapStateToProps)(SendModal);