import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'

class LogIn extends Component {

  state = {
    username: '',
    noUser: false
  }

  onSubmit = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${this.state.username}`)
    .then(resp => resp.json())
    .then(user => {
      if(user.error){
       this.setState({
      noUser: true
      })
    } else {
      this.props.setUser(user)
      this.props.setNotes(user.notes)
      this.props.setMessages(user.received_messages)
      this.props.history.push(`/notes`)
    }
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
        <p style={{'color': 'red'}}>{this.state.noUser? "User not found!" : null}</p>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Please enter your username to sign in!</Form.Label>
          <Form.Control onChange={this.handleChange} type="text" name="username" placeholder="Username" />
        </Form.Group>
        <Button variant="primary" type="submit">Log In</Button>
        <Button variant="primary" onClick={() => this.props.history.push('/sign_up')}>Sign Up</Button>
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
 
export default connect(null, mapDispatchToProps)(LogIn);