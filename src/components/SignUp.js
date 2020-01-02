import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'

class LogIn extends Component {
  state = {
    username: '',

  }

  onSubmit = e => {
    e.preventDefault()
    let reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.username
      })
    }
    fetch(`http://localhost:3000/users`, reqObj)
    .then(resp => resp.json())
    .then(user => {
      this.props.setUser(user)
      this.props.setNotes(user.notes)
      this.props.setMessages(user.received_messages)
      this.props.history.push(`/notes`)
    })
  }

  handleChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return(
      <Form onSubmit={this.onSubmit} id="logInForm">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Please Select A Username</Form.Label>
          <Form.Control onChange={this.handleChange} type="text" name="username" placeholder="Username" />
        </Form.Group>
        <Button variant="primary" type="submit">Sign Up</Button>
      </Form>

    )
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch({type: 'SET_USER', user: user}),
    setNotes: (notes) => dispatch({type: 'SET_NOTES', notes: notes}),
    setMessages: (messages) => dispatch({type: 'SET_MESSAGES', messages: messages})
  };
};
 
export default connect(
  null,
  mapDispatchToProps
)(LogIn);