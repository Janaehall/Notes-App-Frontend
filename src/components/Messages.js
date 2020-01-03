import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import UnseenMessage from './UnseenMessage'
import MessageDisplay from './MessageDisplay'
import { Switch, Route, Redirect} from 'react-router-dom'
import NoNotes from './NoNotes'
import FilterForm from './FilterForm'


class Messages extends Component{

  state = {
    filter: null
  }

  handleChange = e => {
    this.setState({
      filter: e.target.value
    })
  }



  handleClick = (message) => {
    this.props.toggleMessageDisplay(message)
    this.props.history.push(`/notes_from_friends/${message.id}`)
  }


  filterMessages = () => {
   if (this.state.filter){
     return this.props.messages.filter(message => {
       return message.note.tags.some(tag => tag.name.includes(this.state.filter))
     })
   } else {
     return this.props.messages
   }
 }



  renderMessages = () => {
    return this.props.messages.length > 0 ?
    <div id="notesList">
      <FilterForm handleChange={this.handleChange}/>
      {this.filterMessages().map(message => {
        return message.seen? 
        <Message message={message} key={message.id} handleClick={this.handleClick}/> 
        :
        <UnseenMessage message={message} key={message.id} handleClick={this.handleClick}/>
    })}
    </div>
    :
    <NoNotes type={'messages'} />

  }



  renderDashboard = () => {
    let {match} = this.props
    return (
      <div>
        {this.renderMessages()}
        {this.props.message
          ?
          <Switch>
            <Route exact path={`${match.path}/:id`} component={MessageDisplay}/>
          </Switch>
          :
          <Redirect to='/notes_from_friends'/>
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
    message: state.message,
    currentUser: state.currentUser,
    messages: state.messages
  };
};



const mapDispatchToProps = dispatch => {
  return {
    toggleMessageDisplay: message => dispatch({type: "TOGGLE_MESSAGE_DISPLAY", message: message}),
    seenMessage: message => dispatch({type: "SEEN_MESSAGE", message: message})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Messages);
