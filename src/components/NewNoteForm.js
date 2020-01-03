import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'

class NewNoteForm extends Component {

  state = {
    note: {
      title: '',
      content: '',
      tags: ''
    }
  }



  handleChange = (e) => {
    this.setState({
      note: {...this.state.note, [e.target.name]: e.target.value}
    })
  }



  handleSubmit = (e) => {
    e.preventDefault()
    let {title, content, tags} = this.state.note 
    let newTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    let reqObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      } ,
      body: JSON.stringify({
        title: title,
        content: content,
        tags: newTags,
        user_id: this.props.currentUser.id
      })
    }
    this.postNote(reqObj)
  }



  postNote = reqObj => {
    fetch(`http://localhost:3000/notes`, reqObj)
    .then(resp => resp.json())
    .then(note => {
      this.props.addNote(note)
      this.props.history.push(`/notes/${note.id}`)
      this.props.toggleNoteDisplay(note)
      })
  }



  render() {
    return(
          <Form id="newForm" onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGroupTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={this.handleChange} name="title" type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group controlId="formGroupContent">
              <Form.Label>Content</Form.Label>
              ​<textarea onChange={this.handleChange} 
                id="txtArea" name="content" rows="10" cols="65" placeholder="Write your note here!">
              </textarea>            
            </Form.Group>
            <Form.Group controlId="formGroupTags">
              <Form.Label>Tags</Form.Label>
              <Form.Control onChange={this.handleChange} name="tags" type="text" 
                placeholder="Add tags separated by commas" />
            </Form.Group>
            <Button variant="primary" type="submit">Add Note</Button>
          </Form>)
  }
}



const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};


 
const mapDispatchToProps = dispatch => {
  return {
   addNote: note => dispatch({type: "ADD_NOTE", note: note}),
   toggleNoteDisplay: note => dispatch({type: "TOGGLE_NOTE_DISPLAY", note: note})
  };
};
 
export default connect(mapStateToProps,mapDispatchToProps)(NewNoteForm);