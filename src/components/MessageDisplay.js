import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Modal} from 'react-bootstrap'

class messageDisplay extends Component {

  deleteMessage = () => {
    let message = this.props.message
    this.props.deleteMessage(message)
    this.props.toggleMessageDisplay(null)
    fetch(`http://localhost:3000/messages/${message.id}`, {method: 'DELETE'})
    .then(alert("message has been deleted! 👍🏾"))
  }

  render() {
    console.log("SUP")
    let {note} = this.props.message
    return(
    <div id="modal">
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" 
        centered show={true}>
        <Modal.Header>
          <h4>{note.title}</h4>
          <button id="closeBtn" onClick={() => this.props.toggleMessageDisplay(null)}>x</button>
        </Modal.Header>
        <Modal.Body>
          <p>{note.content}</p>
          <p>
            Tags: {note.tags.length > 0? note.tags.map(tag => tag.name).join(', '): "None"}
          </p>
        </Modal.Body>
          <Modal.Footer>
            <p className='mr-auto'>A lovely message from {this.props.message.sender.name}!</p>
            <NavLink id="delLink" to='/messages' onClick={this.deleteMessage}>Delete</NavLink>
          </Modal.Footer>
      </Modal>
    </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  };
};
 
const mapDispatchToProps = dispatch => {
  return {
    deleteMessage: message => dispatch({type: 'DELETE_MESSAGE', message: message}),
    toggleMessageDisplay: message => dispatch({type: 'TOGGLE_MESSAGE_DISPLAY', message: message})
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(messageDisplay);