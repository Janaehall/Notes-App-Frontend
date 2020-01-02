import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import UnseenMessage from './UnseenMessage'
import MessageDisplay from './MessageDisplay'
import { Switch, Route, Redirect} from 'react-router-dom'
import NoNotes from './NoNotes'


class Messages extends Component{

  handleClick = (message) => {
    console.log('THIS IS THE MESSAGE:', message)
    this.props.toggleMessageDisplay(message)
    this.props.history.push(`/messages/${message.id}`)
  }

  handleNewClick = (message) => {
    this.handleClick(message)
    this.props.seenMessage(message)
    let reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seen: true
      })
    }
    fetch(`http://localhost:3000/messages/${message.id}`, reqObj)
  }

  renderMessages = () => {
    let messages = this.props.messages
    return messages.length > 0 ?
    <div id="notesList">
      {messages.map(message => {
        return message.seen? 
        <Message message={message} key={message.id} handleClick={this.handleClick}/> 
        :
        <UnseenMessage message={message} key={message.id} handleClick={this.handleNewClick}/>
    })}
    </div>
    :
    <NoNotes type={this.props.type} />

  }

  renderDashboard = () => {
    let {match} = this.props
    console.log(this.props.message)
    return (
      <div>
        {this.renderMessages()}
        {this.props.message
          ?
          <Switch>
            <Route exact path={`${match.path}/:id`} component={MessageDisplay}/>
          </Switch>
          :
          <Redirect to='/messages'/>
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
