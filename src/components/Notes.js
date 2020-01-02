import React, {Component} from 'react'
import {connect} from 'react-redux'
import Note from './Note'
import NoteDisplay from './NoteDisplay'
import EditModal from '../containers/EditModal'
import { Switch, Route, Redirect} from 'react-router-dom'
import NoNotes from './NoNotes'
import SendModal from './SendModal'


class Notes extends Component{

  handleClick = (note) => {
    console.log(note)
    this.props.toggleNoteDisplay(note)
    this.props.history.push(`/${this.props.type}/${note.id}`)
  }

  renderNotes = () => {
    let notes = this.props.notes
    return notes.length > 0 ?
    <div id="notesList">
      {notes.map(note => {
        return <Note note={note} key={note.id} handleClick={this.handleClick}/>
    })}
    </div>
    :
    <NoNotes type={this.props.type} />

  }

  renderDashboard = () => {
    let {match} = this.props
    console.log(match.path)
    console.log('YESSSS!', this.props.note)
    return (
      <div>
        {this.renderNotes()}
        {this.props.note
          ?
          <Switch>
            <Route exact path={`${match.path}/:id`} component={NoteDisplay}/>
            <Route exact path={`${match.path}/:id/edit`} component={EditModal}/>
            <Route exact path={`${match.path}/:id/send`} component={SendModal}/>
          </Switch>
          :
          <Redirect to='/notes'/>
        }
      </div>
    )
  }

  render() {
    return (
    <div>
      {this.props.currentUser?
      this.renderDashboard()
      :
      <Redirect to="/login"/>}
    </div>
  )
}
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    note: state.note,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNoteDisplay: note => dispatch({type: "TOGGLE_NOTE_DISPLAY", note: note})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
