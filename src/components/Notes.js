import React, {Component} from 'react'
import {connect} from 'react-redux'
import Note from './Note'
import NoteDisplay from './NoteDisplay'
import EditModal from '../containers/EditModal'
import { Switch, Route, Redirect} from 'react-router-dom'
import NoNotes from './NoNotes'
import SendModal from './SendModal'
import FilterForm from './FilterForm'


class Notes extends Component{

  state = {
    filter: null
  }

  handleChange = e => {
    this.setState({
      filter: e.target.value
    })
  }


  handleClick = (note) => {
    this.props.toggleNoteDisplay(note)
    this.props.history.push(`/notes/${note.id}`)
  }

  filterNotes = () => {
    if (this.props.filter){
      return this.props.notes.filter(note => {
        return note.tags.some(tag => tag.name.toLowerCase().includes(this.props.filter.toLowerCase()))
      })
    } else {
      return this.props.notes
    }
  }

  renderNotes = () => {
    let notes = this.filterNotes()
    return(
      <div id="notesList">
        {notes.map(note => {
          return <Note note={note} key={note.id} handleClick={this.handleClick}/>
        })}
      </div>
    )
  }



  setRoutes = () => {
    let {match} = this.props
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
        {this.props.notes.length > 0 ?
          <div>
            <FilterForm handleChange={this.props.handleChange}/>
            {this.setRoutes()}
          </div>
        :
        <NoNotes type={'notes'} />
        }
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
