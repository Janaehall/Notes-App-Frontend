import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Form} from 'react-bootstrap'


class EditNoteForm extends Component {


  constructor(props){
    super(props)
    this.state = {
      note: props.note
    }
  }


  handleChange = (e) => {
    this.setState({
      note: {...this.state.note, [e.target.name]: e.target.value}
    })
  }



  handleSubmit = (e) => {
    e.preventDefault()
    this.props.editNote(this.state.note)
    this.patchNote()
  }



  patchNote = () => {
    let {id, title, content} = this.state.note 
    let reqObj = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify({
        title: title,
        content: content
      })
    }
    fetch(`http://localhost:3000/notes/${id}`, reqObj)
    this.props.history.push(`/notes/${id}`)
    this.props.toggleNoteDisplay(this.state.note)
  }




  render() {
    let {note} = this.state
    return(
      <Form id="editForm" onSubmit={this.handleSubmit}>
        <Form.Group controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
            <Form.Control onChange={this.handleChange} name="title" type="text" value={note.title}/>
        </Form.Group>
        <Form.Group controlId="formGroupContent">
          <Form.Label>Content</Form.Label>
            ​<textarea onChange={this.handleChange} id="txtArea" name="content" 
              rows="10" cols="55" value={note.content}>
            </textarea>            
        </Form.Group>
        <Button variant="primary" type="submit">Make Changes</Button>
      </Form>
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
   editNote: note => dispatch({type: "EDIT_NOTE", note: note}),
   toggleNoteDisplay: note => dispatch({type: "TOGGLE_NOTE_DISPLAY", note: note})
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(EditNoteForm);