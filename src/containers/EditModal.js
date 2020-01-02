import React, {Component} from 'react'
import EditNoteForm from '../components/EditNoteForm'
import {Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

class EditModal extends Component {

  render (){
    return (
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}>
          <Modal.Header>
          <h4>Edit Note</h4>
              <Button id="closeBtn" onClick={() =>  this.props.toggleNoteDisplay(null)}>x</Button>
          </Modal.Header>
          <Modal.Body>
            <EditNoteForm history={this.props.history}/>
          </Modal.Body>
        </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleNoteDisplay: note  => dispatch({type: 'TOGGLE_NOTE_DISPLAY', note: note})
  }
}

export default connect(null, mapDispatchToProps)(EditModal)