import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Modal} from 'react-bootstrap'

class NoteDisplay extends Component {

  deleteNote = () => {
    let note = this.props.note
    this.props.deleteNote(note)
    this.props.toggleNoteDisplay(null)
    fetch(`http://localhost:3000/notes/${note.id}`, {method: 'DELETE'})
    .then(alert("Note has been deleted! 👍🏾"))
  }

  onHide = () => {
    this.props.toggleNoteDisplay(null)
  }

  render() {
    let {note} = this.props
    return(
    <div id="modal">
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" 
        centered show={true}>
        <Modal.Header>
          <h4>{note.title}</h4>
          <button id="closeBtn" onClick={() => this.props.toggleNoteDisplay(null)}>x</button>
        </Modal.Header>
        <Modal.Body>
          <p>{note.content}</p>
          <p>
            Tags: {note.tags.length > 0? note.tags.map(tag => tag.name).join(', '): "None"}
          </p>
        </Modal.Body>
          <Modal.Footer>
            <NavLink id="delLink" to='/notes' onClick={this.deleteNote}>Delete</NavLink>
            <NavLink id="editLink" to={`/notes/${note.id}/edit`}>Edit</NavLink>
            <NavLink id="editLink" to={`/notes/${note.id}/send`}>Send Note</NavLink>
          </Modal.Footer>
      </Modal>
    </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    note: state.note
  };
};
 
const mapDispatchToProps = dispatch => {
  return {
    deleteNote: note => dispatch({type: 'DELETE_NOTE', note: note}),
    toggleNoteDisplay: note => dispatch({type: 'TOGGLE_NOTE_DISPLAY', note: note}),
  };
};
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteDisplay);